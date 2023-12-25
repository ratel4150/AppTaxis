
// routes/user.js
import express from 'express';
import controllers from '../../controllers/index.js';
import authMiddleware from '../../middleware/index.js'
import morgan from 'morgan';
import winston from 'winston';
import chalk from 'chalk';  // Agrega esta línea para importar chalk
console.log(authMiddleware);
const {userController} = controllers
const router = express.Router();
router.use(morgan('combined'));
// Configuración de Winston para manejar registros generales
const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logs/app.log' })
    ],
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.timestamp()
    )
  });

  // Middleware de registro personalizado para registrar información de las solicitudes
const requestLogger = (req, res, next) => {
    const logMessage = `${req.method} ${req.originalUrl}`;
    logger.info(logMessage);
    logger.http(logMessage);
    next();
  };

  // Aplicar el middleware de registro a todas las rutas
router.use(requestLogger);

// Importa el controlador de usuario


// Define las rutas para las operaciones de usuario
// Rutas para usuarios
router.get('/', authMiddleware.authenticateToken, authMiddleware.checkUserRole(["Driver"]), async (req, res) => {
  try {
    const { page = 1, limit = 10, role } = req.query;
    const filter = role ? { roles: role } : {};

    const users = await userController.getAllUsersWithPagination(page, limit, filter);

    res.json(users);
  } catch (error) {
    logger.error(`Error en la ruta GET /users: ${error.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
// Agrega otras rutas de usuario aquí según tus necesidades

export default router

