const mongoose = require('mongoose');

const EmpresaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la empresa es obligatorio'],
        unique: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción de la empresa es obligatoria'],
        trim: true
    },
    url_logo: {
        type: String,
        required: false,
        trim: true
    },
    email_contacto: {
        type: String,
        required: false,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, introduce un email de contacto válido']
    },
    direccion: {
        type: String,
        required: false,
        trim: true
    },
    id_admin_creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El administrador que creó la empresa es obligatorio']
    },
    esta_verificada: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Empresa', EmpresaSchema);
