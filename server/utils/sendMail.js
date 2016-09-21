const nodemailer = require('nodemailer');
const {email} = require('server/config/config');

// create transporter
const transporter = nodemailer.createTransport(email);

export default ({to, subject, text, html}) => new Promise((resolve, reject) => {
    transporter.sendMail({
        from: 'Pulse app <a.tenhoopen@gmail.com>',
        to,
        subject,
        text,
        html
    }, (error, info) => {
        if (error) {
            return reject(error);
        }

        resolve(info);
    });
});
