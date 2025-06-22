const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');
const { verificarToken } = require('../middlewares/authMiddleware.js');

router.get('/', empresaController.getAllCompanies);
router.get('/:id', empresaController.getCompanyById);
router.post('/', verificarToken, empresaController.createCompany);
router.put('/:id', verificarToken, empresaController.updateCompany);
router.delete('/:id', verificarToken, empresaController.deleteCompany);

module.exports = router;
