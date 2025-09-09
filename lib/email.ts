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

const template = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Email Verification</title>
    <style>
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        background-color: #007BFF;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <h2>Verify Your Email</h2>
    <p>Hi {{name}},</p>
    <p>Thanks for signing up! Please confirm your email address by clicking the button below:</p>
    <a href="{{verificationLink}}" class="button">Verify Email</a>
    <p>If you didn't create this account, you can ignore this email.</p>
    <p>— Evently Team</p>
  </body>
</html>
`;

export async function sendVerificationLinkEmail({
    email,
    name,
    verificationLink,
}: {
    email: string;
    name: string;
    verificationLink: string;
}) {
    const html = template
        .replace(/{{\s*name\s*}}/g, name)
        .replace(/{{\s*verificationLink\s*}}/g, verificationLink);
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
