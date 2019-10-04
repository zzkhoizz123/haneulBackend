// swagger definition
const swaggerJSDoc = require('swagger-jsdoc')
let swaggerDefinition = {}
if (process.env.SERVER_ENV === 'DEVELOP') {
  swaggerDefinition = {
    info: {
      title: 'FService API',
      version: '1.0.0',
      description: 'Document for API'
    },
    host: 'localhost:80',
    basePath: '/api'
  }
} else {
  swaggerDefinition = {
    info: {
      title: 'FService API',
      version: '1.0.0',
      description: 'Document for API'
    },
    host: 'blockchain.fservices.vn:80',
    basePath: '/api/v1'
  }
}

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/v1/*.js', './routes/v1*.js'] // pass all in array
}
// initialize swagger-jsdoc
// https://swagger.io/docs/specification/basic-structure/
const swaggerSpec = swaggerJSDoc(options)
swaggerSpec.securityDefinitions = {
  bearerAuth: {
    type: 'apiKey',
    in: 'header',
    name: 'Authorization'
  }
}
swaggerSpec.security = [
  {
    bearerAuth: []
  }
]

module.exports = swaggerSpec
