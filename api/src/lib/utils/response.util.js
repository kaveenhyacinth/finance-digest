export function successRes(res, status = 200, {
  data = {},
  meta = {},
  message,
}) {
  return res.status(status).json({
    data,
    meta,
    message: message ?? null,
  });
}

export function errorRes(next, error) {
  return next(error);
}

export function validationRes(res, errors) {
  return res.status(422).json({
    message: errors?.[0]?.msg ?? 'Validation errors',
    error: true,
    code: 422,
    type: 'validation',
    errors,
  });
}