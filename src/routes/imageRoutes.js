const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const { verificarToken } = require("../middlewares/authMiddleware.js");

const uploadDir = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); 
  } else {
    cb(new Error("El archivo no es una imagen válida"), false); 
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

router.post("/upload", verificarToken, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se ha subido ninguna imagen" });
  }

  res.status(200).json({
    message: "Imagen subida correctamente",
    file: req.file.filename,
  });
});

router.get("/", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Error al leer las imágenes" });
    }

    const imageUrls = files.map((file) => `http://localhost:3000/uploads/${file}`);
    res.status(200).json(imageUrls);
  });
});

router.delete("/:filename", verificarToken, (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadDir, filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).json({ message: "Imagen no encontrada o no se pudo eliminar" });
    }

    res.status(200).json({ message: "Imagen eliminada correctamente" });
  });
});

module.exports = router;