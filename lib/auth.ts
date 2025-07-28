import {betterAuth} from 'better-auth';
import {prismaAdapter} from 'better-auth/adapters/prisma';
import {prisma} from '@/lib/db';

export type Session = typeof auth.$Infer.Session & {};

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    minPasswordLength: 8,
    maxPasswordLength: 12,
    enabled: true,
  },
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
