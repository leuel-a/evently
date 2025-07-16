import {prisma} from '@/lib/prisma';
import {signUp} from '@/lib/auth-client';
import type {Prisma} from '@/app/generated/prisma/client';

const TEST_ORGANIZER_NAME = 'Test Organizer';
const TEST_ORGANIZATION_NAME = 'Test Organization';
const TEST_ORGANIZER_PASSWORD = 'evently123%';
const TEST_ORGANIZER_EMAIL = 'evently.organizer@gmail.com';

async function generateDefaultUser() {
    const {data, error} = await signUp.email({
        email: TEST_ORGANIZER_EMAIL,
        password: TEST_ORGANIZER_PASSWORD,
        name: TEST_ORGANIZER_NAME,
    });

    if (error) {
        console.log(error);
        console.error(`Something went wrong while creating the user: ${error.message}`);
        process.exit(1);
    }

    if (data?.user) {
        try {
            const organizer = await prisma.organizer.create({data: {userId: data.user.id, organizationName: TEST_ORGANIZATION_NAME}});
            console.log(`Organizer ${organizer.userId} has been created, org name is ${organizer.organizationName}`);
        } catch (error: any) {
            console.error(`Something went wrong while creating an organizer: ${error?.message}`);
        }
    }

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
