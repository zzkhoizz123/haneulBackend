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
  },
  DATA_NOT_EXISTED: {
    status: 200,
    errorCode: 5,
    name: 'DATA_NOT_EXISTED',
    message: 'data not existed',
    success: false
  },
  MISSING_TOKEN: {
    status: 200,
    errorCode: 6,
    name: 'MISSING_TOKEN',
    message: 'missing token',
    success: false
  },
  DO_NOT_HAVE_PERMISSION: {
    status: 200,
    errorCode: 7,
    name: 'DO_NOT_HAVE_PERMISSION',
    message: 'do not have permission',
    success: false
  }
}

module.exports = ErrorCode
