// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2; // Make sure v2 is used
// const { verificarToken } = require('../middlewares/authMiddleware.js'); // <--- ELIMINAR ESTA LÍNEA
const User = require('../models/User'); // IMPORTANT: Adjust path to your User Mongoose model

// Helper function to delete temporary files created by express-fileupload
const fs = require('fs');
const deleteTempFile = (filePath) => {
    if (filePath && fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting temporary file:", err);
        });
    }
};

// Route to Upload User Profile Image (userId ahora como parámetro de URL)
// Endpoint: POST /api/uploads/profile-image/:userId
router.post('/profile-image/:userId', async (req, res, next) => { // <--- CAMBIO AQUÍ: :userId en la URL
    try {
        const userId = req.params.userId; // <--- OBTENER userId DESDE req.params

        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: 'No se ha subido ningún archivo de imagen. Por favor, sube un archivo llamado "image".' });
        }

        const file = req.files.image;

        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedImageTypes.includes(file.mimetype)) {
            deleteTempFile(file.tempFilePath);
            return res.status(400).json({ message: 'Tipo de archivo inválido. Solo se permiten imágenes JPEG, PNG, GIF, WEBP.' });
        }

        // --- Búsqueda del usuario para asegurar que el ID es válido ---
        const userExists = await User.findById(userId);
        if (!userExists) {
            deleteTempFile(file.tempFilePath);
            return res.status(404).json({ message: 'Usuario no encontrado para subir la imagen de perfil.' });
        }

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: `user_profiles/${userId}`,
            resource_type: 'image',
            transformation: [
                { width: 200, height: 200, crop: "fill", gravity: "face" },
                { radius: "max" }
            ],
            type: 'upload'
        });

        await User.findByIdAndUpdate(userId, { url_perfil_img: result.secure_url });

        deleteTempFile(file.tempFilePath);

        res.status(200).json({
            message: 'Imagen de perfil subida y actualizada con éxito.',
            url: result.secure_url,
            public_id: result.public_id
        });

    } catch (error) {
        console.error('Error al subir imagen de perfil a Cloudinary:', error);
        if (req.files && req.files.image && req.files.image.tempFilePath) {
            deleteTempFile(req.files.image.tempFilePath);
        }
        next(error);
    }
});

// Route to Upload User Resume (PDF) (userId ahora como parámetro de URL)
// Endpoint: POST /api/uploads/resume/:userId
router.post('/resume/:userId', async (req, res, next) => { // <--- CAMBIO AQUÍ: :userId en la URL
    try {
        const userId = req.params.userId; // <--- OBTENER userId DESDE req.params

        if (!req.files || !req.files.pdf) {
            return res.status(400).json({ message: 'No se ha subido ningún archivo PDF. Por favor, sube un archivo llamado "pdf" para generar la imagen del currículum.' });
        }

        const file = req.files.pdf;

        if (file.mimetype !== 'application/pdf') {
            deleteTempFile(file.tempFilePath);
            return res.status(400).json({ message: 'Tipo de archivo inválido. Solo se permiten archivos PDF para el currículum (para ser transformado en imagen).' });
        }

        // --- Búsqueda del usuario para asegurar que el ID es válido ---
        const user = await User.findById(userId); // Cambiado de findOne a findById para consistencia
        if (!user) {
            deleteTempFile(file.tempFilePath);
            return res.status(404).json({ message: 'Usuario no encontrado para subir el currículum.' });
        }

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: `user_resumes/${userId}`,
            resource_type: 'image',
            format: 'jpg',
            pages: '1',
            public_id: `cv_preview_${userId}_${Date.now()}`,
            transformation: [
                { width: 800, crop: "limit" },
                { quality: "auto" }
            ],
            type: 'upload'
        });

        await User.findByIdAndUpdate(userId, { url_curriculum: result.secure_url });

        deleteTempFile(file.tempFilePath);

        res.status(200).json({
            message: 'Currículum subido y transformado a imagen con éxito.',
            url: result.secure_url,
            public_id: result.public_id
        });

    } catch (error) {
        console.error('Error al subir y transformar currículum a imagen en Cloudinary:', error);
        if (req.files && req.files.pdf && req.files.pdf.tempFilePath) {
            deleteTempFile(req.files.pdf.tempFilePath);
        }
        next(error);
    }
});

// Route to get a user's resume (This one already takes userId as a param)
// Endpoint: GET /api/uploads/resume/:userId
router.get('/resume/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        if (!user.url_curriculum) {
            return res.status(404).json({ message: 'Currículum no encontrado para este usuario.' });
        }

        res.redirect(user.url_curriculum);

    } catch (error) {
        console.error('Error al obtener currículum:', error);
        next(error);
    }
});

module.exports = router;