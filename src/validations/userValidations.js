const { body, param, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const createUserValidations = [
    body('nombre')
        .notEmpty().withMessage('El nombre es requerido')
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

    body('email')
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Debe ser un email válido'),

    body('username')
        .notEmpty().withMessage('El username es requerido')
        .isAlphanumeric().withMessage('El username solo debe contener letras y números')
        .isLength({ min: 3 }).withMessage('El username debe tener al menos 3 caracteres'),
        validateResult
];

const getUserValidations = [
    param('id')
        .optional()
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),
    validateResult
];

module.exports = {
    createUserValidations,
    getUserValidations,
    validateResult
}; 