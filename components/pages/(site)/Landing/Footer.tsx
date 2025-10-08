'use client';

import {SiFacebook, SiX, SiInstagram, SiLinkerd} from '@icons-pack/react-simple-icons';
import {motion} from 'framer-motion';
import NextLink from 'next/link';

const footerLinks = [
    {name: 'Home', href: '/'},
    {name: 'Events', href: '/events'},
    {name: 'About', href: '/about'},
    {name: 'Contact', href: '/contact'},
    {name: 'Privacy', href: '/privacy'},
    {name: 'Terms', href: '/terms'},
];

const socialLinks = [
    {icon: SiFacebook, href: '#', label: 'Facebook'},
    {icon: SiX, href: '#', label: 'Twitter'},
    {icon: SiInstagram, href: '#', label: 'Instagram'},
    {icon: SiLinkerd, href: '#', label: 'LinkedIn'},
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
                <div className="absolute top-0 right-1/4 w-48 h-48 bg-violet-400/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        viewport={{once: true}}
                        className="md:col-span-2"
                    >
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-violet-400 bg-clip-text text-transparent mb-4">
                            Evently
                        </h3>
                        <p className="text-gray-600 dark:text-zinc-400 leading-relaxed max-w-md mb-6">
                            Create unforgettable events with our all-in-one platform. From intimate
                            gatherings to large conferences, we provide everything you need to
                            succeed.
                        </p>

                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 bg-gray-100 dark:bg-zinc-800/60 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-zinc-700/50 flex items-center justify-center text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all duration-300 group"
                                    whileHover={{scale: 1.1, y: -2}}
                                    whileTap={{scale: 0.95}}
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{duration: 0.4, delay: index * 0.1}}
                                    viewport={{once: true}}
                                >
                                    <social.icon className="h-4 w-4" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                        viewport={{once: true}}
                    >
                        <h4 className="text-gray-900 dark:text-white font-semibold mb-4 text-lg">
                            Navigation
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.slice(0, 4).map((link) => (
                                <li key={link.name}>
                                    <NextLink
                                        href={link.href}
                                        className="text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 hover:translate-x-1 transform block"
                                    >
                                        {link.name}
                                    </NextLink>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.3}}
                        viewport={{once: true}}
                    >
                        <h4 className="text-gray-900 dark:text-white font-semibold mb-4 text-lg">
                            Legal
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.slice(4).map((link) => (
                                <li key={link.name}>
                                    <NextLink
                                        href={link.href}
                                        className="text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 hover:translate-x-1 transform block"
                                    >
                                        {link.name}
                                    </NextLink>
                                </li>
                            ))}
                            <li>
                                <NextLink
                                    href="/support"
                                    className="text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 hover:translate-x-1 transform block"
                                >
                                    Support
                                </NextLink>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.6, delay: 0.4}}
                    viewport={{once: true}}
                    className="pt-8 border-t border-gray-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center"
                >
                    <p className="text-gray-500 dark:text-zinc-400 text-sm mb-4 md:mb-0">
                        &copy; {currentYear} Evently. All rights reserved.
                    </p>

                    <div className="flex items-center space-x-6 text-sm">
                        <span className="text-gray-500 dark:text-zinc-400">
                            Made with ❤️ for event organizers
                        </span>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-emerald-400">All systems operational</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, scale: 0}}
                    whileInView={{opacity: 1, scale: 1}}
                    transition={{duration: 0.8, delay: 0.5}}
                    viewport={{once: true}}
                    className="absolute bottom-4 right-4 w-6 h-6 border-2 border-indigo-500/30 rounded-full"
                />
                <motion.div
                    initial={{opacity: 0, scale: 0}}
                    whileInView={{opacity: 1, scale: 1}}
                    transition={{duration: 0.8, delay: 0.6}}
                    viewport={{once: true}}
                    className="absolute top-4 left-4 w-3 h-3 border border-violet-400/30 rounded-full"
                />
            </div>
        </footer>
    );
}
