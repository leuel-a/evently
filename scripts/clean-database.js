import {PrismaClient} from '../app/generated';

const prisma = new PrismaClient();

export const ESC = '\x1b[';
export const RESET = ESC + '0m';
export const COLORS = {
    BLACK: ESC + '30m',
    RED: ESC + '31m',
    GREEN: ESC + '32m',
    YELLOW: ESC + '33m',
    BLUE: ESC + '34m',
    MAGENTA: ESC + '35m',
    CYAN: ESC + '36m',
    WHITE: ESC + '37m',
    BRIGHTBLACK: ESC + '90m',
    BRIGHTRED: ESC + '91m',
    BRIGHTGREEN: ESC + '92m',
    BRIGHTYELLOW: ESC + '93m',
    BRIGHTBLUE: ESC + '94m',
    BRIGHTMAGENTA: ESC + '95m',
    BRIGHTCYAN: ESC + '96m',
    BRIGHTWHITE: ESC + '97m',
    BOLD: ESC + '1m',
    UNDERLINE: ESC + '4m',
    INVERSE: ESC + '7m',
};

async function cleanDatabase() {
    await prisma.events.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.eventsCategory.deleteMany({});
}

if (process.env.NODE_ENV === 'development') {
    cleanDatabase()
        .then(() => {
            console.log(COLORS.GREEN, '\n🎉 Database cleared successfully\n', RESET);

            prisma.$disconnect();
        })
        .catch((error) => {
            console.error(COLORS.RED, `\n❌ Something went wrong while trying to clean the database: ${error?.message}\n`, RESET);

            prisma
                .$disconnect()
                .catch((_) => {
                    console.error(COLORS.BRIGHTCYAN, `\nℹ️ Unable to close prisma connection. \n`, RESET);
                    console.error(COLORS.RED, 'Exiting...\n', RESET);
                })
                .finally(() => {
                    process.exit(1);
                });
        });
}
