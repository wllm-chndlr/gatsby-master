const nodemailer = require('nodemailer');

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'geraldine92@ethereal.email',
        pass: 'mzQDV8z81mGCAfHArw',
    }
})