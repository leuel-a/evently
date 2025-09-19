import {Calendar, Twitter, Github, Linkedin} from 'lucide-react';
import NextLink from 'next/link';

export function Footer() {
    return (
        <footer className="bg-foreground text-background py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-light to-primary rounded-xl flex items-center justify-center mr-3">
                                <Calendar className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold">Evently</span>
                        </div>
                        <p className="text-background/80 text-lg leading-relaxed mb-6 max-w-md">
                            The all-in-one platform for creating, managing, and scaling
                            unforgettable events. Trusted by organizers worldwide.
                        </p>
                        <div className="flex space-x-4">
                            <NextLink
                                href="#"
                                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300"
                            >
                                <Twitter className="h-5 w-5" />
                            </NextLink>
                            <NextLink
                                href="#"
                                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300"
                            >
                                <Github className="h-5 w-5" /> {/* @ts-ignore */}
                            </NextLink>
                            <NextLink
                                href="#"
                                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300"
                            >
                                <Linkedin className="h-5 w-5" />
                            </NextLink>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Product</h3>
                        <ul className="space-y-3 text-background/80">
                            <li>
                                <NextLink
                                    href="#"
                                    className="hover:text-primary-light transition-colors duration-300"
                                >
                                    Features
                                </NextLink>
                            </li>
                            <li>
                                <NextLink
                                    href="#"
                                    className="hover:text-primary-light transition-colors duration-300"
                                >
                                    Pricing
                                </NextLink>
                            </li>
                            <li>
                                <NextLink
                                    href="#"
                                    className="hover:text-primary-light transition-colors duration-300"
                                >
                                    Templates
                                </NextLink>
                            </li>
                            <li>
                                <NextLink
                                    href="#"
                                    className="hover:text-primary-light transition-colors duration-300"
                                >
                                    Integrations
                                </NextLink>
                            </li>
                            <li>
                                <NextLink
                                    href="#"
                                    className="hover:text-primary-light transition-colors duration-300"
                                >
                                    API
                                </NextLink>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-3 text-background/80">
                            <li>
                                <NextLink
                                    href="#"
                                    className="hover:text-primary-light transition-colors duration-300"
                                >
                                    About
                                </NextLink>
                            </li>
                            <li>
                                <NextLink
                                    href="#"
                                    className="hover:text-primary-light transition-colors duration-300"
                                >
                                    Blog
                                </NextLink>
                            </li>
                            <li>
                                <NextLink
                                    href="#"
                                    className="hover:text-primary-light transition-colors duration-300"
                                >
                                    Careers
                                </NextLink>
                            </li>
                            <li>
                                <NextLink
                                    href="#"
                                    className="hover:text-primary-light transition-colors duration-300"
                                >
                                    Contact
                                </NextLink>
                            </li>
                            <li>
                                <NextLink
                                    href="#"
                                    className="hover:text-primary-light transition-colors duration-300"
                                >
                                    Support
                                </NextLink>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-background/60 text-sm mb-4 md:mb-0">
                        © 2024 Evently. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm text-background/60">
                        <a
                            href="#"
                            className="hover:text-primary-light transition-colors duration-300"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="hover:text-primary-light transition-colors duration-300"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="hover:text-primary-light transition-colors duration-300"
                        >
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
