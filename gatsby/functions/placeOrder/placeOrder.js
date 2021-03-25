const nodemailer = require('nodemailer');

// We need to create a transport for nodemailer

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Test sending an email

exports.handler = async (event, context) => {
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: 'orders@example.com',
    subject: 'New order!',
    html: `<p>Your new pizza order is here</p>`,
  });
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
