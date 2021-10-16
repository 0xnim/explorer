import * as cluster from 'cluster'
import * as https from 'https'
import * as fs from 'fs'
import * as os from 'os'
import * as viscoin from 'viscoin'
import * as express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

const instance = () => {
    console.log(`Worker ${process.pid} started`)

    const HTTP_API = { host: 'localhost', port: parseInt(process.env.http_api_port) }

    const app = express()
    app.use(express.static('./dist'))

    const beautify = (block) => {
        try {
            for (const i in block) {
                if (block[i] instanceof Buffer) block[i] = block[i].toString('hex')
                if (i === 'transactions') block[i] = block[i].map(transaction => {
                    for (const i in transaction) {
                        if ([ 'to', 'from' ].includes(i)) transaction[i] = viscoin.Address.toString(transaction[i])
                        else if (transaction[i] instanceof Buffer) transaction[i] = transaction[i].toString('hex')
                    }
                    return transaction
                })
            }
            return block
        }
        catch {
            return null
        }
    }
    
    const api = express.Router()
    // middleware specific to this router
    api.use(function timeLog (req, res, next) {
        console.log('Time: ', Date.now())
        next()
    })
    api.get('/search', (req, res) => {
        const query = req.query.q
        console.log(query)
        try {
            if (query === 'latest') {
                viscoin.HTTPApi.getLatestBlock(HTTP_API).then(block => {
                    if (block === null) return res.status(404).end()
                    res.send(JSON.stringify({
                        type: 'block',
                        query,
                        data: beautify(block)
                    }))
                }).catch(err => console.log(err))
                return
            }
        }
        catch {}
        try {
            const hash = Buffer.from(query, 'hex')
            if (Buffer.byteLength(hash) === 32) {
                viscoin.HTTPApi.getBlockByHash(HTTP_API, hash).then(block => {
                    if (block === null) return res.status(404).end()
                    res.send(JSON.stringify({
                        type: 'block',
                        query,
                        data: beautify(block)
                    }))
                }).catch(err => console.log(err))
                return
            }
        }
        catch {}
        try {
            const height = parseInt(query)
            if (!isNaN(height) && height.toString() === query) {
                viscoin.HTTPApi.getBlockByHeight(HTTP_API, height).then(block => {
                    if (block === null) return res.status(404).end()
                    res.send(JSON.stringify({
                        type: 'block',
                        query,
                        data: beautify(block)
                    }))
                }).catch(err => console.log(err))
                return
            }
        }
        catch {}
        try {
            if (query !== '' && query.length > 5) {
                const address = viscoin.Address.toBuffer(query)
                if (Buffer.byteLength(address) === 20) {
                    viscoin.HTTPApi.getBalanceOfAddress(HTTP_API, viscoin.Address.toString(address)).then(balance => {
                        if (balance === null) return res.status(404).end()
                        res.send(JSON.stringify({
                            type: 'address',
                            query,
                            data: balance
                        }))
                    }).catch(err => console.log(err))
                    return
                }
            }
        }
        catch {}
        res.send(null).end()
    })
    // define the home page route
    api.get('/block', function (req, res) {
        viscoin.HTTPApi.getLatestBlock(HTTP_API).then(block => {
            console.log('block')
            res.send(JSON.stringify(block))
        }).catch(err => console.log(err))
    })
    api.get('/about', function (req, res) {
        res.send('About birds')
    })
    app.use('/api', api)
    
    https.createServer({
        cert: fs.readFileSync('./server.cert'),
        key: fs.readFileSync('./server.key')
    }, app).listen(443, process.env.host)
}

if (!process.env.dev && cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`)
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
}
else {
    instance()
}