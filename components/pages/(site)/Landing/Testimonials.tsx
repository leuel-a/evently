'use client';

import {useInView} from 'react-intersection-observer';
import {motion, type Variants} from 'framer-motion';
import {Star} from 'lucide-react';
import {testimonials} from './data';

const containerVariants: Variants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            duration: 0.6,
        },
    },
};

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        filter: 'blur(8px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    },
    hover: {
        y: -6,
        scale: 1.02,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 25,
        },
    },
};

const starVariants: Variants = {
    hidden: {scale: 0, rotate: -180},
    visible: (i: number) => ({
        scale: 1,
        rotate: 0,
        transition: {
            delay: i * 0.1,
            type: 'spring',
            stiffness: 300,
            damping: 15,
        },
    }),
};

export function Testimonials() {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <section className="relative py-24 bg-zinc-900 overflow-hidden">
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl"
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1.1, 1, 1.1],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 2,
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{opacity: 0, y: 40}}
                    animate={inView ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.8}}
                    className="text-center mb-20"
                >
                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-300 via-violet-400 to-indigo-500 bg-clip-text text-transparent tracking-tight"
                        initial={{opacity: 0, y: 30}}
                        animate={inView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.8, delay: 0.2}}
                    >
                        Loved by Event Organizers
                    </motion.h2>
                    <motion.p
                        className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed"
                        initial={{opacity: 0, y: 20}}
                        animate={inView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.8, delay: 0.4}}
                    >
                        Don't just take our word for it. See what successful event organizers are
                        saying about Evently.
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover="hover"
                            className="group relative flex h-full"
                        >
                            <motion.div className="relative bg-zinc-800/60 backdrop-blur-xl rounded-2xl p-8 border border-zinc-700/50 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 overflow-hidden flex flex-col h-full w-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-violet-500/0 group-hover:from-indigo-500/8 group-hover:via-indigo-500/4 group-hover:to-violet-500/8 transition-all duration-500 rounded-2xl" />

                                <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-indigo-500/0 to-violet-500/0 group-hover:from-indigo-500/25 group-hover:to-violet-500/25 transition-all duration-500" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex space-x-1 mb-6">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                custom={i}
                                                variants={starVariants}
                                                initial="hidden"
                                                animate={inView ? 'visible' : 'hidden'}
                                            >
                                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                                            </motion.div>
                                        ))}
                                    </div>

                                    <blockquote className="text-zinc-100 mb-8 text-lg leading-relaxed flex-grow italic">
                                        "{testimonial.content}"
                                    </blockquote>

                                    <div className="flex items-center mt-auto">
                                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg shadow-indigo-500/25">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-zinc-400 text-sm">
                                                {testimonial.role} at {testimonial.company}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{opacity: 0, y: 40}}
                    animate={inView ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.8, delay: 0.8}}
                    className="text-center mt-20"
                >
                    <motion.div
                        whileHover={{scale: 1.02}}
                        className="relative bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-indigo-500/10 rounded-2xl p-12 border border-indigo-500/30 backdrop-blur-xl shadow-2xl shadow-indigo-500/20 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-violet-500/5 to-indigo-500/5" />

                        <motion.h3
                            className="text-3xl font-bold text-white mb-4 relative z-10"
                            initial={{opacity: 0}}
                            animate={inView ? {opacity: 1} : {}}
                            transition={{duration: 0.6, delay: 1}}
                        >
                            Ready to Join Them?
                        </motion.h3>

                        <motion.p
                            className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto relative z-10"
                            initial={{opacity: 0}}
                            animate={inView ? {opacity: 1} : {}}
                            transition={{duration: 0.6, delay: 1.1}}
                        >
                            Start creating memorable events today with our 14-day free trial. No
                            credit card required.
                        </motion.p>

                        <motion.button
                            className="relative bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 group overflow-hidden"
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />

                            <span className="relative z-10">Start Your Free Trial</span>

                            <div className="absolute inset-0 rounded-xl bg-indigo-500/20 blur-xl group-hover:bg-indigo-400/30 transition-all duration-300 -z-10" />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
