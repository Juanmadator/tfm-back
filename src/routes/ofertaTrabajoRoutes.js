const express = require('express');
const router = express.Router();
const ofertaTrabajoController = require('../controllers/ofertaTrabajoController');
const { verificarToken } = require('../middlewares/authMiddleware.js');

router.get('/', ofertaTrabajoController.getAllJobOffers);
router.get('/:id', ofertaTrabajoController.getJobOfferById);
router.post('/', verificarToken, ofertaTrabajoController.createJobOffer);
router.put('/:id', verificarToken, ofertaTrabajoController.updateJobOffer);
router.delete('/:id', verificarToken, ofertaTrabajoController.deleteJobOffer);

module.exports = router;
