const {
    crearEmpresa,
    obtenerTodasEmpresas,
    obtenerEmpresaPorId,
    actualizarEmpresa,
    eliminarEmpresa,
} = require('../services/empresaService');

const empresaController = {
    createCompany: async (req, res) => {
        try {
            const companyData = req.body;
            const adminId = req.body.user_id;

            const nuevaEmpresa = await crearEmpresa(companyData, adminId);
            res.status(201).json(nuevaEmpresa);
        } catch (error) {
            console.error('Error en controlador createCompany:', error.message);
            res.status(500).json({ message: error.message });
        }
    },

    getAllCompanies: async (req, res) => {
        try {
            const empresas = await obtenerTodasEmpresas();
            res.status(200).json(empresas);
        } catch (error) {
            console.error('Error en controlador getAllCompanies:', error.message);
            res.status(500).json({ message: error.message });
        }
    },

    getCompanyById: async (req, res) => {
        try {
            const { id } = req.params;
            const empresa = await obtenerEmpresaPorId(id);

            if (!empresa) {
                return res.status(404).json({ message: 'Empresa no encontrada.' });
            }
            res.status(200).json(empresa);
        } catch (error) {
            console.error('Error en controlador getCompanyById:', error.message);
            res.status(500).json({ message: error.message });
        }
    },

    updateCompany: async (req, res) => {
        try {
            const { id } = req.params;
            const newData = req.body;

            const empresaActualizada = await actualizarEmpresa(id, newData);

            if (!empresaActualizada) {
                return res.status(404).json({ message: 'Empresa no encontrada para actualizar.' });
            }
            res.status(200).json(empresaActualizada);
        } catch (error) {
            console.error('Error en controlador updateCompany:', error.message);
            res.status(500).json({ message: error.message });
        }
    },

    deleteCompany: async (req, res) => {
        try {
            const { id } = req.params;

            const empresaEliminada = await eliminarEmpresa(id);

            if (!empresaEliminada) {
                return res.status(404).json({ message: 'Empresa no encontrada para eliminar.' });
            }
            res.status(200).json({ message: 'Empresa eliminada exitosamente.', empresa: empresaEliminada });
        } catch (error) {
            console.error('Error en controlador deleteCompany:', error.message);
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = empresaController;
