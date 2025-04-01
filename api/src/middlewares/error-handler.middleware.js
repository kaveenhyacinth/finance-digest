function ErrorHandlerMiddleware(err, _req, res, _next) {
  const errStatus = err.statusCode ?? 500;
  const errMsg = err.message ?? 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    type: err?.type ?? 'process',
    errors: err?.errors ?? [],
  });
}

export default ErrorHandlerMiddleware;
