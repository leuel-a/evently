import lodashGet from 'lodash/get';
import type {Prisma} from '@/app/generated/prisma/client';
import {ANSI_COLORS, ANSI_RESET} from '@/config/constants';
import {signUp} from '@/lib/auth-client';
import {prisma} from '@/lib/prisma';
import {splitCamelCase, capitalizeFirstLetters} from '@/utils/strings';

const TEST_ORGANIZER_NAME = 'Test Organizer';
const TEST_ORGANIZER_PASSWORD = 'evently123%';
const TEST_ORGANIZATION_NAME = 'Test Organization';
const TEST_ORGANIZER_EMAIL = 'evently.organizer@gmail.com';

async function generateDefaultUser() {
    const {data, error} = await signUp.email({
        email: TEST_ORGANIZER_EMAIL,
        password: TEST_ORGANIZER_PASSWORD,
        name: TEST_ORGANIZER_NAME,
    });

    if (error) {
        console.error(`\n‼️ Something went wrong while creating the user: ${error.message}\n`);

        if (lodashGet(error, 'details.name') === 'PrismaClientValidationError') {
            const {message, statusText} = error;

            console.log(ANSI_COLORS.RED);
            console.log(`${message}: ${capitalizeFirstLetters(splitCamelCase(statusText))}`);
            console.log(ANSI_RESET);
        }
        return;
    }

    if (data?.user) {
        try {
            // const organizer = await prisma.organizer.create({data: {userId: data.user.id, organizationName: TEST_ORGANIZATION_NAME}});
            // console.log(
            //     `ℹ️ Organizer ${ANSI_COLORS.BLUE}${organizer.userId}${ANSI_RESET} has been created, org name is ${organizer.organizationName}`,
            //     ANSI_RESET,
            // );
        } catch (error: any) {
            console.error(`\nℹ️ Something went wrong while creating an organizer: ${ANSI_COLORS.RED}${error?.message}\n`, ANSI_RESET);
        }
    }

    console.log(`Default user created with email: ${TEST_ORGANIZER_EMAIL}`);
}

async function generateDefaultEventCategories() {
    const eventCategoryCounts = await prisma.eventsCategory.count();

    if (eventCategoryCounts !== 0) {
        console.log(
            ANSI_COLORS.BRIGHTCYAN,
            `\nℹ️ When seeding the table must be empty, so as not to loose data, please use --force if you want to bypass this feature\n`,
            ANSI_RESET,
        );
        return;
    }

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
    console.log(
        '\nℹ️: Default event categories created:',
        ANSI_COLORS.BRIGHTGREEN,
        eventCategoryData.map((c) => c.name).join(', '),
        '\n',
        ANSI_RESET,
    );
}

export async function main() {
    try {
        console.log('\n🚀 Seeding the database...\n');

        await Promise.all([generateDefaultUser(), generateDefaultEventCategories()]);
    } finally {
        console.log(ANSI_COLORS.GREEN, '\n🎉 Seeding the database is successful.\n', ANSI_RESET);
    }
}

main();
