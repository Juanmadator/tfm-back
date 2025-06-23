const { createApplication, getApplicationsByUser,deleteApplication } = require('../services/applicationService.js');

const applicationController = {
    applyToJobOffer: async (req, res) => {
        try {
            const { id_oferta, id_usuario } = req.params;

            if (!id_usuario) {
                return res.status(400).json({ message: 'El ID de usuario es requerido en la URL.' });
            }

            const newApplication = await createApplication(id_oferta, id_usuario);
            res.status(201).json({ message: 'Aplicación realizada con éxito.', application: newApplication });
        } catch (error) {
            if (error.message.includes('Ya has aplicado')) {
                return res.status(409).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error al procesar la aplicación.', error: error.message });
        }
    },

    getUserApplications: async (req, res) => {
        try {
            const { id_usuario } = req.params;

            if (!id_usuario) {
                return res.status(400).json({ message: 'El ID de usuario es requerido en la URL.' });
            }

            const applications = await getApplicationsByUser(id_usuario);
            res.status(200).json(applications);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las aplicaciones.', error: error.message });
        }
    },

    deleteUserApplication: async (req, res) => {
        try {
            const { applicationId } = req.params;
            await deleteApplication(applicationId);

            res.status(200).json({ message: 'Aplicación eliminada con éxito.' });
        } catch (error) {
            if (error.message.includes('encontrada o no tienes permiso')) {
                return res.status(404).json({ message: error.message });
            }
            res
                .status(500)
                .json({ message: 'Error al eliminar la aplicación.', error: error.message });
        }
    },
};

module.exports = applicationController;
