const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const forceSSL = require('express-force-ssl')
const fs = require('fs')
const helmet = require('helmet')
const gracefulShutdown = require('http-graceful-shutdown')
const morgan = require('morgan')
const cors = require('cors')
const https = require('https')
const http = require('http')
require('dotenv').config()

const swaggerUi = require('swagger-ui-express')
const swagger = require('./swagger/swagger')
const RouteV1 = require('./routes/v1/index')
const Logger = require('./libs/logger')
const DBConfig = require('./config/database.config')
const serverConfig = require('./config/server.config')

// invoke an instance of express application.
const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
// app.use(forceSSL)

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swagger, {}))
console.log('Document api started, on port: 80')
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
app.use('/api/v1', RouteV1)

let server = () =>
  new Promise((resolve, reject) => {
    console.log('Starting Server')
  })

if (process.env.SERVER_ENV === 'DEVELOP') {
  app.set('port', process.env.PORT || 80)
  server = () =>
    new Promise((resolve, reject) => {
      console.log('Starting Server')
      // logger.info("Starting Server");
      const s = app.listen(app.get('port'), err => {
        if (err) {
          reject(err)
        } else {
          gracefulShutdown(s)
          resolve(s)
        }
      })
    })
} else {
  // static public folder to make it
  // eslint-disable-next-line no-path-concat
  app.use(express.static(path.resolve(__dirname + '/build')))

  // add router
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '/build/index.html')))
  })

  // Init router
  /**
     * Error handler
     */
  process.on('unhandledRejection', function (reason, p) {
    Logger.error('unhandledRejection', reason, p)
  })

  process.on('uncaughtException', (err) => {
    Logger.error('uncaughtException', err)
  })

  const privateKey = fs.readFileSync('/etc/letsencrypt/live/blockchain.fservices.vn/privkey.pem', 'utf8')
  const certificate = fs.readFileSync('/etc/letsencrypt/live/blockchain.fservices.vn/cert.pem', 'utf8')
  const ca = fs.readFileSync('/etc/letsencrypt/live/blockchain.fservices.vn/chain.pem', 'utf8')

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
    secureProtocol: 'TLSv1_2_server_method',
    ciphers: 'ECDHE-RSA-AES128-SHA256:!RC4:HIGH:!MD5:!aNULL',
    honorCipherOrder: true
  }
  const httpsServer = https.createServer(credentials, app)

  httpsServer.listen(process.env.PORTS || 443, () => {
    console.log('Sever started, on port: 443')
    Logger.info('Backend', `
    ==============================================================
    FService backend with protocol HTTPS started on port: ${443}!
    ==============================================================`)
  })

  httpsServer.on('error', error => {
    Logger.info('SERVER', `
    ==============================================================
    FService backend with protocol HTTPS failed to start
    ==============================================================
    ${error}
    `)
  })

  app.get('*', function (req, res, next) {
    res.redirect('https://' + req.headers.host + '/' + req.path)
  })
  app.use(function (req, res, next) {
    res.status(404).send('Sorry can\'t find that!')
  })
  app.set('port', process.env.PORT || 80)
  http.createServer(app).listen(app.get('port'), function () {
    console.log('Sever started, on port: ' + app.get('port'))
    Logger.info('SERVER', 'Fservice HTTP server listening on port ' + app.get('port'))
  })
}
module.exports = server
