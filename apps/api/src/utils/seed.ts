import '../env';

import mongoose from 'mongoose';
import Ticket from '../models/tickets/index';
import {TicketDocument} from '../models/tickets/schema';
import Event from '../models/events/index';
import {EventDocument} from '../models/events/schema';
import Resource from '../models/resources/index';
import EventCategory from '../models/eventsCategory/index';

const DATABASE_URL = process.env.DATABASE_URL;

const defaultUserId = '6a1eaba394754e77c069b33a';
const defaultResources = [{name: 'events'}, {name: 'eventsCategory'}];

const defaultPurchasers = [
    {name: 'Abel Tesfaye', email: 'abel.tesfaye@example.com'},
    {name: 'Hana Bekele', email: 'hana.bekele@example.com'},
    {name: 'Dawit Alemu', email: 'dawit.alemu@example.com'},
    {name: 'Selam Tadesse', email: 'selam.tadesse@example.com'},
    {name: 'Ruth Kebede', email: 'ruth.kebede@example.com'},
    {name: 'Nati Girma', email: 'nati.girma@example.com'},
    {name: 'Meron Haile', email: 'meron.haile@example.com'},
    {name: 'Samuel Worku', email: 'samuel.worku@example.com'},
    {name: 'Bethel Assefa', email: 'bethel.assefa@example.com'},
    {name: 'Yonas Fikru', email: 'yonas.fikru@example.com'},
    {name: 'Lidiya Solomon', email: 'lidiya.solomon@example.com'},
    {name: 'Henok Bekele', email: 'henok.bekele@example.com'},
    {name: 'Rahel Getachew', email: 'rahel.getachew@example.com'},
    {name: 'Biruk Teshome', email: 'biruk.teshome@example.com'},
    {name: 'Eden Mesfin', email: 'eden.mesfin@example.com'},
    {name: 'Surafel Abate', email: 'surafel.abate@example.com'},
    {name: 'Mahi Deribe', email: 'mahi.deribe@example.com'},
    {name: 'Naol Mebratu', email: 'naol.mebratu@example.com'},
    {name: 'Saron Desta', email: 'saron.desta@example.com'},
    {name: 'Bamlak Kassahun', email: 'bamlak.kassahun@example.com'},
];

const seedEventsCategoryData = [
    {user: defaultUserId, name: 'Technology', description: 'AI, software, and emerging tech.'},
    {user: defaultUserId, name: 'Business', description: 'Founders, strategy, and startups.'},
    {user: defaultUserId, name: 'Education', description: 'Workshops, bootcamps, and training.'},
    {user: defaultUserId, name: 'Health', description: 'Health and wellbeing events.'},
    {user: defaultUserId, name: 'Arts', description: 'Cultural and creative events.'},
    {user: defaultUserId, name: 'Music', description: 'Concerts and live shows.'},
    {user: defaultUserId, name: 'Sports', description: 'Sports and physical activities.'},
    {user: defaultUserId, name: 'Networking', description: 'Social and professional meetups.'},
    {user: defaultUserId, name: 'Science', description: 'Scientific talks and conferences.'},
    {user: defaultUserId, name: 'Lifestyle', description: 'Personal interests and hobbies.'},
];

/**
 * Uneven distribution across 10 categories — intentionally skewed for
 * dashboard chart testing. Dominant categories vs. long-tail categories.
 * Total = 200.
 */
const CATEGORY_COUNTS: Record<string, number> = {
    Technology: 38, // dominant
    Business: 28, // large
    Music: 22, // mid
    Education: 22, // mid
    Health: 18, // mid-small
    Science: 18, // mid-small
    Networking: 14, // small
    Arts: 16, // small
    Sports: 12, // tail
    Lifestyle: 12, // tail
};

// ─── Date helpers ──────────────────────────────────────────────────────────────

/**
 * Generate `count` dates spread evenly across Jan 2024 – Dec 2025.
 * Each date gets a fixed UTC hour so they're stable across timezones.
 */
