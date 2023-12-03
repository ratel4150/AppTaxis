// controllers/userController.js

// Importa los modelos y las bibliotecas necesarios


import models from '../../models/index.js';
const {User} = models
import readPermissionSchemaUser from '../../permissions/index.js';

// Define funciones para manejar solicitudes relacionadas con usuarios
const userController = {
  // Ejemplo: función para obtener todos los usuarios
  getAllUsers: async (req, res) => {
    const user = req.user; // Usuario autenticado
    if (readPermissionSchemaUser.canRead(user)) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
      }
      
    } else {
      res.status(403).json({ error: 'No tienes permiso para ver usuarios' });
      
    }
   
  },
  // Función para crear un nuevo usuario
  createUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.json(newUser);
    } catch (error) {
      // Analiza el error para identificar la causa
      if (error.name === 'ValidationError') {
        // El error es debido a una validación fallida
        // Puedes acceder a los detalles del error de validación
        const validationErrors = {};
        for (const field in error.errors) {
          validationErrors[field] = error.errors[field].message;
        }
        return res.status(400).json({ error: 'Error de validación', details: validationErrors });
      } else if (error.code === 11000) {
        // El error es debido a un valor duplicado (índice único)
        return res.status(400).json({ error: 'Error de duplicado', message: 'El usuario o el correo electrónico ya existen.' });
      } else {
        // Maneja otros errores de manera genérica
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  },

  // Función para actualizar un usuario existente
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  },

  // Función para eliminar un usuario
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
  },

  // Otras funciones de controlador aquí
};

// Exporta el controlador
export default userController
