const server = require('./server')
const database = require('./database')
// import { UserModel, WorkModel } from "models/Models"
// import { sampleUsers, sampleWorks } from "./defaultDB"

// import logger from "utils/logger"

let serverInstance
let databaseInstance

database()
  .catch(err => {
    console.log(err)
    console.log('Cannot connect to MongoDB')
    // logger.error("Cannot connect to MongoDB");
    // logger.error(err); // this returns undefined
    process.exit(1)
  })
  .then(db => {
    databaseInstance = db
    console.log('MongoDB Connected...')
    // logger.info("MongoDB Connected...");
    return Promise.resolve()
  })
  .then(async () => {
    console.log('Preparing database before start server')
    // logger.info("Preparing database before start server");
    if (process.env.NODE_ENV !== 'DEV') {
      // logger.info("NODE_ENV != DEV --- SKIP");
      return Promise.resolve()
    }
    // await UserModel.deleteMany({});
    // await WorkModel.deleteMany({});
    // await UserModel.insertMany(sampleUsers);
    // await WorkModel.insertMany(sampleWorks);
    return Promise.resolve()
  })
  .then(() => server())
  .catch(err => {
    console.log('Cannot start server')
    console.log(err)
    // logger.error("Cannot start server");
    // logger.error(err);
    process.exit(1)
  })
  .then(s => {
    serverInstance = s
    console.log('Server started, on port:', serverInstance.address().port)
    // logger.info("Server started, on port:", serverInstance.address().port);
  })

// handling CTRL+C
const onShutdown = () => {
  console.log('Received SIGINT, closing SERVER and disconnect DATABASE')
  // logger.info("Received SIGINT, closing SERVER and disconnect DATABASE");

  // return Promise.resolve({});
  return new Promise(resolve => {
    serverInstance.close(() => resolve())
  })
    .then(() => {
      console.log('SERVER closed')
      // logger.info("SERVER closed");
      databaseInstance.disconnect()
    })
    .then(() => {
      console.log('DATABASE disconnected')
      // logger.info("DATABASE disconnected");
      // logger.info("LOGGER shutdowned");
      // logger.shutdown();
    })
    .then(() => {
      process.exit(0)
    })
}

process.on('SIGINT', onShutdown)
process.on('SIGTERM', onShutdown)
