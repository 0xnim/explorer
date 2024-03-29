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
    api.use(express.urlencoded({ extended: true }))
    api.use(express.json({ limit: '1kb' }))
    api.use(function timeLog (req, res, next) {
        console.log('Time: ', Date.now())
        next()
    })
    api.post('/transaction', (req, res) => {
        try {
            const transaction = viscoin.Transaction.spawn(req.body)
            // console.log(transaction)
            const code = transaction.isValid()
            // console.log(code)
            if (code) return res.end(JSON.stringify(400))
            viscoin.HTTPApi.send(HTTP_API, transaction).then(code => 
                res.send(JSON.stringify(code))
            ).catch(err => {
                console.log(500)
                res.send(JSON.stringify(500))
            })
        }
        catch {
            res.send(JSON.stringify(400))
        }
    })
    api.get('/addresses', (req, res) => {
        viscoin.HTTPApi.getAddresses(HTTP_API, 0, 10).then(addresses => 
            res.send(JSON.stringify(addresses))
        ).catch(err => console.log(err))
    })
    api.get('/search', (req, res) => {
        const query = req.query.q
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
    app.use('/api', api)
    https.createServer({
        cert: fs.readFileSync('./server.cert'),
        key: fs.readFileSync('./server.key')
    }, app).listen(443, process.env.host)
}
if (!process.env.dev && cluster.isPrimary) {
    console.log(new Date())
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
