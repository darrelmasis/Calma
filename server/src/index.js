import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/booking/send-mail', async (req, res) => {
  const { name, phone, email, service, date, time, notes } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: 'dmasistab@gmail.com',
        pass: 'eykv sykw jqlo ufdc'
      }
    });

    await transporter.sendMail({
      from: `"Reserva Web" <dmasistab@gmail.com>`,
      to: 'dmasis@monisa.com',
      subject: `Nueva reserva de ${name}`,
      text: 'Hola, buen día',
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

app.listen(5000, () => console.log('Servidor corriendo en puerto 5000'));
