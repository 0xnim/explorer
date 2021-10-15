import * as cluster from 'cluster'
import * as http from 'http'
import * as os from 'os'
import * as viscoin from 'viscoin'
import * as express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.static('./dist'))
app.listen(process.env.port)

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

const HTTP_API = { host: 'localhost', port: process.env.http_api_port }
// const tcp_client = viscoin.TCPApi.createClient()
// tcp_client.connect(9332, 'localhost')
// tcp_client.on('block', block => console.log(block))
// tcp_client.on('transaction', transaction => console.log(transaction))
viscoin.HTTPApi.getLatestBlock(HTTP_API).then(res => {
    console.log(res)
}).catch(err => console.log(err))