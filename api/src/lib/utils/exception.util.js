export function baseException(statusCode, errorMsg) {
  const error = new Error(errorMsg);
  error.statusCode = statusCode;
  return error;
}

export function internalServerException(errorMsg) {
  return baseException(500, errorMsg);
}

export function badRequestException(errorMsg) {
  return baseException(400, errorMsg);
}

export function unauthenticatedException(errorMsg) {
  return baseException(401, errorMsg);
}