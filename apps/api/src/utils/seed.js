import '../env.js';

import mongoose from 'mongoose';
import Event from '../models/events/index.js';
import EventCategory from '../models/eventsCategory/index.js';

const DATABASE_URL = process.env.DATABASE_URL;

const getFutureDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setUTCHours(10, 0, 0, 0);
    return date;
};

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
        type: 'physical',
        categoryName: 'Networking & Community',
    },
];

async function seed() {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log('Connected to DB');

        /* 1️⃣ Clear collections */
        await Event.deleteMany({});
        await EventCategory.deleteMany({});
        console.log('Cleared events & categories');

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
                type: event.type,
                category: categoryMap[event.categoryName],

                startTime: '10:00',
                endTime: '16:00',

                location: isVirtual ? 'Online' : 'Addis Ababa',
                address: isVirtual ? 'N/A' : 'Main Conference Center',
                virtualUrl: isVirtual ? 'https://events.example.com/live' : undefined,
            };
        });

        await Event.insertMany(events);
        console.log(`Inserted ${events.length} events`);

        console.log('✅ Seeding complete');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding error:', err);
        process.exit(1);
    }
}

seed();
