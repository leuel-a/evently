import {ANSI_COLORS, ANSI_RESET} from '@/config/constants';
import {auth} from '@/lib/auth';
import prisma from '@/lib/db/prisma';

const DEFAULT_USER_NAME = 'Leuel Asfaw Gebreselassie';
const DEFAULT_USER_EMAIL = 'leuel.asfaw@gmail.com';
const DEFAULT_USER_PASSWORD = 'LeuelAsfaw123';
const DEFAULT_USER_ORGANIZATION = 'LeuelA Organization';
const DEFAULT_EVENTS = [
    {
        title: 'International Technology Conference 2025',
        description:
            'The International Technology Conference 2025 brings together the brightest minds from across the globe to explore cutting-edge developments in AI, robotics, quantum computing, and cybersecurity. Attendees will engage in workshops, keynote presentations, and panel discussions led by industry leaders, offering unparalleled opportunities to network, exchange ideas, and gain insights into the future of technology. The conference will also feature hands-on demos, startup showcases, and interactive sessions designed to inspire innovation and collaboration among professionals, academics, and enthusiasts alike.',
        category: 'Technology',
    },
    {
        title: 'Global Environmental Summit',
        description:
            'The Global Environmental Summit aims to address critical issues surrounding climate change, biodiversity loss, and sustainable development. Participants will include scientists, policymakers, and activists who will share the latest research, innovative solutions, and strategies for environmental conservation. The summit will feature keynote speeches, roundtable discussions, and workshops focused on renewable energy, sustainable urban planning, and climate-resilient agriculture. Attendees will leave with actionable insights, partnerships, and tools to drive meaningful environmental impact on local, national, and global scales.',
        category: 'Charity & Causes',
    },
    {
        title: 'World Culinary Festival',
        description:
            'The World Culinary Festival is a celebration of gastronomy, bringing together chefs, food enthusiasts, and culinary innovators from every corner of the globe. The event will feature cooking demonstrations, masterclasses, and tastings highlighting diverse cuisines, traditional techniques, and modern culinary trends. Beyond food, the festival will provide cultural performances, interactive workshops on nutrition and sustainability, and networking opportunities for aspiring chefs and industry professionals. Attendees will experience a rich sensory journey that deepens their appreciation of global culinary arts and fosters connections across the international food community.',
        category: 'Food & Drink',
    },
    {
        title: 'International Film & Arts Expo',
        description:
            'The International Film & Arts Expo showcases groundbreaking works in cinema, visual arts, and performing arts, offering a platform for artists, filmmakers, and creatives to present their projects to a global audience. The event includes screenings, exhibitions, panel discussions, and networking sessions, providing participants with exposure, mentorship, and collaboration opportunities. Attendees can explore emerging trends in digital storytelling, immersive media, and cross-disciplinary collaborations, while also gaining insights into film production, distribution, and the evolving landscape of contemporary arts worldwide.',
        category: 'Arts & Culture',
    },
    {
        title: 'Global Health Innovation Summit',
        description:
            'The Global Health Innovation Summit focuses on transformative solutions in healthcare, public health, and medical technology. Leaders from hospitals, research institutions, biotech startups, and government agencies will convene to share best practices, breakthroughs, and policy frameworks aimed at improving health outcomes globally. The summit will feature keynote presentations, interactive workshops, and product demonstrations in areas such as telemedicine, AI-driven diagnostics, vaccine development, and healthcare accessibility. Participants will gain practical knowledge, form strategic partnerships, and explore emerging innovations designed to address pressing health challenges and drive systemic change.',
        category: 'Health & Wellness',
    },
];
async function seedDefaultUser() {
    const alreadyCreatedUser = await prisma.user.findFirst({where: {email: DEFAULT_USER_EMAIL}});
    if (alreadyCreatedUser) return;

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
    const defaultCategories = [
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
        try {
            await prisma.eventsCategory.create({data: category});
        } catch (error) {
            console.error(ANSI_COLORS.BRIGHTRED, `Error creating EventCategory: ${JSON.stringify(error)}${ANSI_RESET}`);
        }
    }

    console.log(
        ANSI_COLORS.BRIGHTGREEN,
        `\n Default Event Categories Successfully Created${ANSI_RESET}: ${ANSI_COLORS.UNDERLINE}${defaultCategories.map(({name}) => name).join(', ')}${ANSI_RESET}`,
    );
}

async function seedDefaultEvents() {
    console.log(ANSI_COLORS.BRIGHTGREEN, `\nCreating Default Events...\n${ANSI_RESET}`);

    const user = await prisma.user.findFirst({where: {email: DEFAULT_USER_EMAIL}});
    if (!user) return;

    for (const {description, category: categoryName, title} of DEFAULT_EVENTS) {
        const category = await prisma.eventsCategory.findFirst({where: {name: categoryName}});
        if (!category) continue;

        try {
            await prisma.events.create({
                data: {
                    title,
                    description,
                    isVirtual: true,
                    categoryId: category.id,
                    date: new Date(),
                    userId: user.email,
                    startTime: '11:30 AM',
                    endTime: '9:00 PM',
                },
            });
        } catch (error: any) {
            console.error(ANSI_COLORS.RED, `\nError creating event: ${title} ${error.message}${ANSI_RESET}`);
        }
    }
}

async function main() {
    console.log('\n🚀 Seeding Database...', ANSI_RESET, '\n');
    try {
        await seedDefaultUser();
        await seedDefaultEventCateogries();
        await seedDefaultEvents();
        console.log('\n🎉 Seeding Database Successful', ANSI_RESET, '\n');
    } catch (e: any) {
        console.log(ANSI_COLORS.BRIGHTRED, '\n❌ Something went wrong while trying to seed the database.', '\n', ANSI_RESET);
        console.log('\n', JSON.stringify(e), '\n');
    }
}

main();
