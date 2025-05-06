import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
    const mailOptions = { from: process.env.EMAIL_USER, to, subject, text, };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.log('Error sending email:', error);
    }
};


// const subject = `Time to Water Your 🌿 ${plant_name}!`

// const text = `
//  Hi ${name},

// We just wanted to give you a gentle reminder — your plant **${plant_name}** is feeling a little thirsty! 💧

// A quick watering will have it back to thriving in no time.  
// Thanks for being such a great plant parent!

// Stay green,  
// — The Green World Team 🌱
// `