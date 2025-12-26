import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    console.log(`Sending email to: ${options.email} with host: smtp.gmail.com`);
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 5000, // 5 seconds
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD.replace(/\s+/g, ''),
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const message = {
        from: `${process.env.FROM_NAME} <${process.env.SMTP_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: options.html // Can add HTML templates later
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

export default sendEmail;
