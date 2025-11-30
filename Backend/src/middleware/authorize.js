import models from '../models/index.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import ForbiddenError from '../errors/ForbiddenError.js';


export function requireRole(roleId) {
  return async (req, res, next) => {
    if (!req.user) throw new UnauthorizedError('Token requerido');

    const has = await models.UsuarioRol.findOne({ where: { usuario_id: req.user.usuario_id, rol_id: roleId } });
    if (!has) throw new ForbiddenError('Acceso denegado');

    next();
  };
}

export default { requireRole };
