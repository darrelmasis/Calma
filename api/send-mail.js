import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  return res.json({test: "ok"})
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  }

  const { name, phone, email, service, date, time, notes } = req.body;

  if (!name || !email || !service) {
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
      subject: `📅 Nueva reserva de ${name} - ${service}`,
      html: `
        <h3>Nueva Reserva desde la Web</h3>
        <ul>
          <li><strong>Nombre:</strong> ${name}</li>
          <li><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Servicio:</strong> ${service}</li>
          <li><strong>Fecha:</strong> ${date || 'No proporcionada'}</li>
          <li><strong>Hora:</strong> ${time || 'No proporcionada'}</li>
          <li><strong>Notas:</strong> ${notes || 'Ninguna'}</li>
        </ul>
        <p><em>Enviado el: ${new Date().toLocaleString()}</em></p>
      `
    });

    res.status(200).json({ ok: true, message: 'Correo enviado correctamente' });
  } catch (err) {
    console.error('Error enviando correo:', err);
    res.status(500).json({
      ok: false,
      message: 'Error al enviar correo',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}
