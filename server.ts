import * as cluster from 'cluster'
import * as http from 'http'
import * as os from 'os'
import * as viscoin from 'viscoin'
import * as express from 'express'

const app = express()
app.use(express.static('./dist'))
app.listen(8080)

const api = express.Router()
// middleware specific to this router
api.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
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

const HTTP_API = { host: 'localhost', port: 80 }
const tcp_client = viscoin.TCPApi.createClient()
tcp_client.connect(9332, 'localhost')
tcp_client.on('block', block => console.log(block))
tcp_client.on('transaction', transaction => console.log(transaction))
viscoin.HTTPApi.getLatestBlock(HTTP_API).then(res => {
    console.log(res)
}).catch(err => console.log(err))