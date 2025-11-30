//import routes from './routes';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import usuarioRoutes from './routes/usuarioRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Registrar rutas
app.use('/api/auth', usuarioRoutes);

// Error handler - should be last middleware
app.use(errorHandler);

export default app;
