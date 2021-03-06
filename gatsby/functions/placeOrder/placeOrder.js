const nodemailer = require('nodemailer');

// take in data and interpolate it
function generateOrderEmail({ order, total }) {
  return `<div>
  <h2>Your recent order for ${total}</h2>
  <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
  <ul>
  ${order
    .map(
      (item) => `<li>
  <img src="${item.thumbnail}" alt="${item.name}" />
  ${item.size} ${item.name} - ${item.price}
  </li>`
    )
    .join('')}
  </ul>
  <p>Your total is <strong>$${total}</strong> due at pickup</p>
  <style>
  ul {
    list-style: none;
  }
  </style>
  </div>`;
}

// We need to create a transport for nodemailer

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// wait function to extend loading time for testing
// function wait(ms = 0) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms);
//   });
// }

exports.handler = async (event, context) => {
  // await wait(5000);
  const body = JSON.parse(event.body);
  // Check if honeypot was filled out
  if (body.mapleSyrup) {
    return {
      satusCode: 400,
      body: JSON.stringify({
        message: 'boop beep bop zzzzstt goodbye ERR 36932',
      }),
    };
  }
  // Validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `ERROR! You are missing the ${field} field`,
        }),
      };
    }
  }

  // Make sure user actually orders something

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }

  // Send the email

  // Send the success or error message

  // test send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
