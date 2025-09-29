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
        price: 299,
        isFree: false,
        address: 'African Union Conference Center, Roosevelt St',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: false,
    },
    {
        title: 'Global Environmental Summit',
        description:
            'The Global Environmental Summit aims to address critical issues surrounding climate change, biodiversity loss, and sustainable development. Participants will include scientists, policymakers, and activists who will share the latest research, innovative solutions, and strategies for environmental conservation. The summit will feature keynote speeches, roundtable discussions, and workshops focused on renewable energy, sustainable urban planning, and climate-resilient agriculture. Attendees will leave with actionable insights, partnerships, and tools to drive meaningful environmental impact on local, national, and global scales.',
        category: 'Charity & Causes',
        price: 0,
        isFree: true,
        address: 'United Nations Economic Commission for Africa, Menelik II Ave',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: true,
    },
    {
        title: 'World Culinary Festival',
        description:
            'The World Culinary Festival is a celebration of gastronomy, bringing together chefs, food enthusiasts, and culinary innovators from every corner of the globe. The event will feature cooking demonstrations, masterclasses, and tastings highlighting diverse cuisines, traditional techniques, and modern culinary trends. Beyond food, the festival will provide cultural performances, interactive workshops on nutrition and sustainability, and networking opportunities for aspiring chefs and industry professionals. Attendees will experience a rich sensory journey that deepens their appreciation of global culinary arts and fosters connections across the international food community.',
        category: 'Food & Drink',
        price: 75,
        isFree: false,
        address: 'Friendship International Hotel, Bole Subcity',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: false,
    },
    {
        title: 'International Film & Arts Expo',
        description:
            'The International Film & Arts Expo showcases groundbreaking works in cinema, visual arts, and performing arts, offering a platform for artists, filmmakers, and creatives to present their projects to a global audience. The event includes screenings, exhibitions, panel discussions, and networking sessions, providing participants with exposure, mentorship, and collaboration opportunities. Attendees can explore emerging trends in digital storytelling, immersive media, and cross-disciplinary collaborations, while also gaining insights into film production, distribution, and the evolving landscape of contemporary arts worldwide.',
        category: 'Arts & Culture',
        price: 120,
        isFree: false,
        address: 'National Theatre, Churchill Avenue',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: false,
    },
    {
        title: 'Global Health Innovation Summit',
        description:
            'The Global Health Innovation Summit focuses on transformative solutions in healthcare, public health, and medical technology. Leaders from hospitals, research institutions, biotech startups, and government agencies will convene to share best practices, breakthroughs, and policy frameworks aimed at improving health outcomes globally. The summit will feature keynote presentations, interactive workshops, and product demonstrations in areas such as telemedicine, AI-driven diagnostics, vaccine development, and healthcare accessibility. Participants will gain practical knowledge, form strategic partnerships, and explore emerging innovations designed to address pressing health challenges and drive systemic change.',
        category: 'Health & Wellness',
        price: 0,
        isFree: true,
        address: 'Skylight Hotel, Airport Road, Bole',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: true,
    },
    {
        title: 'World Music Festival',
        description:
            'A multi-day celebration of music featuring international artists across genres such as rock, jazz, electronic, and classical. The festival includes live concerts, collaborative jam sessions, and music production workshops, creating a vibrant space for both performers and audiences to explore the universal language of sound.',
        category: 'Music',
        price: 200,
        isFree: false,
        address: 'Millennium Hall, Bole Subcity',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: false,
    },
    {
        title: 'Startup & Business Leadership Forum',
        description:
            'This forum brings together entrepreneurs, investors, and business executives to discuss the future of global commerce. Attendees will participate in pitch competitions, strategy sessions, and leadership masterclasses, with opportunities to connect with potential partners and mentors.',
        category: 'Business',
        price: 150,
        isFree: false,
        address: 'Hilton Addis Hotel, Menelik II Ave',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: true,
    },
    {
        title: 'International Marathon Challenge',
        description:
            'The International Marathon Challenge invites runners of all levels to compete in a scenic, globally broadcast sporting event. With categories for professional athletes, amateurs, and families, the marathon promotes fitness, health awareness, and international unity through sports.',
        category: 'Sports & Fitness',
        price: 0,
        isFree: true,
        address: 'Meskel Square, City Center',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: false,
    },
    {
        title: 'Global Education Forum',
        description:
            'The Global Education Forum gathers educators, policymakers, and innovators to reimagine learning in the 21st century. Topics include digital classrooms, inclusive education, and future-ready skills. The forum includes workshops, panel discussions, and interactive exhibits for teachers and students alike.',
        category: 'Education',
        price: 90,
        isFree: false,
        address: 'Ethiopian Skylight Conference Center, Bole',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: true,
    },
    {
        title: 'Community Development Expo',
        description:
            'A grassroots event focused on strengthening communities through local initiatives, volunteer programs, and nonprofit collaborations. Attendees will discover opportunities to support social causes, learn community-building strategies, and celebrate local success stories.',
        category: 'Community',
        price: 0,
        isFree: true,
        address: 'Addis Ababa Exhibition Center, Meskel Square',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: false,
    },
    {
        title: 'Adventure Travel & Outdoor Expo',
        description:
            'An expo for adventure seekers, showcasing outdoor activities like hiking, camping, eco-tourism, and extreme sports. The event includes live gear demos, travel planning sessions, and talks by explorers and travel bloggers.',
        category: 'Travel & Outdoor',
        price: 50,
        isFree: false,
        address: 'Ghion Hotel Garden, Ras Desta Damtew Ave',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: false,
    },
    {
        title: 'Global Fashion Week',
        description:
            'A premier fashion event showcasing designers from around the world. Runway shows, fashion technology exhibits, and industry networking opportunities highlight trends in sustainable fashion, couture, and streetwear culture.',
        category: 'Fashion',
        price: 0,
        isFree: true,
        address: 'Skylight Hotel Grand Ballroom, Bole',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: false,
    },
    {
        title: 'International Children’s Festival',
        description:
            'A family-friendly event with educational games, storytelling sessions, creative workshops, and cultural performances designed to inspire and entertain children while encouraging family bonding.',
        category: 'Family',
        price: 25,
        isFree: false,
        address: 'Friendship Park, near Sheraton Addis',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: false,
    },
    {
        title: 'Charity Gala for Global Hunger Relief',
        description:
            'A black-tie fundraising gala featuring live entertainment, an art auction, and keynote addresses from humanitarian leaders. Funds raised will go toward international hunger relief initiatives and food security programs.',
        category: 'Charity & Causes',
        price: 300,
        isFree: false,
        address: 'Sheraton Addis Hotel, Taitu Street',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: false,
    },
    {
        title: 'World Jazz & Blues Festival',
        description:
            'An annual gathering of renowned jazz and blues musicians offering live performances, improvisation sessions, and masterclasses. The festival celebrates the cultural roots of music while fostering innovation and cross-genre collaborations.',
        category: 'Music',
        price: 0,
        isFree: true,
        address: 'Alliance Ethio-Française, Wavel St',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: false,
    },
    {
        title: 'Global Startup Hackathon',
        description:
            'A high-energy competition where innovators, developers, and designers collaborate over 48 hours to build prototypes addressing real-world problems. Mentorship, networking, and investor engagement create opportunities for groundbreaking startups to emerge.',
        category: 'Technology',
        price: 60,
        isFree: false,
        address: 'IceAddis Innovation Hub, Kazanchis',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: true,
    },
    {
        title: 'International Yoga & Wellness Retreat',
        description:
            'Set in a serene natural environment, this retreat offers yoga classes, meditation workshops, and wellness talks by global experts. The event encourages mental well-being, stress relief, and holistic health practices.',
        category: 'Health & Wellness',
        price: 0,
        isFree: true,
        address: 'Kuriftu Resort & Spa, Bishoftu (near Addis Ababa)',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: false,
    },
    {
        title: 'Culinary & Wine Pairing Gala',
        description:
            'A luxury dining experience featuring world-class chefs and sommeliers. Guests enjoy curated multi-course meals, wine pairings, and interactive tastings while learning about culinary artistry and global food trends.',
        category: 'Food & Drink',
        price: 180,
        isFree: false,
        address: 'Radisson Blu Hotel, Kazanchis',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: false,
    },
    {
        title: 'Global Leadership in Education Awards',
        description:
            'An event honoring educators, schools, and organizations that have pioneered innovation in teaching and learning. The awards ceremony is accompanied by networking sessions and knowledge-sharing workshops.',
        category: 'Education',
        price: 0,
        isFree: true,
        address: 'Elilly International Hotel, Kazanchis',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: true,
    },
    {
        title: 'International Cultural Heritage Festival',
        description:
            'A celebration of global traditions through music, dance, crafts, and storytelling. The festival highlights cultural diversity and fosters cross-cultural understanding in a lively, interactive setting.',
        category: 'Arts & Culture',
        price: 40,
        isFree: false,
        address: 'Addis Ababa Museum, Meskel Square',
        city: 'Addis Ababa',
        country: 'Ethiopia',
        isVirtual: false,
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
            const alreadyCreated = await prisma.eventsCategory.findFirst({
                where: {name: category.name},
            });
            if (!alreadyCreated) {
                await prisma.eventsCategory.create({data: category});
            }
        } catch (error) {
            console.error(
                ANSI_COLORS.BRIGHTRED,
                `Error creating EventCategory: ${JSON.stringify(error)}${ANSI_RESET}`,
            );
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
    if (!user) {
        console.log(
            ANSI_COLORS.RED,
            `\n User with ${DEFAULT_USER_EMAIL} email not found.\n`,
            ANSI_RESET,
        );
        return;
    }

    for (const {description, category: categoryName, title, price, isFree} of DEFAULT_EVENTS) {
        const category = await prisma.eventsCategory.findFirst({where: {name: categoryName}});
        if (!category) {
            console.log(
                ANSI_COLORS.RED,
                `\n Category with ${categoryName} not found.\n`,
                ANSI_RESET,
            );
            continue;
        }

        try {
            await prisma.events.create({
                data: {
                    title,
                    description,
                    isVirtual: true,
                    categoryId: category.id,
                    date: new Date(),
                    userId: user.id,
                    price,
                    isFree,
                    startTime: '11:30 AM',
                    endTime: '9:00 PM',
                },
            });
        } catch (error: any) {
            console.error(
                ANSI_COLORS.RED,
                `\nError creating event: ${title} ${error.message}${ANSI_RESET}`,
            );
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
        console.log(
            ANSI_COLORS.BRIGHTRED,
            '\n❌ Something went wrong while trying to seed the database.',
            '\n',
            ANSI_RESET,
        );
        console.log('\n', JSON.stringify(e), '\n');
    }
}

main();
