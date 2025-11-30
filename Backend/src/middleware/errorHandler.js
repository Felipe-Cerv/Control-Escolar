export default function errorHandler(err, req, res, next) {
  // Log internal errors in server logs for debugging
  console.error('Unhandled error:', err);

  const status = err && err.status ? err.status : 500;
  const message = err && err.message ? err.message : 'Error interno del servidor';
  const code = err && err.code ? err.code : null;
  const details = err && err.details ? err.details : null;

  const payload = { ok: false, error: message };
  if (code) payload.code = code;
  if (details) payload.details = details;

  res.status(status).json(payload);
}
