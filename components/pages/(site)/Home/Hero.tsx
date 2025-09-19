import {ArrowRight, Play} from 'lucide-react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import {Button} from '@/components/ui/button';
import {APP_ROUTES} from '@/config/routes';

interface HeroProps {}

export function Hero(_: HeroProps) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
            <div className="absolute inset-0">
                <NextImage
                    src="/images/hero-image.jpg"
                    width={1000}
                    height={1000}
                    alt="Professional event management"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-light/80"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Create{' '}
                        <span className="gradient-text bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                            Unforgettable
                        </span>
                        <br />
                        Events with Evently
                    </h1>

                    <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto animate-fade-in-up-delay">
                        The all-in-one platform for event organizers to create, manage, and scale
                        their events. From intimate gatherings to large conferences.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
                        <Button
                            asChild
                            className="bg-indigo-500 h-14 text-lg"
                        >
                            <NextLink href={APP_ROUTES.events.base}>
                                Start Creating Events
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </NextLink>
                        </Button>

                        <Button className="h-14 group bg-white/20 text-lg backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary">
                            <Play className="mr-2 h-5 w-5" />
                            Watch Demo
                        </Button>
                    </div>

                    <div className="mt-8 text-white/80 animate-fade-in-up-delay-2">
                        <p className="text-lg mb-4 font-medium">
                            Trusted by 10,000+ event organizers worldwide
                        </p>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
        </section>
    );
}
