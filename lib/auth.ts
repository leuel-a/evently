import {betterAuth} from 'better-auth';
import {prismaAdapter} from 'better-auth/adapters/prisma';
import {nextCookies} from 'better-auth/next-js';
import prisma from '@/lib/db/prisma';
import {sendVerificationLinkEmail} from '@/lib/email';

export type Session = typeof auth.$Infer.Session & {};

export const auth = betterAuth({
    plugins: [nextCookies()],
    database: prismaAdapter(prisma, {
        provider: 'mongodb',
        // debugLogs: true,
    }),
    session: {storeSessionInDatabase: true},
    advanced: {database: {generateId: false}},
    emailVerification: {
        sendVerificationEmail: async ({user, url}) => {
            await sendVerificationLinkEmail({
                email: user.email,
                name: user.name,
                verificationLink: url,
            });
        },
    },
    emailAndPassword: {enabled: true, requireEmailVerification: false},
    user: {
        additionalFields: {
            isOrganizer: {
                defaultValue: false,
                required: true,
                type: 'boolean',
            },
            organizationName: {
                required: false,
                type: 'string',
            },
        },
    },
});
