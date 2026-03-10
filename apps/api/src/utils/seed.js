import '../env.js';

import mongoose from 'mongoose';
import Ticket from '../models/tickets/index.js';
import Event from '../models/events/index.js';
import Resource from '../models/resources/index.js';
import EventCategory from '../models/eventsCategory/index.js';

const DATABASE_URL = process.env.DATABASE_URL;

const getFutureDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setUTCHours(10, 0, 0, 0);
    return date;
};

const defaultUserId = '69aac1e3e136422e6bb2a70e';
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

const defaultCategories = [
    {name: 'Technology & Innovation', description: 'AI, software, and emerging technologies.'},
    {name: 'Business & Entrepreneurship', description: 'Founders, strategy, and startups.'},
    {name: 'Education & Learning', description: 'Workshops, bootcamps, and training.'},
    {name: 'Health & Wellness', description: 'Health and wellbeing events.'},
    {name: 'Arts & Culture', description: 'Cultural and creative events.'},
    {name: 'Music & Entertainment', description: 'Concerts and live shows.'},
    {name: 'Sports & Fitness', description: 'Sports and physical activities.'},
    {name: 'Networking & Community', description: 'Social and professional meetups.'},
    {name: 'Science & Research', description: 'Scientific talks and conferences.'},
    {name: 'Lifestyle & Hobbies', description: 'Personal interests and hobbies.'},
];

const seedEventsData = [
    {
        title: 'AI & ML Future Symposium',
        description: 'Latest advancements in neural networks.',
        date: getFutureDate(30),
        ticketPrice: 299,
        capacity: 150,
        status: 'active',
        user: defaultUserId,
        type: 'virtual',
        categoryName: 'Technology & Innovation',
    },
    {
        title: 'Frontend Developer Workshop',
        description: 'React hooks and performance optimization.',
        date: getFutureDate(45),
        ticketPrice: 49.99,
        capacity: 50,
        status: 'draft',
        user: defaultUserId,
        type: 'physical',
        categoryName: 'Education & Learning',
    },
    {
        title: 'Open Source Contributor Weekend',
        description: 'Free open-source contribution event.',
        date: getFutureDate(510),
        ticketPrice: 0,
        capacity: 50,
        status: 'active',
        user: defaultUserId,
        type: 'physical',
        categoryName: 'Networking & Community',
    },
];

function buildPaymentId(index) {
    return `PAY-${Date.now()}-${String(index + 1).padStart(3, '0')}`;
}

function buildTickets(events) {
    const tickets = [];

    for (let index = 0; index < 20; index++) {
        const purchaser = defaultPurchasers[index];
        const event = events[index % events.length];

        let status = 'PAID';

        // sprinkle in a few different statuses
        if (index === 4 || index === 11 || index === 17) {
            status = 'REFUNDED';
        } else if (index === 8 || index === 15) {
            status = 'PENDING';
        }

        tickets.push({
            event: event._id,
            purchaserName: purchaser.name,
            purchaserEmail: purchaser.email,
            paymentId: buildPaymentId(index),
            amountPaid: event.ticketPrice,
            currency: "Br",
            status,
        });
    }

    return tickets;
}

async function seed() {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log('Connected to DB');

        /* 1️⃣ Clear collections */
        await Ticket.deleteMany({});
        await Resource.deleteMany({});
        await Event.deleteMany({});
        await EventCategory.deleteMany({});
        console.log('Cleared events & categories');

        /** Insert resources */
        const resources = await Resource.insertMany(defaultResources);
        console.log(`Inserted ${resources.length} resources`);

        /* 2️⃣ Insert categories */
        const categories = await EventCategory.insertMany(defaultCategories);
        console.log(`Inserted ${categories.length} categories`);

        const categoryMap = {};
        categories.forEach((category) => (categoryMap[category.name] = category._id));

        /* 3️⃣ Build events */
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
                category: categoryMap[event.categoryName],

                startTime: '10:00',
                endTime: '16:00',

                location: isVirtual ? 'Online' : 'Addis Ababa',
                address: isVirtual ? 'N/A' : 'Main Conference Center',
                virtualUrl: isVirtual ? 'https://events.example.com/live' : undefined,
            };
        });

        const insertedEvents = await Event.insertMany(events);
        console.log(`Inserted ${events.length} events`);

        const tickets = buildTickets(insertedEvents);
        const insertedTickets = await Ticket.insertMany(tickets);
        console.log(`Inserted ${insertedTickets.length} tickets`);

        const groupedCounts = insertedTickets.reduce((accumulator, ticket) => {
            const key = ticket.event.toString();

            accumulator[key] = (accumulator[key] || 0) + 1;
            return accumulator;
        }, {});

        console.log('Tickets per event:', groupedCounts);
        console.log('✅ Seeding complete');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding error:', err);
        process.exit(1);
    }
}

seed();
