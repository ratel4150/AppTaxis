// controllers/authController.js

// Importa los modelos y las bibliotecas necesarios


import modelos from '../../models/index.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
const {User, UserProfile} = modelos

const secretKey = process.env.JWY_SECRET_KEY || 'raziel'
console.log(secretKey);
// Define funciones para manejar solicitudes relacionadas con usuarios
const authController = {
    
  // Ejemplo: función para obtener iniciar sesion
   // Función para iniciar sesión
   login: async (req, res) => {
    try {
      // Obtén las credenciales del cuerpo de la solicitud
      const { email, password } = req.body;

      // Busca un usuario en la base de datos por su correo electrónico
      const user = await User.findOne({ email });

      // Si no se encuentra un usuario o la contraseña no coincide, responde con un error
      if (!user || !user.comparePassword(password)) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Genera un token JWT válido por 1 hora
      const token = jwt.sign({ username: user.username, roles: user.roles }, secretKey, { expiresIn: '1h' });
      console.log(token);
      res.json({ token });
    } catch (error) {
      console.error(error);
      
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Función para registrar un nuevo usuario
  signup: async (req, res) => {
    try {
      // Crea un nuevo usuario a partir de los datos en el cuerpo de la solicitud
      const newUser = new User(req.body);

      // Guarda el usuario en la base de datos
      await newUser.save();

          // Crea un nuevo perfil de usuario asociado al usuario recién creado
    const newProfile = new UserProfile({
      firstName: req.body.firstName, // Supongamos que el cuerpo de la solicitud contiene un campo 'firstName'
      lastName: req.body.lastName, // Supongamos que el cuerpo de la solicitud contiene un campo 'lastName'
      user: newUser._id, // Establece la referencia al usuario recién creado
    });

    // Guarda el perfil de usuario en la base de datos
    await newProfile.save();


      res.json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
      console.error(error);

      // Si el error es debido a una validación fallida, responde con los detalles del error
      if (error.name === 'ValidationError') {
        const validationErrors = {};
        for (const field in error.errors) {
          validationErrors[field] = error.errors[field].message;
        }
        return res.status(400).json({ error: 'Error de validación', details: validationErrors });
      }

      // Si el error es debido a un valor duplicado (índice único), responde con un mensaje de error
      if (error.code === 11000) {
        return res.status(400).json({ error: 'Error de duplicado', message: 'El usuario o el correo electrónico ya existen.' });
      }

      // En caso de otros errores, responde con un error interno del servidor
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  
  
 

  // Otras funciones de controlador aquí
};

// Exporta el controlador
export default authController
