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

  const { name, prefix, phone, email, date, time, notes, message } = req.body

  if (!name || !email || !message) {
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

    // --- Render de servicios ---
    const renderServices = () => {
      let html = ''
      for (const categoryKey in message) {
        const services = message[categoryKey]
        if (!services.length) continue

        const categoryName = services[0].categoryName
        html += `<div style="margin-bottom:15px;">
          <h4 style="margin:0; background:#f4f4f4; padding:5px 10px; border-radius:8px; color:#9F814D;">${categoryName}</h4>`

        const subCategories = {}
        services.forEach((s) => {
          if (!subCategories[s.subCategoryName])
            subCategories[s.subCategoryName] = []
          subCategories[s.subCategoryName].push(s)
        })

        for (const sub in subCategories) {
          html += `<div style="margin-left:15px; margin-top:5px;">
            <strong>${sub}</strong>`
          subCategories[sub].forEach((service) => {
            html += `<div style="background:#fafafa; margin:5px 0; padding:8px 10px; border-radius:6px; font-size:14px; border:1px solid #e0d8c0;">
              ${service.serviceName}: ${service.serviceDescription} ($${service.servicePrice.toFixed(2)})
            </div>`
          })
          html += `</div>`
        }

        html += `</div>`
      }
      return html
    }

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
                    <h2 style="margin:0; font-size:22px;">Nueva Solicitud de Cita</h2>
                    <p style="margin:5px 0 0; font-size:14px; color:#485361">Un cliente ha enviado su solicitud de reserva</p>
                  </td>
                </tr>

                <!-- Contenido -->
                <tr>
  <td style="padding:20px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <!-- Detalles del cliente -->
        <td width="50%" valign="top" style="padding-right:10px; box-sizing:border-box; background-color:#EEF2F5; border-radius:12px; padding:16px;">
          <h3 style="margin-top:0; color:#9F814D; font-size:18px;">Detalles del Cliente</h3>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Teléfono:</strong> <a href="http://wa.me/${prefix}${phone.replace(/-/g, '')}" style="color:#1A2029; text-decoration:none;">${prefix} ${phone}</a></p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Notas:</strong> ${notes || 'Ninguna'}</p>
        </td>

        <!-- Detalles de la cita -->
        <td width="50%" valign="top" style="padding-left:10px; box-sizing:border-box; background-color:#EEF2F5; border-radius:12px; padding:16px;">
          <h3 style="margin-top:0; color:#9F814D; font-size:18px;">Detalles de la Cita</h3>
          <p><strong>Fecha:</strong> ${date || 'No proporcionada'}</p>
          <p><strong>Hora:</strong> ${time || 'No proporcionada'}</p>
        </td>
      </tr>
    </table>

    <!-- Servicios seleccionados -->
    <div style="margin-top:20px;">
      <h3 style="color:#9F814D; margin-bottom:10px; font-size:18px;">📝 Servicios Seleccionados</h3>
      ${renderServices()}
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
    const clientHtml = `
      <div style="margin:0; padding:20px; background-color:#f4f4f4; font-family: Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:650px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
                <!-- Header -->
                <tr>
                  <td align="center" style="background-color:#ffffff; color:#1A2029; padding:20px;">
                    <img src="https://res.cloudinary.com/darrelmasis/image/upload/c_thumb,w_100,g_face/v1758689242/svgviewer-png-output_cclztp.png" alt="Calma Nails & Spa" style="height:80px; margin-bottom:10px;" />
                    <h2 style="margin:0; font-size:22px;">¡Gracias por tu reserva!</h2>
                    <p style="margin:5px 0 0; font-size:14px; color:#485361">Hemos recibido tu solicitud y nos pondremos en contacto pronto para confirmarla.</p>
                  </td>
                </tr>

                <!-- Contenido -->
                <tr>
                  <td style="padding:20px;">
                    <h3 style="color:#9F814D; margin-top:0; font-size:18px;">Tus datos</h3>
                    <p><strong>Nombre:</strong> ${name}</p>
                    <p><strong>Teléfono:</strong> ${prefix} ${phone}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Fecha solicitada:</strong> ${date || 'Próximamente'}</p>
                    <p><strong>Hora solicitada:</strong> ${time || 'Por definir'}</p>
                    ${notes ? `<p><strong>Notas:</strong> ${notes}</p>` : ''}

                    <div style="margin-top:20px;">
                      <h3 style="color:#9F814D; margin-bottom:10px; font-size:18px;">📝 Servicios solicitados</h3>
                      ${renderServices()}
                    </div>

                    <div style="margin-top:25px; padding:15px; background:#f9f5eb; border-left:4px solid #9F814D; font-size:14px;">
                      <p>Pronto recibirás una confirmación final con la fecha y hora exactas.</p>
                      <p>¿Tienes dudas? Escríbenos por WhatsApp: <a href="http://wa.me/${prefix}${phone.replace(/-/g, '')}" style="color:#9F814D; text-decoration:underline;">${prefix} ${phone}</a></p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="background:#f4f4f4; padding:12px; font-size:12px; color:#666; border-top:1px solid #e0d8c0;">
                    Este es un mensaje automático. Por favor, no respondas a este correo.<br/>
                    Enviado el: ${new Date().toLocaleString('es-ES')}
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
      to: process.env.VITE_CALMA_EMAIL,
      cc: 'dmasis@monisa.com',
      subject: `📅 Nueva solicitud de cita de ${name}`,
      html: htmlContent
    })

    // --- Enviar correo de confirmación al cliente ---
    await transporter.sendMail({
      from: `"Calma Nails & Spa" <${process.env.MAIL_USER}>`,
      to: email, // ✅ Aquí va el email del cliente
      subject: `✅ Confirmación de tu solicitud - Calma Nails & Spa`,
      html: clientHtml
    })

    return res
      .status(200)
      .json({ ok: true, message: 'Correo enviado correctamente' })
  } catch (err) {
    console.error('Error enviando correo:', err)
    return res.status(500).json({
      ok: false,
      message: 'Error al enviar correo',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
  }
}
