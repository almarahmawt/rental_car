const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: '"BCR Rental Car" <admin@gmail.com>',
      to,
      subject,
      text,
      html
    });
    console.log('Email terkirim ke:', to);
  } catch (error) {
    console.error('Gagal mengirim email:', error);
  }
};

module.exports = { sendEmail };
