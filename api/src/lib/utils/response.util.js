function successRes(res, status = 200, payload) {
  const { data = {}, meta = {}, message = null } = payload;
  return res.status(status).json({
    data,
    meta,
    message,
  });
}

function errorRes(next, error) {
  return next(error);
}

export {
  successRes,
  errorRes,
};