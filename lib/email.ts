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
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email Address</title>
    <style>
        :root {
            --color-primary: #6366f1;
            --color-white: #ffffff;
            --color-very-dark-gray: #f1f5f9;
            --color-dark-gray: #e0e7ff;
            --color-blue: #5855eb;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            line-height: 1.6;
            padding: 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: var(--color-white);
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, var(--color-primary), 0%, #8b5cf6 100%);
            padding: 40px 30px;
            text-align: center;
        }

        .header h1 {
            color: var(--color-white);
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .header p {
            color: var(--color-dark-gray);
            font-size: 16px;
            margin: 0;
        }

        .content {
            padding: 40px 30px;
            text-align: center;
        }

        .greeting {
            font-size: 20px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 16px;
        }

        .message {
            font-size: 16px;
            color: #64748b;
            margin-bottom: 32px;
            line-height: 1.7;
        }

        .verify-button {
            display: inline-block;
            background-color: var(--color-primary);
            color: var(--color-white);
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: background-color 0.2s ease;
        }

        .verify-button:hover {
            background-color: var(--color-blue);
        }

        .alternative-link {
            margin-top: 32px;
            padding: 20px;
            background-color: var(--color-very-dark-gray);
            border-radius: 8px;
            border-left: 4px solid #6366f1;
        }

        .alternative-link p {
            font-size: 14px;
            color: #475569;
            margin-bottom: 8px;
        }

        .alternative-link a {
            color: #6366f1;
            word-break: break-all;
            text-decoration: none;
        }

        .footer {
            padding: 30px;
            text-align: center;
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
        }

        .footer p {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 8px;
        }

        .footer .company {
            font-weight: 600;
            color: #1e293b;
        }

        /* Mobile responsiveness */
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }

            .email-container {
                border-radius: 8px;
            }

            .header {
                padding: 30px 20px;
            }

            .header h1 {
                font-size: 24px;
            }

            .content {
                padding: 30px 20px;
            }

            .verify-button {
                padding: 14px 28px;
                font-size: 15px;
            }

            .footer {
                padding: 20px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <h1>Email Verification</h1>
            <p>Secure your account in one simple step</p>
        </div>

        <div class="content">
            <div class="greeting">Hello {{name}}!</div>

            <p class="message">
                Thank you for creating an account with us. To complete your registration and secure your account, please
                verify your email address by clicking the button below.
            </p>

            <a href="{{verificationLink}}" class="verify-button">Verify Email Address</a>

            <p class="message">
                This verification link will expire in 24 hours for security purposes.
            </p>

            <div class="alternative-link">
                <p><strong>Having trouble with the button?</strong></p>
                <p>Copy and paste this link into your browser:</p>
                <a href="{{verificationLink}}">{{verificationLink}}</a>
            </div>
        </div>

        <div class="footer">
            <p>If you didn't create an account with us, please ignore this email.</p>
            <p>No further action is required on your part.</p>
            <p class="company">— The Evently Team</p>
        </div>
    </div>
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
