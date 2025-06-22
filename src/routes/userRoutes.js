const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUser,
    getUsuarios,
    getUsuarioById, // <--- Importar nuevo controlador
    updateUsuario,   // <--- Importar nuevo controlador
    deleteUsuario,   // <--- Importar nuevo controlador
} = require('../controllers/userController.js'); // Asegúrate de que las rutas son correctas

const { verificarToken } = require('../middlewares/authMiddleware.js'); // Tu middleware de autenticación

// Rutas de autenticación y registro
router.post('/register', createUser); // Crear usuario (registro)
router.post('/login', loginUser);     // Iniciar sesión

router.get('/', getUsuarios); // Obtener todos los usuarios (protegido)
router.get('/:id', getUsuarioById); // Protegido: solo usuarios autenticados pueden ver perfiles por ID
router.put('/:id', updateUsuario); // Protegido: solo usuarios autenticados pueden actualizar su perfil
router.delete('/:id', deleteUsuario); // Protegido: solo usuarios autenticados pueden eliminar su perfil

module.exports = router;