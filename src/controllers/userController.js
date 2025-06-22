const {
  crearUsuario,
  loginUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId, // <--- Importar nueva función
  actualizarUsuario,   // <--- Importar nueva función
  eliminarUsuario,     // <--- Importar nueva función
} = require('../services/userServices');

const {
  createUserValidations,
  validateResult
} = require('../validations/userValidations');
const {
  sendEmail
} = require('../services/mailer');


const userController = {
  createUser: [
    ...createUserValidations,
    validateResult,
    async (req, res, next) => { // Añadir 'next'
      try {
        const contenido = 'Me complace anunciarte que has sido registrado correctamente en la app';
        const {
          nombre,
          email
        } = req.body;
        console.log(email)
        const result = await crearUsuario(req.body);
        sendEmail(nombre, email, contenido)
        res.status(201).json(result);
      } catch (error) {
        // En lugar de res.status(500), pasa el error a next
        next(error);
      }
    },
  ],

  loginUser: [
    async (req, res, next) => { // Añadir 'next'
      try {
        const {
          email,
          password
        } = req.body;
        const result = await loginUsuario(email, password);
        res.status(200).json(result);
      } catch (error) {
        // En lugar de res.status(401), pasa el error a next
        next(error);
      }
    },
  ],
  getUsuarios: [
    async (req, res, next) => { // Añadir 'next'
      try {
        const result = await obtenerUsuarios();
        res.status(200).json(result);
      } catch (error) {
        // En lugar de res.status(401), pasa el error a next
        next(error);
      }
    }
  ],

  // --- NUEVA FUNCIÓN: Obtener usuario por ID ---
  getUsuarioById: async (req, res, next) => { // Añadir 'next'
    try {
      const {
        id
      } = req.params; // Obtener el ID de los parámetros de la URL
      const result = await obtenerUsuarioPorId(id);
      res.status(200).json(result);
    } catch (error) {
      next(error); // Pasar el error al middleware de manejo de errores
    }
  },

  // --- NUEVA FUNCIÓN: Actualizar usuario ---
  updateUsuario: async (req, res, next) => { // Añadir 'next'
    try {
      const {
        id
      } = req.params; // Obtener el ID de los parámetros de la URL
      const datosActualizados = req.body; // Los datos para actualizar vienen en el cuerpo de la petición
      const result = await actualizarUsuario(id, datosActualizados);
      res.status(200).json(result);
    } catch (error) {
      next(error); // Pasar el error al middleware de manejo de errores
    }
  },

  // --- NUEVA FUNCIÓN: Eliminar usuario ---
  deleteUsuario: async (req, res, next) => { // Añadir 'next'
    try {
      const {
        id
      } = req.params; // Obtener el ID de los parámetros de la URL
      const result = await eliminarUsuario(id);
      res.status(200).json(result);
    } catch (error) {
      next(error); // Pasar el error al middleware de manejo de errores
    }
  },
};

module.exports = userController;