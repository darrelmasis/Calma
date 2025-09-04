import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  }

  const { name, phone, email, service, date, time, notes } = req.body;

  // Validar campos requeridos
  if (!name || !email || !service || !date || !time) {
    return res.status(400).json({
      ok: false,
      message: 'Faltan campos requeridos: nombre, email, servicio, fecha y hora'
    });
  }

  try {
    // Verificar que las variables de entorno estén configuradas
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      console.error('Variables de entorno de correo no configuradas');
      return res.status(500).json({
        ok: false,
        message: 'Error de configuración del servidor'
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    // Verificar la conexión con el servidor SMTP
    await transporter.verify();

    await transporter.sendMail({
      from: `"Sistema de Reservas" <${process.env.MAIL_USER}>`,
      to: 'dmasis@monisa.com',
      replyTo: email,
      subject: `Nueva reserva de ${name} - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4361ee; padding-bottom: 10px;">
            Nueva Reserva Recibida
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h3 style="color: #4361ee; margin-top: 0;">Datos de la reserva</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold; width: 30%;">Nombre:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Teléfono:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone || 'No proporcionado'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Servicio:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${service}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Fecha:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Hora:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${time}</td>
              </tr>
              ${notes ? `
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Notas:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${notes}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            Este mensaje fue enviado desde el formulario de reservas de tu sitio web.
          </p>
        </div>
      `
    });

    // Enviar correo de confirmación al cliente
    await transporter.sendMail({
      from: `"Sistema de Reservas" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `Confirmación de tu reserva para ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4361ee; padding-bottom: 10px;">
            Confirmación de Reserva
          </h2>
          <p>Hola ${name},</p>
          <p>Hemos recibido tu solicitud de reserva para el servicio <strong>${service}</strong>
          el <strong>${date}</strong> a las <strong>${time}</strong>.</p>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4361ee; margin-top: 0;">Resumen de tu reserva:</h3>
            <ul>
              <li><strong>Servicio:</strong> ${service}</li>
              <li><strong>Fecha:</strong> ${date}</li>
              <li><strong>Hora:</strong> ${time}</li>
            </ul>
          </div>

          <p>Nos pondremos en contacto contigo shortly para confirmar la disponibilidad.</p>
          <p>Si tienes alguna pregunta, no dudes en responder a este correo.</p>

          <p style="color: #666; font-size: 14px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
            Este es un mensaje automático, por favor no respondas directamente a este correo.
          </p>
        </div>
      `
    });

    res.status(200).json({
      ok: true,
      message: 'Correo enviado correctamente. Revisa tu email para confirmación.'
    });
  } catch (err) {
    console.error('Error al enviar correo:', err);

    // Mejor manejo de errores
    let errorMessage = 'Error al enviar correo';
    if (err.code === 'EAUTH') {
      errorMessage = 'Error de autenticación con el servidor de correo';
    } else if (err.code === 'ECONNECTION') {
      errorMessage = 'Error de conexión con el servidor de correo';
    }

    res.status(500).json({
      ok: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}
