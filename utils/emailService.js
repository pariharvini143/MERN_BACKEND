// server/utils/emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports (like 587)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Sends an email with the given options.
 * @param {Object} mailOptions - Options for the email (to, subject, text, html)
 */
const sendEmail = async (mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        // Response from the SMTP server
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); // Only if using ethereal.email for testing
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email. Check SMTP configuration and app password/permissions.');
    }
};

module.exports = {
    sendEmail,
};