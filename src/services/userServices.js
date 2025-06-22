const Usuario = require("../models/User.js");
const bcrypt = require("bcrypt");
const { generateToken } = require('../utils/generateToken');

async function crearUsuario(data) {
  try {
    const emailExistente = await Usuario.findOne({ email: data.email });
    const usernameExistente = await Usuario.findOne({
      username: data.username,
    });

    if (emailExistente) {
      throw new Error("El email ya está registrado");
    }

    if (usernameExistente) {
      throw new Error("El nombre de usuario ya está registrado");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const nuevoUsuario = new Usuario({
      ...data,
      password: hashedPassword,
    });

    const usuarioGuardado = await nuevoUsuario.save();
    return usuarioGuardado;
  } catch (error) {
    throw error;
  }
}

async function obtenerUsuarios() {
  try {
    const usuarios = await Usuario.find().select("nombre email rol url_perfil_img");
    return usuarios;
  } catch (error) {
    throw error;
  }
}

async function obtenerUsuarioPorId(id) {
  try {
    const usuario = await Usuario.findById(id).select("-password");
    if (!usuario) {
      throw new Error("Usuario no encontrado.");
    }
    return usuario;
  } catch (error) {
    if (error.name === 'CastError') {
      throw new Error('Formato de ID de usuario inválido.');
    }
    throw error;
  }
}

async function actualizarUsuario(id, datosActualizados) {
  try {
    const { password, email, rol, ...otrosDatos } = datosActualizados;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      otrosDatos.password = await bcrypt.hash(password, salt);
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { $set: otrosDatos },
      { new: true, runValidators: true }
    ).select("-password");

    if (!usuarioActualizado) {
      throw new Error("Usuario no encontrado para actualizar.");
    }
    return usuarioActualizado;
  } catch (error) {
    if (error.name === 'CastError') {
      throw new Error('Formato de ID de usuario inválido.');
    }
    if (error.code === 11000) {
      throw new Error("Ya existe un usuario con este email o nombre de usuario.");
    }
    throw error;
  }
}

async function eliminarUsuario(id) {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      throw new Error("Usuario no encontrado para eliminar.");
    }
    return { message: "Usuario eliminado con éxito." };
  } catch (error) {
    if (error.name === 'CastError') {
      throw new Error('Formato de ID de usuario inválido.');
    }
    throw error;
  }
}

async function loginUsuario(email, password) {
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      throw new Error("Contraseña incorrecta");
    }

    const userDataToReturn = {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      url_curriculum: usuario.url_curriculum,
      url_perfil_img: usuario.url_perfil_img,
      estado: usuario.estado,
      nacimiento : usuario.nacimiento
    };

    if (usuario.rol === 'admin') {
      const token = generateToken(usuario);
      return {
        message: 'Login exitoso',
        usuario: userDataToReturn,
        token,
      };
    }

    return {
      message: 'Login exitoso',
      usuario: userDataToReturn,
    };

  } catch (error) {
    throw error;
  }
}

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  loginUsuario,
};
