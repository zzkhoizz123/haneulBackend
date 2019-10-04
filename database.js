const mongoose = require('mongoose')

const DBConfig = require('./config/database.config')

// silly way to export the database
const database = () =>
  new Promise((resolve, reject) => {
    console.log('Connecting MongoDB')
    // logger.info("Connecting MongoDB");
    const db = mongoose.connect(
      DBConfig.MONGODB_URI,
      { useNewUrlParser: true },
      err => {
        if (err) {
          reject(err)
        } else {
          resolve(db)
        }
      }
    )
  })

module.exports = database
