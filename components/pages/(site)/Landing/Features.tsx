'use client';

import {useInView} from 'react-intersection-observer';
import {motion, type Variants} from 'framer-motion';
import {features} from './data';

const containerVariants: Variants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            duration: 0.6,
        },
    },
};

const itemVariants: Variants = {
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
};

const iconVariants: Variants = {
    hidden: {scale: 0, rotate: -180},
    visible: {
        scale: 1,
        rotate: 0,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 15,
            duration: 0.8,
        },
    },
    hover: {
        scale: 1.1,
        rotate: 5,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10,
        },
    },
};

const cardHoverVariants: Variants = {
    hover: {
        y: -8,
        scale: 1.02,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 25,
        },
    },
};

export function Features() {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <section className="relative py-24 bg-zinc-900 overflow-hidden">
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl"
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1.1, 1, 1.1],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
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
                        Everything You Need to Succeed
                    </motion.h2>
                    <motion.p
                        className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed"
                        initial={{opacity: 0, y: 20}}
                        animate={inView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.8, delay: 0.4}}
                    >
                        Powerful features designed to streamline your event management process and
                        create exceptional experiences for your attendees.
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover="hover"
                            className="group relative flex" // Flex container for equal height
                        >
                            <motion.div
                                variants={cardHoverVariants}
                                className="relative bg-zinc-800/60 backdrop-blur-xl rounded-2xl p-8 border border-zinc-700/50 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 overflow-hidden flex flex-col h-full" // Flex column and full height
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-violet-500/0 group-hover:from-indigo-500/10 group-hover:via-indigo-500/5 group-hover:to-violet-500/10 transition-all duration-500 rounded-2xl" />

                                <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-indigo-500/0 to-violet-500/0 group-hover:from-indigo-500/30 group-hover:to-violet-500/30 transition-all duration-500" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <motion.div
                                        variants={iconVariants}
                                        initial="hidden"
                                        animate={inView ? 'visible' : 'hidden'}
                                        whileHover="hover"
                                        className="relative mb-6"
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all duration-300">
                                            <feature.icon className="h-7 w-7 text-white" />
                                        </div>

                                        <div className="absolute inset-0 w-16 h-16 bg-indigo-500/20 rounded-xl blur-xl group-hover:bg-indigo-400/30 transition-all duration-300 -z-10" />
                                    </motion.div>
                                    <div className="flex flex-col flex-grow">
                                        <motion.h3
                                            className="text-xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors duration-300"
                                            initial={{opacity: 0}}
                                            animate={inView ? {opacity: 1} : {}}
                                            transition={{duration: 0.6, delay: 0.3 + index * 0.1}}
                                        >
                                            {feature.title}
                                        </motion.h3>

                                        <motion.p
                                            className="text-zinc-400 leading-relaxed flex-grow" // Flex-grow for text alignment
                                            initial={{opacity: 0}}
                                            animate={inView ? {opacity: 1} : {}}
                                            transition={{duration: 0.6, delay: 0.4 + index * 0.1}}
                                        >
                                            {feature.description}
                                        </motion.p>

                                        <motion.div
                                            className="w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-400 mt-6 group-hover:w-12 transition-all duration-500"
                                            initial={false}
                                        />
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
                        className="inline-flex items-center justify-center p-8 bg-gradient-to-r from-indigo-500/10 to-violet-400/10 rounded-2xl border border-indigo-500/30 backdrop-blur-xl shadow-lg hover:shadow-indigo-500/25 transition-all duration-500"
                    >
                        <div className="text-center">
                            <motion.p
                                className="text-lg font-semibold text-white mb-2"
                                initial={{opacity: 0}}
                                animate={inView ? {opacity: 1} : {}}
                                transition={{duration: 0.6, delay: 1}}
                            >
                                Ready to transform your events?
                            </motion.p>
                            <motion.p
                                className="text-zinc-300"
                                initial={{opacity: 0}}
                                animate={inView ? {opacity: 1} : {}}
                                transition={{duration: 0.6, delay: 1.1}}
                            >
                                Join thousands of successful event organizers today.
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
