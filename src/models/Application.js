const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    id_oferta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OfertaTrabajo',
        required: true,
    },
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    estado: {
        type: String,
        enum: ['recibida', 'en revisión', 'entrevista', 'rechazada', 'aceptada'],
        default: 'recibida',
    },
    fecha_aplicacion: {
        type: Date,
        default: Date.now,
    },
    mensaje: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true,
});

applicationSchema.index({ id_oferta: 1, id_usuario: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
