import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // ---- CORS ----
  res.setHeader("Access-Control-Allow-Origin", "*"); // Cambia "*" por tu dominio en producción
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  }

  const { nombre, prefix, phone, email, date, time, notes, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ ok: false, message: 'Faltan datos obligatorios' });
  }

  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.error('Faltan variables de entorno de email');
    return res.status(500).json({ ok: false, message: 'Error de configuración del servidor' });
  }

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
      from: `"Sistema de Reservas" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO || 'dmasis@monisa.com',
      subject: `📅 Nueva reserva de ${nombre}`,
      html: `
        <h3>Nueva Reserva desde la Web</h3>
        <ul>
          <li><strong>Nombre:</strong> ${nombre}</li>
          <li><strong>Teléfono:</strong> ${prefix || ''} ${phone || 'No proporcionado'}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Fecha:</strong> ${date || 'No proporcionada'}</li>
          <li><strong>Hora:</strong> ${time || 'No proporcionada'}</li>
          <li><strong>Notas:</strong> ${notes || 'Ninguna'}</li>
        </ul>
        <h4>Mensaje del cliente:</h4>
        <div>${mensaje}</div>
        <p><em>Enviado el: ${new Date().toLocaleString()}</em></p>
      `
    });

    return res.status(200).json({ ok: true, message: 'Correo enviado correctamente' });
  } catch (err) {
    console.error('Error enviando correo:', err);
    return res.status(500).json({
      ok: false,
      message: 'Error al enviar correo',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}
