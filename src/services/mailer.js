import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (nombre, email, comentario) => {
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
    <h2 style="color: #4CAF50;">¡Nuevo registro!</h2>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Comentario:</strong></p>
    <div style="background: #f9f9f9; padding: 10px 15px; border-radius: 5px; border-left: 3px solid #4CAF50;">
      ${comentario}
    </div>
    <p style="margin-top: 20px;">¡Disfrute del contenido!</strong>.</p>
  </div>
`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"JOB-DAY" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Confirmación de registro",
    html: htmlContent,
  });
};
