const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['admin', 'usuario'],
    default: 'usuario',
  },
  empleado: {
    type: String,
    enum: ['Empleado', 'Desempleado'],
    default : 'Desempleado'
  },
  nacimiento: {
    type: Date,
    required: false,
  },
  url_curriculum: {
     type: String,
    required: false,
  },
  url_perfil_img: {
     type: String,
    required: false,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Usuario', usuarioSchema);