function generateSpacedDates(count: number): Date[] {
    const start = new Date('2024-01-01T10:00:00.000Z');
    const end = new Date('2025-12-31T10:00:00.000Z');
    const totalMs = end.getTime() - start.getTime();
    const intervalMs = totalMs / (count - 1);

    return Array.from({length: count}, (_, i) => {
        const d = new Date(start.getTime() + i * intervalMs);
        d.setUTCHours(10, 0, 0, 0);
        return d;
    });
}

// ─── Event templates ───────────────────────────────────────────────────────────

interface EventTemplate {
    title: string;
    description: string;
    type?: 'virtual' | 'physical';
    ticketPrice: number;
    capacity: number;
}

const templatesByCategory: Record<string, EventTemplate[]> = {
    Technology: [
        {
            title: 'AI & ML Symposium',
            description: 'Latest advancements in neural networks.',
            type: 'virtual',
            ticketPrice: 299,
            capacity: 150,
        },
        {
            title: 'Frontend Workshop',
            description: 'React hooks and performance optimization.',
            type: 'physical',
            ticketPrice: 49.99,
            capacity: 50,
        },
        {
            title: 'Blockchain Summit',
            description: 'Decentralized finance and smart contracts.',
            type: 'virtual',
            ticketPrice: 199,
            capacity: 200,
        },
        {
            title: 'DevOps & Cloud Conf',
            description: 'CI/CD, Kubernetes, and cloud-native patterns.',
            type: 'virtual',
            ticketPrice: 149,
            capacity: 300,
        },
        {
            title: 'Cybersecurity Forum',
            description: 'Threat modeling and zero-trust architecture.',
            type: 'virtual',
            ticketPrice: 249,
            capacity: 200,
        },
        {
            title: 'Mobile Dev Bootcamp',
            description: 'Cross-platform mobile with React Native.',
            type: 'physical',
            ticketPrice: 79.99,
            capacity: 60,
        },
        {
            title: 'Open Source Weekend',
            description: 'Collaborative open-source contribution sprint.',
            type: 'physical',
            ticketPrice: 0,
            capacity: 50,
        },
        {
            title: 'Data Engineering Conf',
            description: 'Pipelines, lakes, and real-time streaming.',
            type: 'virtual',
            ticketPrice: 179,
            capacity: 250,
        },
        {
            title: 'Web3 Hackathon',
            description: 'Build on-chain in 48 hours.',
            type: 'physical',
            ticketPrice: 0,
            capacity: 120,
        },
        {
            title: 'AR/VR Expo',
            description: 'Immersive technology demos and talks.',
            type: 'physical',
            ticketPrice: 99,
            capacity: 180,
        },
    ],
    Business: [
        {
            title: 'Startup Pitch Night',
            description: 'Founders pitch to angels and VCs.',
            type: 'physical',
            ticketPrice: 25,
            capacity: 120,
        },
        {
            title: 'Growth Hacking Workshop',
            description: 'Data-driven strategies for rapid growth.',
            type: 'physical',
            ticketPrice: 59.99,
            capacity: 80,
        },
        {
            title: 'Venture Capital Summit',
            description: 'LP-GP dynamics and emerging fund strategies.',
            type: 'virtual',
            ticketPrice: 399,
            capacity: 100,
        },
        {
            title: 'Product Strategy Day',
            description: 'Roadmapping and prioritization frameworks.',
            type: 'physical',
            ticketPrice: 89,
            capacity: 70,
        },
        {
            title: 'Founder Fireside Chat',
            description: 'Candid lessons from successful founders.',
            type: 'physical',
            ticketPrice: 20,
            capacity: 150,
        },
        {
            title: 'B2B Sales Masterclass',
            description: 'Enterprise sales motion and deal closing.',
            type: 'virtual',
            ticketPrice: 129,
            capacity: 200,
        },
        {
            title: 'Finance for Founders',
            description: 'Runway, unit economics, and fundraising.',
            type: 'virtual',
            ticketPrice: 49.99,
            capacity: 300,
        },
        {
            title: 'Leadership Retreat',
            description: 'Executive coaching and team alignment.',
            type: 'physical',
            ticketPrice: 299,
            capacity: 40,
        },
        {
            title: 'E-commerce Summit',
            description: 'DTC brand building and logistics strategy.',
            type: 'virtual',
            ticketPrice: 99,
            capacity: 250,
        },
        {
            title: 'SMB Networking Lunch',
            description: 'Peer connections for small business owners.',
            type: 'physical',
            ticketPrice: 15,
            capacity: 60,
        },
    ],
    Education: [
        {
            title: 'UX Design Bootcamp',
            description: 'User research and prototyping techniques.',
            type: 'physical',
            ticketPrice: 79.99,
            capacity: 40,
        },
        {
            title: 'Data Science 101',
            description: 'Pandas, NumPy, and model basics.',
            type: 'virtual',
            ticketPrice: 49.99,
            capacity: 500,
        },
        {
            title: 'Public Speaking Course',
            description: 'Storytelling and stage presence.',
            type: 'physical',
            ticketPrice: 69,
            capacity: 30,
        },
        {
            title: 'Writing for the Web',
            description: 'SEO copy and content strategy.',
            type: 'virtual',
            ticketPrice: 39.99,
            capacity: 200,
        },
        {
            title: 'Python for Beginners',
            description: 'Hands-on intro to programming.',
            type: 'virtual',
            ticketPrice: 0,
            capacity: 1000,
        },
        {
            title: 'Project Management Pro',
            description: 'Agile, Scrum, and Kanban in practice.',
            type: 'virtual',
            ticketPrice: 89,
            capacity: 300,
        },
        {
            title: 'Financial Literacy Workshop',
            description: 'Budgeting, investing, and debt management.',
            type: 'physical',
            ticketPrice: 29,
            capacity: 80,
        },
        {
            title: 'Creative Writing Lab',
            description: 'Flash fiction and narrative craft.',
            type: 'physical',
            ticketPrice: 45,
            capacity: 25,
        },
        {
            title: 'Language Exchange Meetup',
            description: 'Practice Amharic, English, and French.',
            type: 'physical',
            ticketPrice: 0,
            capacity: 50,
        },
        {
            title: 'Teacher Development Day',
            description: 'Pedagogy and classroom innovation.',
            type: 'physical',
            ticketPrice: 35,
            capacity: 100,
        },
    ],
    Health: [
        {
            title: 'Mindfulness Workshop',
            description: 'Stress management and mental resilience.',
            type: 'physical',
            ticketPrice: 49.99,
            capacity: 60,
        },
        {
            title: 'Nutrition Masterclass',
            description: 'Evidence-based dietary strategies.',
            type: 'virtual',
            ticketPrice: 39.99,
            capacity: 400,
        },
        {
            title: 'Mental Health Summit',
            description: 'Reducing stigma and building resilience.',
            type: 'virtual',
            ticketPrice: 0,
            capacity: 500,
        },
        {
            title: 'Yoga & Breathwork Retreat',
            description: 'Morning yoga flow and pranayama.',
            type: 'physical',
            ticketPrice: 59,
            capacity: 30,
        },
        {
            title: 'Sleep Science Talk',
            description: 'Optimizing sleep for peak performance.',
            type: 'virtual',
            ticketPrice: 19.99,
            capacity: 300,
        },
        {
            title: 'Health Tech Expo',
            description: 'Wearables, diagnostics, and digital health.',
            type: 'physical',
            ticketPrice: 75,
            capacity: 150,
        },
        {
            title: "Women's Wellness Day",
            description: 'Holistic health for women at every stage.',
            type: 'physical',
            ticketPrice: 35,
            capacity: 100,
        },
        {
            title: 'Fitness Challenge Kickoff',
            description: 'Group accountability and training plan launch.',
            type: 'physical',
            ticketPrice: 20,
            capacity: 80,
        },
        {
            title: 'First Aid Certification',
            description: 'CPR and emergency response training.',
            type: 'physical',
            ticketPrice: 89,
            capacity: 20,
        },
        {
            title: 'Chronic Illness Forum',
            description: 'Living well with long-term conditions.',
            type: 'virtual',
            ticketPrice: 0,
            capacity: 200,
        },
    ],
    Arts: [
        {
            title: 'Digital Art Expo',
            description: 'Local and international digital installations.',
            type: 'physical',
            ticketPrice: 15,
            capacity: 250,
        },
        {
            title: 'Photography Workshop',
            description: 'Composition, light, and post-processing.',
            type: 'physical',
            ticketPrice: 55,
            capacity: 20,
        },
        {
            title: 'Film Screening Night',
            description: 'Independent shorts and Q&A with directors.',
            type: 'physical',
            ticketPrice: 10,
            capacity: 100,
        },
        {
            title: 'Pottery & Ceramics Class',
            description: 'Wheel throwing for beginners.',
            type: 'physical',
            ticketPrice: 65,
            capacity: 15,
        },
        {
            title: 'Street Art Tour',
            description: 'Guided tour of urban murals and public art.',
            type: 'physical',
            ticketPrice: 12,
            capacity: 30,
        },
        {
            title: 'Fashion Design Showcase',
            description: 'Emerging designers present their collections.',
            type: 'physical',
            ticketPrice: 20,
            capacity: 200,
        },
        {
            title: 'Theatre Improv Night',
            description: 'Interactive improv comedy performances.',
            type: 'physical',
            ticketPrice: 18,
            capacity: 80,
        },
        {
            title: 'Gallery Opening',
            description: 'Contemporary mixed-media exhibition.',
            type: 'physical',
            ticketPrice: 0,
            capacity: 150,
        },
        {
            title: 'Illustration Masterclass',
            description: 'Character design and visual storytelling.',
            type: 'physical',
            ticketPrice: 75,
            capacity: 20,
        },
        {
            title: 'Cultural Heritage Fair',
            description: 'Celebrating Ethiopian arts and crafts.',
            type: 'physical',
            ticketPrice: 5,
            capacity: 500,
        },
    ],
    Music: [
        {
            title: 'Indie Acoustic Night',
            description: 'Emerging indie and acoustic artists live.',
            type: 'physical',
            ticketPrice: 29.99,
            capacity: 150,
        },
        {
            title: 'Jazz & Blues Evening',
            description: 'Soulful jazz in an intimate setting.',
            type: 'physical',
            ticketPrice: 39.99,
            capacity: 100,
        },
        {
            title: 'DJ & Electronic Music Fest',
            description: 'Local electronic and dance music artists.',
            type: 'physical',
            ticketPrice: 45,
            capacity: 300,
        },
        {
            title: 'Gospel Choir Concert',
            description: 'Uplifting gospel and community celebration.',
            type: 'physical',
            ticketPrice: 15,
            capacity: 400,
        },
        {
            title: 'Music Production Workshop',
            description: 'Beat making, mixing, and mastering basics.',
            type: 'physical',
            ticketPrice: 99,
            capacity: 25,
        },
        {
            title: 'Classical Recital',
            description: 'Piano and violin chamber music evening.',
            type: 'physical',
            ticketPrice: 35,
            capacity: 120,
        },
        {
            title: 'Open Mic Night',
            description: 'Any genre, any level — just get up and play.',
            type: 'physical',
            ticketPrice: 5,
            capacity: 80,
        },
        {
            title: 'Music Business Seminar',
            description: 'Royalties, licensing, and artist branding.',
            type: 'virtual',
            ticketPrice: 49,
            capacity: 200,
        },
        {
            title: 'Afrobeats Showcase',
            description: 'Celebrating contemporary African rhythms.',
            type: 'physical',
            ticketPrice: 25,
            capacity: 250,
        },
        {
            title: 'Singer-Songwriter Retreat',
            description: 'Writing, recording, and collaboration.',
            type: 'physical',
            ticketPrice: 249,
            capacity: 20,
        },
    ],
    Sports: [
        {
            title: '5K Fun Run',
            description: 'Community fun run through the city.',
            type: 'physical',
            ticketPrice: 20,
            capacity: 500,
        },
        {
            title: 'Basketball Tournament',
            description: '3v3 street basketball competition.',
            type: 'physical',
            ticketPrice: 10,
            capacity: 200,
        },
        {
            title: 'Football Skills Camp',
            description: 'Drills and technique training for youth.',
            type: 'physical',
            ticketPrice: 35,
            capacity: 60,
        },
        {
            title: 'Martial Arts Seminar',
            description: 'Judo and self-defense fundamentals.',
            type: 'physical',
            ticketPrice: 45,
            capacity: 40,
        },
        {
            title: 'Swimming Gala',
            description: 'Competitive and recreational swim meet.',
            type: 'physical',
            ticketPrice: 15,
            capacity: 150,
        },
        {
            title: 'Cycling Challenge',
            description: 'Scenic 50km road cycling event.',
            type: 'physical',
            ticketPrice: 25,
            capacity: 100,
        },
        {
            title: 'Volleyball League Opener',
            description: 'Season kickoff tournament and mixer.',
            type: 'physical',
            ticketPrice: 12,
            capacity: 80,
        },
        {
            title: 'CrossFit Open Day',
            description: 'Community CrossFit benchmark workouts.',
            type: 'physical',
            ticketPrice: 0,
            capacity: 50,
        },
        {
            title: 'Sports Nutrition Talk',
            description: 'Fueling performance with food science.',
            type: 'virtual',
            ticketPrice: 19.99,
            capacity: 300,
        },
        {
            title: 'Athletics Day',
            description: 'Track and field events for all ages.',
            type: 'physical',
            ticketPrice: 8,
            capacity: 400,
        },
    ],
    Networking: [
        {
            title: 'Women in Tech Mixer',
            description: 'Connecting women in the industry.',
            type: 'physical',
            ticketPrice: 0,
            capacity: 100,
        },
        {
            title: 'Young Professionals Night',
            description: 'Speed networking for early-career pros.',
            type: 'physical',
            ticketPrice: 10,
            capacity: 80,
        },
        {
            title: 'Startup Founders Meetup',
            description: 'Informal gathering for early-stage builders.',
            type: 'physical',
            ticketPrice: 0,
            capacity: 60,
        },
        {
            title: 'Creative Industry Social',
            description: 'Designers, writers, and artists mingle.',
            type: 'physical',
            ticketPrice: 5,
            capacity: 100,
        },
        {
            title: 'Alumni Reunion Mixer',
            description: 'Reconnecting university alumni locally.',
            type: 'physical',
            ticketPrice: 0,
            capacity: 150,
        },
        {
            title: 'Cross-Industry Breakfast',
            description: 'Morning networking across sectors.',
            type: 'physical',
            ticketPrice: 20,
            capacity: 50,
        },
        {
            title: 'Developer Community Meetup',
            description: 'Monthly gathering for software engineers.',
            type: 'physical',
            ticketPrice: 0,
            capacity: 70,
        },
        {
            title: 'Expat & Local Connect',
            description: 'Building bridges between communities.',
            type: 'physical',
            ticketPrice: 0,
            capacity: 80,
        },
        {
            title: 'LinkedIn Power Users',
            description: 'Optimizing your professional presence.',
            type: 'virtual',
            ticketPrice: 29,
            capacity: 200,
        },
        {
            title: 'Impact Makers Dinner',
            description: 'Social entrepreneurs and change-makers.',
            type: 'physical',
            ticketPrice: 55,
            capacity: 40,
        },
    ],
    Science: [
        {
            title: 'Climate Change Conference',
            description: 'Researchers present latest climate findings.',
            type: 'virtual',
            ticketPrice: 99,
            capacity: 300,
        },
        {
            title: 'Space Exploration Talk',
            description: 'Mars missions and next-gen telescopes.',
            type: 'virtual',
            ticketPrice: 29.99,
            capacity: 500,
        },
        {
            title: 'Biotech Innovation Summit',
            description: 'Gene editing, CRISPR, and breakthroughs.',
            type: 'virtual',
            ticketPrice: 149,
            capacity: 200,
        },
        {
            title: 'Science Fair & Expo',
            description: 'Students and researchers showcase projects.',
            type: 'physical',
            ticketPrice: 0,
            capacity: 400,
        },
        {
            title: 'Neuroscience Symposium',
            description: 'Brain plasticity and cognitive science.',
            type: 'virtual',
            ticketPrice: 199,
            capacity: 150,
        },
        {
            title: 'Environmental Research Day',
            description: 'Local ecology and conservation efforts.',
            type: 'physical',
            ticketPrice: 15,
            capacity: 100,
        },
        {
            title: 'Physics for Everyone',
            description: 'Quantum concepts made accessible.',
            type: 'virtual',
            ticketPrice: 0,
            capacity: 1000,
        },
        {
            title: 'Agricultural Science Forum',
            description: 'Soil health, irrigation, and crop yields.',
            type: 'physical',
            ticketPrice: 45,
            capacity: 120,
        },
        {
            title: 'Medical Research Roundtable',
            description: 'Clinical trials and translational medicine.',
            type: 'virtual',
            ticketPrice: 79,
            capacity: 100,
        },
        {
            title: 'Ocean & Marine Science Day',
            description: 'Deep-sea ecosystems and coral conservation.',
            type: 'virtual',
            ticketPrice: 25,
            capacity: 300,
        },
    ],
    Lifestyle: [
        {
            title: 'Urban Gardening Fest',
            description: 'Gardening workshops and home brew demos.',
            type: 'physical',
            ticketPrice: 35,
            capacity: 80,
        },
        {
            title: 'Book Club Gathering',
            description: "Discussing this month's literary pick.",
            type: 'physical',
            ticketPrice: 0,
            capacity: 30,
        },
        {
            title: 'Cooking Masterclass',
            description: 'Traditional Ethiopian and fusion cuisine.',
            type: 'physical',
            ticketPrice: 65,
            capacity: 20,
        },
        {
            title: 'Board Game Night',
            description: 'Strategy and social games for all ages.',
            type: 'physical',
            ticketPrice: 8,
            capacity: 50,
        },
        {
            title: 'Home Interior Workshop',
            description: 'DIY décor and sustainable home styling.',
            type: 'physical',
            ticketPrice: 45,
            capacity: 30,
        },
        {
            title: 'Travel Hacking Seminar',
            description: 'Points, miles, and budget travel tips.',
            type: 'virtual',
            ticketPrice: 29,
            capacity: 200,
        },
        {
            title: 'Pet Owners Meetup',
            description: 'Community gathering for pet enthusiasts.',
            type: 'physical',
            ticketPrice: 0,
            capacity: 60,
        },
        {
            title: 'Film & Series Watch Club',
            description: 'Screening and discussion of curated films.',
            type: 'physical',
            ticketPrice: 10,
            capacity: 40,
        },
        {
            title: 'Coffee Culture Tour',
            description: 'Ethiopian coffee ceremony and tasting.',
            type: 'physical',
            ticketPrice: 25,
            capacity: 25,
        },
        {
            title: 'Vintage & Thrift Market',
            description: 'Curated secondhand and vintage finds.',
            type: 'physical',
            ticketPrice: 0,
            capacity: 200,
        },
    ],
};

