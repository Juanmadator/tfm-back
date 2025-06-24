const express = require('express');
const applicationController = require('../controllers/applicationController.js');

const router = express.Router();

router.post('/usuarios/:id_usuario/ofertas/:id_oferta', applicationController.applyToJobOffer);
router.get('/usuarios/:id_usuario', applicationController.getUserApplications);
router.delete('/:applicationId', applicationController.deleteUserApplication);

module.exports = router;
