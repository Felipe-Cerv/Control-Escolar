//import routes from './routes';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import usuarioRoutes from './routes/usuarioRoutes.js';
import loginRoute from './routes/loginRoute.js';
//import alumnoRoutes from './routes/alumnoRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import adminRoutes from './routes/adminRoutes.js';
import alumnoRoutes from './routes/alumnoRoutes.js';
import materiasRouter from './routes/materiasRoutes.js';
import maestroRoutes from './routes/maestroRoutes.js';
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Registrar rutas
app.use('/api/auth', loginRoute);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/materias', materiasRouter);
app.use('/api/maestros', maestroRoutes);

// Error handler - should be last middleware
app.use(errorHandler);

export default app;
