import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

const env = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
    },
    jwt: process.env.JWT_SECRET,
}

// Prefer explicit process.env.JWT_SECRET if provided, otherwise fall back to a random secret.
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');

export { JWT_SECRET };
export default env;