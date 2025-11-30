import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import models from '../models/index.js';
import { JWT_SECRET } from '../config/enviroment.js';
import { ConflictError } from '../errors/ConflictError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';
import BadRequestError from '../errors/BadRequestError.js';
import UsuarioRol from '../models/UsuarioRol.js';

export async function findByEmail(email) {
    return models.Usuario.findOne({ where: { email } });
}

export async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}

export async function getRoles(usuario_id) {
    return models.UsuarioRol.findAll({ where: { usuario_id } });
}

class UserService {
    async crearUsuario({ nombre, email, password, fecha_nacimiento, rol_id }) {
        const existing = await findByEmail(email);
        if (existing) throw new ConflictError('El correo ya está registrado');

        const password_hash = await hashPassword(password);
        const newUser = await models.Usuario.create({ nombre, email, password_hash, fecha_nacimiento });
        await UsuarioRol.create({ usuario_id: newUser.usuario_id, rol_id: rol_id });
        const { password_hash: _, ...response } = newUser.toJSON();
        return response;
    }

    async autenticarUsuario({ email, password }) {
        const user = await findByEmail(email);
        if (!user) throw new NotFoundError('No existe un usuario con ese correo');
        const roles = await getRoles(user.usuario_id);
        const verified = await verifyPassword(password, user.password_hash);
        if (!verified) throw new UnauthorizedError('Contraseña incorrecta');
        const token = jwt.sign({ usuario_id: user.usuario_id, email: user.email, roles: [roles] }, JWT_SECRET, {
            expiresIn: '30m',
        });

        const { password_hash: _, ...response } = user.toJSON();
        return { token, user: response };
    }

    async modificarRolUsuario({ usuario_id, rol_id }) {
        await models.UsuarioRol.update(
            { rol_id },
            { where: { usuario_id } }
        );
        return;
    }
}

export default new UserService();