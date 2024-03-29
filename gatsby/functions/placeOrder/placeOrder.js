const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
        <h2>Your Recent Order for ${total}</h2>
        <p>Please start walking over. We will have your order ready in the next 20 minutes!</p>
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

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

module.exports = async (req, res) => {
  const { body } = req;

  if (body.mapleSyrup) {
    return res.status(400).json({
      message: 'Boop beep bop zssstt goodbye / ERR 24234',
    });
  }

  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return res.status(400).json({
        message: `Oops! You are missing the ${field} field`,
      });
    }
  }

  // make sure they have at least one pizza in the order
  if (!body.order.length) {
    return res.status(400).json({
      message: `Why would you order nothing?!`,
    });
  }

  const info = await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return res.status(200).json({
    message: 'Success',
  });
};