// ─── Build events ──────────────────────────────────────────────────────────────

function buildSeedEventsData() {
    const totalEvents = Object.values(CATEGORY_COUNTS).reduce((a, b) => a + b, 0);
    const dates = generateSpacedDates(totalEvents);

    const allEvents: Array<{
        title: string;
        description?: string;
        type?: 'virtual' | 'physical';
        ticketPrice?: number;
        capacity?: number;
        status: 'active' | 'draft';
        date: Date;
        user: string;
        categoryName?: string;
    }> = [];

    for (const [categoryName, count] of Object.entries(CATEGORY_COUNTS)) {
        const templates = templatesByCategory[categoryName] as EventTemplate[];

        for (let i = 0; i < count; i++) {
            const template = templates[i % templates.length];
            const suffix = Math.floor(i / templates.length) + 1;
            const needsSuffix = count > templates.length;

            allEvents.push({
                ...template,
                title: needsSuffix ? `${template?.title} ${suffix}` : (template?.title as string),
                status: i % 6 === 0 ? 'draft' : 'active',
                date: dates[allEvents.length] as Date,
                user: defaultUserId,
                categoryName,
            });
        }
    }

    // Sort by date ascending so the DB has chronological order
    allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
    return allEvents;
}

// ─── Build tickets ─────────────────────────────────────────────────────────────

