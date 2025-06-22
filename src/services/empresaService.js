const Empresa = require('../models/Empresa');
const User = require('../models/User');

async function crearEmpresa(data, adminId) {
    try {
        const adminExistente = await User.findById(data.user_id);
        if (!adminExistente || adminExistente.rol !== 'admin') {
            throw new Error('Solo los administradores pueden crear empresas.');
        }

        const nombreExistente = await Empresa.findOne({ nombre: data.nombre });
        if (nombreExistente) {
            throw new Error('Ya existe una empresa con este nombre.');
        }

        const nuevaEmpresa = new Empresa({
            ...data,
            id_admin_creador: data.user_id,
        });

        const empresaGuardada = await nuevaEmpresa.save();
        return empresaGuardada;
    } catch (error) {
        console.error('Error al crear empresa:', error.message);
        throw error;
    }
}

async function obtenerTodasEmpresas() {
    try {
        const empresas = await Empresa.find();
        return empresas;
    } catch (error) {
        console.error('Error al obtener todas las empresas:', error.message);
        throw error;
    }
}

async function obtenerEmpresaPorId(empresaId) {
    try {
        const empresa = await Empresa.findById(empresaId);
        return empresa;
    } catch (error) {
        console.error(`Error al obtener empresa con ID ${empresaId}:`, error.message);
        throw error;
    }
}

async function actualizarEmpresa(empresaId, newData) {
    try {
        const empresaActualizada = await Empresa.findByIdAndUpdate(
            empresaId,
            newData,
            { new: true, runValidators: true }
        );
        return empresaActualizada;
    } catch (error) {
        console.error(`Error al actualizar empresa con ID ${empresaId}:`, error.message);
        throw error;
    }
}

async function eliminarEmpresa(empresaId) {
    try {
        const empresaEliminada = await Empresa.findByIdAndDelete(empresaId);
        return empresaEliminada;
    } catch (error) {
        console.error(`Error al eliminar empresa con ID ${empresaId}:`, error.message);
        throw error;
    }
}

module.exports = {
    crearEmpresa,
    obtenerTodasEmpresas,
    obtenerEmpresaPorId,
    actualizarEmpresa,
    eliminarEmpresa,
};
