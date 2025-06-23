const OfertaTrabajo = require('../models/OfertaTrabajo');
const Empresa = require('../models/Empresa');
const Usuario = require('../models/User');

async function crearOfertaTrabajo(data, adminId) {
    try {
        const adminExistente = await Usuario.findById(data.user_id);
        if (!adminExistente || adminExistente.rol !== 'admin') {
            throw new Error('Solo los administradores pueden publicar ofertas de trabajo.');
        }

        const empresaExistente = await Empresa.findById(data.id_empresa);
        if (!empresaExistente) {
            throw new Error('La empresa asociada a esta oferta de trabajo no existe.');
        }

        const nuevaOferta = new OfertaTrabajo({
            ...data,
            id_admin_publicador: data.user_id,
        });

        const ofertaGuardada = await nuevaOferta.save();
        return ofertaGuardada;
    } catch (error) {
        console.error('Error al crear oferta de trabajo:', error.message);
        throw error;
    }
}
const obtenerTodasOfertasTrabajo = async (filtros = {}) => {
  try {
    const { titulo, ubicacion } = filtros;
    const queryParts = [];

    if (titulo) {
      queryParts.push({ titulo: { $regex: titulo, $options: 'i' } });
    }
    if (ubicacion) {
      queryParts.push({ ubicacion: { $regex: ubicacion, $options: 'i' } });
    }

    const query = queryParts.length > 0 ? { $or: queryParts } : {};

    const ofertas = await OfertaTrabajo.find(query)
                                      .populate('id_empresa', 'nombre url_logo')
                                      .sort({ createdAt: -1 });
    console.log(`Encontradas ${ofertas.length} ofertas`);
    return ofertas;
  } catch (error) {
    console.error('Error en el servicio al obtener ofertas de trabajo:', error.message);
    throw new Error('No se pudieron obtener las ofertas de trabajo.');
  }
}

async function obtenerOfertaTrabajoPorId(ofertaId) {
    try {
        const oferta = await OfertaTrabajo.findById(ofertaId)
            .populate('id_empresa', 'nombre url_logo email_contacto')
            .populate('id_admin_publicador', 'nombre email username');
        return oferta;
    } catch (error) {
        console.error(`Error al obtener oferta de trabajo con ID ${ofertaId}:`, error.message);
        throw error;
    }
}

async function actualizarOfertaTrabajo(ofertaId, newData) {
    try {
        if (newData.id_empresa) {
            const nuevaEmpresaExistente = await Empresa.findById(newData.id_empresa);
            if (!nuevaEmpresaExistente) {
                throw new Error('La nueva empresa asociada a la oferta no existe.');
            }
        }
        
        if (newData.id_admin_publicador) {
            delete newData.id_admin_publicador;
        }

        const ofertaActualizada = await OfertaTrabajo.findByIdAndUpdate(
            ofertaId,
            newData,
            { new: true, runValidators: true }
        );
        return ofertaActualizada;
    } catch (error) {
        console.error(`Error al actualizar oferta de trabajo con ID ${ofertaId}:`, error.message);
        throw error;
    }
}

async function eliminarOfertaTrabajo(ofertaId) {
    try {
        const ofertaEliminada = await OfertaTrabajo.findByIdAndDelete(ofertaId);
        return ofertaEliminada;
    } catch (error) {
        console.error(`Error al eliminar oferta de trabajo con ID ${ofertaId}:`, error.message);
        throw error;
    }
}

module.exports = {
    crearOfertaTrabajo,
    obtenerTodasOfertasTrabajo,
    obtenerOfertaTrabajoPorId,
    actualizarOfertaTrabajo,
    eliminarOfertaTrabajo,
};
