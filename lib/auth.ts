import {betterAuth} from 'better-auth';
import {prismaAdapter} from 'better-auth/adapters/prisma';
import {headers} from 'next/headers';
import prisma from '@/lib/db/prisma';
import {sendVerificationLinkEmail} from '@/lib/email';

export type Session = typeof auth.$Infer.Session & {};

export const auth = betterAuth({
    trustedOrigins: ['http://localhost:3000'],
    database: prismaAdapter(prisma, {
        provider: 'mongodb',
        debugLogs: true,
    }),
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
    emailAndPassword: {enabled: true, requireEmailVerification: true},
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

export async function getServerSession() {
    return auth.api.getSession({headers: await headers()});
}
