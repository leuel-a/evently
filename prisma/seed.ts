import {v4 as uuid} from 'uuid';
import type {Prisma} from '@/app/generated/prisma/client';
import {prisma} from '@/lib/prisma';
import {hashPassword} from '@/utils/password';

const TEST_ORGANIZER_EMAIL = 'evently.organizer@gmail.com';
const TEST_ORGANIZER_PASSWORD = 'evently123%';

function generateFakeId() {
    return String(uuid());
}

async function generateDefaultUser() {
    const hashedPassword = await hashPassword(TEST_ORGANIZER_PASSWORD);

    const userId = generateFakeId();
    const userInput: Prisma.UserCreateInput = {
        id: generateFakeId(),
        email: TEST_ORGANIZER_EMAIL,
        password: hashedPassword,
        firstName: 'Evently',
        lastName: 'Admin Organizer,',
        name: 'evently_admin',
        phone: '+1234567890',
        emailVerified: true,
        isOrganizer: true,
    };

    const user = await prisma.user.create({data: {...userInput}});

    const organizer: Prisma.OrganizerCreateInput = {
        user: {
            connect: {id: user.id},
        },
    };

    await prisma.organizer.create({
        data: {
            userId,
        },
    });

    // FIXME: use a proper logging system instead of just just using the Browser Console
    console.log(`Default user created with email: ${TEST_ORGANIZER_EMAIL}`);
}

async function generateDefaultEventCategories() {
    const eventCategoryData: Prisma.EventsCategoryCreateInput[] = [
        {name: 'Conference'},
        {name: 'Workshop'},
        {name: 'Meetup'},
        {name: 'Webinar'},
        {name: 'Concert'},
    ];

    for (const category of eventCategoryData) {
        await prisma.eventsCategory.create({data: category});
    }

    // TODO: figure out how to create a more better way of seeding the data
    // NOTE: use a proper logging system instead of just just using the Browser Console
    console.log('Default event categories created:', eventCategoryData.map((c) => c.name).join(', '));
}

export async function main() {
    await Promise.all([generateDefaultUser(), generateDefaultEventCategories()]);
}

main();
