import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 📧 Endpoint para correos
app.post('/booking/send-mail', async (req, res) => {
  const { name, phone, email, service, date, time, notes } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Reserva Web" <${process.env.MAIL_USER}>`,
      to: 'dmasis@monisa.com',
      subject: `Nueva reserva de ${name}`,
      html: `
        <h3>Datos de la reserva</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Servicio:</strong> ${service}</p>
        <p><strong>Fecha:</strong> ${date}</p>
        <p><strong>Hora:</strong> ${time}</p>
        <p><strong>Notas:</strong> ${notes}</p>
      `
    });

    res.json({ ok: true, message: 'Correo enviado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Error al enviar correo' });
  }
});

// 🌐 Servir el frontend en producción
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, '../../client/dist');

app.use(express.static(clientPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// 🚀 Levantar server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
