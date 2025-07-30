import handlebars from 'handlebars';
import fs from 'node:fs';
import path from 'node:path';
import nodemailer from 'nodemailer';
import type {SendMailOptions} from 'nodemailer';

const SENDER_EMAIL = process.env.NODEMAILER_EMAIL as string;
const SENDER_PASSWORD = process.env.NODEMAILER_PASSWORD as string;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD,
    },
});

export async function sendVerificationLinkEmail({email, name, verificationLink}: {email: string; name: string; verificationLink: string}) {
    const templatePath = path.join(process.cwd(), 'templates', 'verify-email.html');
    const source = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(source);

    const html = template({name: name, verificationLink});

    const mailOptions: SendMailOptions = {
        from: process.env.NODE,
        to: email,
        subject: 'Please verify your email address',
        html,
    };
    try {
        const {accepted} = await transporter.sendMail({...mailOptions});
        if (accepted.length > 0) {
            console.log('✅ Email sent to:', accepted);
        } else {
            console.warn('⚠️ Email not accepted by any recipients.');
        }
    } catch (error) {
        console.log(error);
        console.log(`ERROR: unable to send the verification email, try again`);
    }
}
