import {Prisma} from '@/app/generated/client';
import {ANSI_COLORS, ANSI_RESET} from '@/config/constants';
import {auth} from '@/lib/auth';
import prisma from '@/lib/db/prisma';

const DEFAULT_USER_NAME = 'Leuel Asfaw Gebreselassie';
const DEFAULT_USER_EMAIL = 'leuel.asfaw@gmail.com';
const DEFAULT_USER_PASSWORD = 'LeuelAsfaw123';
const DEFAULT_USER_ORGANIZATION = 'LeuelA Organization';

async function seedDefaultUser() {
    const defaultUser = {
        name: DEFAULT_USER_NAME,
        email: DEFAULT_USER_EMAIL,
        password: DEFAULT_USER_PASSWORD,
        isOrganizer: true,
        organizationName: DEFAULT_USER_ORGANIZATION,
    };
    const {user} = await auth.api.signUpEmail({body: {...defaultUser}});
    console.log(
        ANSI_COLORS.BRIGHTGREEN,
        `\n Default User Created Successfully Created${ANSI_RESET}: ${ANSI_COLORS.UNDERLINE}${user.email} ${user.name}${ANSI_RESET}`,
    );
}

async function seedDefaultEventCateogries() {
    const defaultCategories: Prisma.EventsCategoryCreateInput[] = [
        {name: 'Music'},
        {name: 'Arts & Culture'},
        {name: 'Business'},
        {name: 'Technology'},
        {name: 'Sports & Fitness'},
        {name: 'Food & Drink'},
        {name: 'Health & Wellness'},
        {name: 'Education'},
        {name: 'Community'},
        {name: 'Travel & Outdoor'},
        {name: 'Fashion'},
        {name: 'Family'},
        {name: 'Charity & Causes'},
    ];
    for (const category of defaultCategories) {
        await prisma.eventsCategory.create({data: category});
    }
    console.log(
        ANSI_COLORS.BRIGHTGREEN,
        `\n Default Event Categories Successfully Created${ANSI_RESET}: ${ANSI_COLORS.UNDERLINE}${defaultCategories.map(({name}) => name).join(', ')}${ANSI_RESET}`,
    );
}

async function main() {
    console.log('\n🚀 Seeding Database...', ANSI_RESET, '\n');
    try {
        await seedDefaultUser();
        await seedDefaultEventCateogries();
        console.log('\n🎉 Seeding Database Successful', ANSI_RESET, '\n');
    } catch (e: any) {
        console.log(ANSI_COLORS.BRIGHTRED, '\n❌ Something went wrong while trying to seed the database.', '\n', ANSI_RESET);
        console.log('\n', JSON.stringify(e), '\n');
    }
}

main();
