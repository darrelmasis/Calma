import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  // --- CORS ---
  res.setHeader('Access-Control-Allow-Origin', '*') // ⚠️ en prod usa tu dominio en lugar de *
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Método no permitido' })
  }

  const { nombre, apellido, telefono, prefix, email, mensaje } = req.body

  if (!nombre || !email || !mensaje) {
    return res
      .status(400)
      .json({ ok: false, message: 'Faltan datos obligatorios' })
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
    })

    const htmlContent = `
      <div style="margin:0; padding:20px; background-color:#f4f4f4; font-family: Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:650px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">

                <!-- Header -->
                <tr>
                  <td align="center" style="background-color:#ffffff; color:#1A2029; padding:20px;">
                    <img src="https://res.cloudinary.com/darrelmasis/image/upload/c_thumb,w_100,g_face/v1758689242/svgviewer-png-output_cclztp.png" alt="Calma Nails & Spa" style="height:80px; margin-bottom:10px;" />
                    <h2 style="margin:0; font-size:22px;">Nuevo Mensaje de Contacto</h2>
                    <p style="margin:5px 0 0; font-size:14px; color:#485361">Un cliente ha enviado un mensaje a través del formulario de contacto</p>
                  </td>
                </tr>

                <!-- Contenido -->
                <tr>
                  <td style="padding:20px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <!-- Información del contacto -->
                        <td width="100%" valign="top" style="background-color:#EEF2F5; border-radius:12px; padding:16px; box-sizing:border-box;">
                          <h3 style="margin-top:0; color:#9F814D; font-size:18px;">📧 Información del Contacto</h3>
                          <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
                          <p><strong>Teléfono:</strong> <a href="http://wa.me/${prefix}${telefono.replace(/-/g, '')}" style="color:#1A2029; text-decoration:none;">${prefix} ${telefono}</a></p>
                          <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#1A2029; text-decoration:none;">${email}</a></p>
                        </td>
                      </tr>
                    </table>

                    <!-- Mensaje del cliente -->
                    <div style="margin-top:20px;">
                      <h3 style="color:#9F814D; margin-bottom:10px; font-size:18px;">💬 Mensaje del Cliente</h3>
                      <div style="background-color:#f8f9fa; border-left:4px solid #9F814D; padding:15px; border-radius:8px; font-size:14px; line-height:1.6;">
                        ${mensaje.replace(/\n/g, '<br/>')}
                      </div>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="background:#f4f4f4; padding:12px; font-size:12px; color:#666; border-top:1px solid #e0d8c0;">
                    Este correo ha sido enviado automáticamente desde la web de Calma Nails & Spa.<br/>
                    Enviado el: ${new Date().toLocaleString()}
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </div>
    `

    await transporter.sendMail({
      from: `"Calma Nails & Spa" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO || 'dmasis@monisa.com',
      subject: `📩 Nuevo mensaje de contacto de ${nombre} ${apellido}`,
      html: htmlContent
    })

    return res
      .status(200)
      .json({ ok: true, message: 'Mensaje de contacto enviado correctamente' })
  } catch (err) {
    console.error('Error enviando correo de contacto:', err)
    return res.status(500).json({
      ok: false,
      message: 'Error al enviar el mensaje de contacto',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
  }
}
