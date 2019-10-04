const ERRORCODE = require('../constants/errorCode')

const message = (res, data, status) => {
  try {
    if (data && data.errorCode) {
      data = { ...data }
      const defaultStatus = data.errorCode === ERRORCODE.SUCCESSFUL.errorCode ? 200 : 400
      status = status || data.status || defaultStatus
      delete data.status
      return res.status(status).json(data)
    }
    return res.status(500).json(ERRORCODE.ERROR_SERVER)
  } catch (error) {
    return res.status(500).json(ERRORCODE.ERROR_SERVER)
  }
}

module.exports = { message }