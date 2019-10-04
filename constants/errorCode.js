const ErrorCode = {
  FAIL: {
    status: 200,
    errorCode: 0,
    name: 'FAIL',
    message: 'Fail',
    success: false
  },
  SUCCESSFUL: {
    status: 200,
    errorCode: 1,
    name: 'SUCCESSFUL',
    message: 'Success',
    success: true
  },
  ERROR_SERVER: {
    status: 500,
    errorCode: 500,
    name: 'ERROR_SERVER',
    message: 'Error server',
    success: false
  },
  MISSING_FIELD: {
    status: 200,
    errorCode: 2,
    name: 'MISSING_FIELD',
    message: 'Missing field',
    success: false
  },
  INVALID_TYPE: {
    status: 200,
    errorCode: 3,
    name: 'INVALID_TYPE',
    message: 'invalid type',
    success: false
  },
  DATA_ALDREADY_EXISTED: {
    status: 200,
    errorCode: 4,
    name: 'DATA_ALDREADY_EXISTED',
    message: 'data aldready existed',
    success: false
  }
}

module.exports = ErrorCode