function buildPaymentId(index: number) {
    return `PAY-${Date.now()}-${String(index + 1).padStart(4, '0')}`;
}

function buildTickets(events: EventDocument[]) {
    const tickets = [];

    for (let i = 0; i < events.length; i++) {
        const purchaser = defaultPurchasers[i % defaultPurchasers.length];
        const event = events[i];

        let status = 'PAID';
        if (i % 13 === 0) status = 'REFUNDED';
        else if (i % 9 === 0) status = 'PENDING';

        tickets.push({
            event: event?._id,
            purchaserName: purchaser?.name,
            purchaserEmail: purchaser?.email,
            paymentId: buildPaymentId(i),
            amountPaid: event?.ticketPrice,
            currency: 'Br',
            status,
        });
    }

    return tickets;
}

// ─── Seed ──────────────────────────────────────────────────────────────────────

async function seed() {
    try {
        await mongoose.connect(DATABASE_URL as string);
        console.log('Connected to DB');

        /* 1️⃣ Clear collections */
        await Ticket.deleteMany({});
        await Resource.deleteMany({});
        await Event.deleteMany({});
        await EventCategory.deleteMany({});
        console.log('Cleared events, categories & tickets');

        /* 2️⃣ Insert resources */
        const resources = await Resource.insertMany(defaultResources);
        console.log(`Inserted ${resources.length} resources`);

        /* 3️⃣ Insert categories */
        const categories = await EventCategory.insertMany(seedEventsCategoryData);
        console.log(`Inserted ${categories.length} categories`);

        const categoryMap: Record<string, string> = {};
        categories.forEach((cat) => (categoryMap[cat.name] = String(cat._id)));

        /* 4️⃣ Build & insert events */
        const seedEventsData = buildSeedEventsData();

        const events = seedEventsData.map((event) => {
            const isVirtual = event.type === 'virtual';
            return {
                title: event.title,
                description: event.description,
                date: event.date,
                ticketPrice: event.ticketPrice,
                capacity: event.capacity,
                status: event.status,
                user: event.user,
                type: event.type,
                category: categoryMap[event.categoryName as string],
                startTime: '10:00',
                endTime: '16:00',
                location: isVirtual ? 'Online' : 'Addis Ababa',
                address: isVirtual ? 'N/A' : 'Main Conference Center',
                virtualUrl: isVirtual ? 'https://events.example.com/live' : undefined,
            };
        });

        const insertedEvents = (await Event.insertMany(events)) as unknown as EventDocument[];
        console.log(`Inserted ${insertedEvents.length} events`);

        /* 5️⃣ Log distribution */
        console.log('\nCategory distribution:');
        for (const [cat, count] of Object.entries(CATEGORY_COUNTS)) {
            const bar = '█'.repeat(Math.round(count / 2));
            console.log(`  ${cat.padEnd(12)} ${String(count).padStart(3)}  ${bar}`);
        }

        /* 6️⃣ Build & insert tickets */
        const tickets = buildTickets(insertedEvents);
        const insertedTickets = (await Ticket.insertMany(tickets)) as unknown as TicketDocument[];
        console.log(`\nInserted ${insertedTickets.length} tickets`);

        console.log('\n✅ Seeding complete');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding error:', err);
        process.exit(1);
    }
}

seed();
