const {
  crearOfertaTrabajo,
  obtenerTodasOfertasTrabajo,
  obtenerOfertaTrabajoPorId,
  actualizarOfertaTrabajo,
  eliminarOfertaTrabajo,
} = require('../services/ofertaTrabajoService');

const ofertaTrabajoController = {
  createJobOffer: async (req, res) => {
    try {
      const ofertaData = req.body;
      const adminId = req.body.user_id;

      const nuevaOferta = await crearOfertaTrabajo(ofertaData, adminId);
      res.status(201).json(nuevaOferta);
    } catch (error) {
      console.error('Error en controlador createJobOffer:', error.message);
      res.status(500).json({ message: error.message });
    }
  },


  getAllJobOffers: async (req, res) => {
   
    try {
   
      const filtros = req.query;
      const ofertas = await obtenerTodasOfertasTrabajo(filtros);

      res.status(200).json(ofertas);
    } catch (error) {
      console.error('Error en controlador getAllJobOffers:', error.message);
      res.status(500).json({ message: error.message });
    }
  },


  getJobOfferById: async (req, res) => {
    try {
      const { id } = req.params;
      const oferta = await obtenerOfertaTrabajoPorId(id);

      if (!oferta) {
        return res.status(404).json({ message: 'Oferta de trabajo no encontrada.' });
      }
      res.status(200).json(oferta);
    } catch (error) {
      console.error('Error en controlador getJobOfferById:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  updateJobOffer: async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;

      const ofertaActualizada = await actualizarOfertaTrabajo(id, newData);

      if (!ofertaActualizada) {
        return res.status(404).json({ message: 'Oferta de trabajo no encontrada para actualizar.' });
      }
      res.status(200).json(ofertaActualizada);
    } catch (error) {
      console.error('Error en controlador updateJobOffer:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  deleteJobOffer: async (req, res) => {
    try {
      const { id } = req.params;

      const ofertaEliminada = await eliminarOfertaTrabajo(id);

      if (!ofertaEliminada) {
        return res.status(404).json({ message: 'Oferta de trabajo no encontrada para eliminar.' });
      }
      res.status(200).json({ message: 'Oferta de trabajo eliminada exitosamente.', oferta: ofertaEliminada });
    } catch (error) {
      console.error('Error en controlador deleteJobOffer:', error.message);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = ofertaTrabajoController;
