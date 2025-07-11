import {PrismaClient} from '@/app/generated/prisma';
import type {Prisma} from '@/app/generated/prisma';

const prisma = new PrismaClient();

export type {Prisma};
export {prisma};
