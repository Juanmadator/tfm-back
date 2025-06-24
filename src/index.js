const express = require("express");
const path = require("path");
const usuarioRoutes = require("./routes/userRoutes.js");
const imageRoutes = require("./routes/imageRoutes.js");
const ofertasRoutes = require("./routes/ofertaTrabajoRoutes.js");
const empresaRoutes = require("./routes/empresaRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const errorHandler = require("./middlewares/errorMiddleware.js");
const notFoundHandler = require("./middlewares/notFoundHandler.js");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const applicationRoutes = require("./routes/applicationRoutes.js");
dotenv.config();

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const allowedOrigins = [
  "https://jadator-jobday.netlify.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(mongoSanitize());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath: true,
  })
);

//Se queda comentada por si se quieren hacer más pruebas
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: 'Demasiadas peticiones desde esta IP, intenta más tarde.',
// });
// app.use(limiter);

app.use("/api/images", imageRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/empresas", empresaRoutes);
app.use("/api/ofertas", ofertasRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/applications", applicationRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;
