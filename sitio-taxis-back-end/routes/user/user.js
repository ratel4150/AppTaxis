
// routes/user.js
import express from 'express';
import controllers from '../../controllers/index.js';
import authMiddleware from '../../middleware/index.js'
console.log(authMiddleware);
const {userController} = controllers
const router = express.Router();

// Importa el controlador de usuario


// Define las rutas para las operaciones de usuario
// Rutas para usuarios
router.get('/',  authMiddleware.authenticateToken, authMiddleware.checkUserRole(["Candidate or Applicant"]),  userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
// Agrega otras rutas de usuario aquí según tus necesidades

export default router

