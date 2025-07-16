const {PrismaClient} = require('../app/generated/prisma/client'); // ignore the typescript (tsserver) diagnostics for neovim editors

const prisma = new PrismaClient();

async function cleanDatabase() {
    await prisma.organizer.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.eventsCategory.deleteMany({});
}

// TODO: only allow this script to run if the process.env.NODE_ENV === 'development'
cleanDatabase()
    .then(() => {
        console.log('Database cleared successfully');
        return prisma.$disconnect();
    })
    .catch((error) => {
        console.error(`Something went wrong while trying to clean the database: ${error?.message}`);
        return prisma.$disconnect();
    });
