function baseException(statusCode, errorMsg) {
  const error = new Error(errorMsg);
  error.statusCode = statusCode;
  return error;
}

function internalServerException(errorMsg) {
  return baseException(500, errorMsg);
}

function badRequestException(errorMsg) {
  return baseException(400, errorMsg);
}

export {
  baseException,
  internalServerException,
  badRequestException,
};