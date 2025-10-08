'use client';

import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import {motion, Variants} from 'framer-motion';
import {ArrowRight} from 'lucide-react';
import NextLink from 'next/link';
import {Button} from '@/components/ui/button';
import {APP_ROUTES} from '@/config/routes';

interface HeroProps {}

export function Hero(_: HeroProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(null);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [isInView, setIsInView] = useState(false);

    // Optimized mouse move with throttling
    const handleMouseMove = useCallback((e: MouseEvent) => {
        setMousePosition({x: e.clientX, y: e.clientY});
    }, []);

    // Intersection Observer to start animations only when in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {threshold: 0.1},
        );

        const currentCanvas = canvasRef.current;
        if (currentCanvas) {
            observer.observe(currentCanvas);
        }

        return () => {
            if (currentCanvas) {
                observer.unobserve(currentCanvas);
            }
        };
    }, []);

    // Optimized particle system with reduced computations
    useEffect(() => {
        if (!isInView) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size once
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            alpha: number;
            private canvas: HTMLCanvasElement;

            constructor(canvas: HTMLCanvasElement) {
                this.canvas = canvas;
                this.x = Math.random() * this.canvas.width;
                this.y = Math.random() * this.canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3; // Reduced velocity
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 1.5 + 0.5; // Smaller particles
                this.alpha = Math.random() * 0.3 + 0.1; // Lower opacity
            }

            update(mouseX: number, mouseY: number) {
                this.x += this.vx;
                this.y += this.vy;

                // Simple boundary check
                if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;

                // Reduced mouse influence calculations
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const distanceSq = dx * dx + dy * dy; // Skip sqrt for performance

                if (distanceSq < 10000) {
                    // 100px squared
                    this.vx += dx * 0.0001;
                    this.vy += dy * 0.0001;
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(165, 180, 252, ${this.alpha})`;
                ctx.fill();
            }
        }

        // Reduced particle count
        const particles = Array.from({length: 40}, () => new Particle(canvas));

        // Optimized connection drawing with distance threshold
        const drawConnections = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
            const connectionDistance = 120;
            const connectionDistanceSq = connectionDistance * connectionDistance;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distanceSq = dx * dx + dy * dy;

                    if (distanceSq < connectionDistanceSq) {
                        const opacity = 1 - Math.sqrt(distanceSq) / connectionDistance;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`;
                        ctx.lineWidth = 0.3;
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if (!ctx) return;

            // Reduced clear opacity for trail effect (better performance)
            ctx.fillStyle = 'rgba(24, 24, 27, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update(mousePosition.x, mousePosition.y);
                particle.draw(ctx);
            });

            drawConnections(ctx, particles);

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Throttled event listeners
        window.addEventListener('resize', handleResize, {passive: true});
        window.addEventListener('mousemove', handleMouseMove, {passive: true});

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mousePosition, isInView, handleMouseMove]);

    // Memoized text variants to prevent recreations
    const textVariants = useMemo<Variants>(
        () => ({
            hidden: {opacity: 0, filter: 'blur(8px)'},
            visible: (i: number) => ({
                opacity: 1,
                filter: 'blur(0px)',
                transition: {
                    delay: i * 0.02, // Faster animation
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                },
            }),
        }),
        [],
    );

    const floatingVariants = useMemo<Variants>(
        () => ({
            animate: {
                y: [0, -15, 0],
                transition: {
                    duration: 8, // Slower for better performance
                    repeat: Infinity,
                    ease: 'easeInOut',
                },
            },
        }),
        [],
    );

    // Memoized stats data
    const stats = useMemo(
        () => [
            {value: '10K+', label: 'Events Created'},
            {value: '50+', label: 'Countries'},
            {value: '99.9%', label: 'Uptime'},
        ],
        [],
    );

    // Simplified scroll indicator animation
    const scrollIndicatorVariants = useMemo<Variants>(
        () => ({
            animate: {
                y: [0, 8, 0],
                opacity: [0.6, 1, 0.6],
                transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                },
            },
        }),
        [],
    );

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-900">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/15 to-violet-400/15 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-violet-400/10 to-indigo-300/10 rounded-full blur-3xl" />

                <motion.div
                    variants={floatingVariants}
                    animate={isInView ? 'animate' : 'initial'}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="w-full">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl max-w-[24ch] font-medium tracking-tight text-white mb-6">
                        {'Create Unforgettable Events with Evently'.split('').map((char, index) => (
                            <motion.span
                                key={index}
                                custom={index}
                                variants={textVariants}
                                initial="hidden"
                                animate={isInView ? 'visible' : 'hidden'}
                                className="inline-block"
                                dangerouslySetInnerHTML={{__html: char === ' ' ? '&nbsp;' : char}}
                                whileHover={{
                                    scale: 1.05,
                                    background: 'linear-gradient(90deg, #A5B4FC, #6366F1)',
                                    backgroundClip: 'text',
                                    transition: {duration: 0.2},
                                }}
                            />
                        ))}
                    </h1>

                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        animate={isInView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.8, delay: 0.8}}
                        className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
                    >
                        The all-in-one platform for event organizers to{' '}
                        <span className="bg-gradient-to-r from-indigo-300 to-violet-400 bg-clip-text text-transparent font-semibold">
                            create, manage, and scale
                        </span>{' '}
                        their events.
                    </motion.p>

                    {/* Simplified button animations */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={isInView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.6, delay: 1.2}}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Button
                            asChild
                            className="relative bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold px-8 py-6 rounded-2xl text-lg shadow-2xl transition-all duration-500 group overflow-hidden min-w-[200px] h-16"
                        >
                            <NextLink href={APP_ROUTES.events.base}>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />

                                <div className="absolute inset-0 rounded-2xl bg-indigo-400/30 blur-xl group-hover:bg-indigo-300/40 transition-all duration-500 -z-10" />

                                <span className="relative z-10 flex items-center justify-center">
                                    Start Exploring Events
                                    <motion.div
                                        initial={{x: 0}}
                                        whileHover={{x: 4}}
                                        transition={{type: 'spring', stiffness: 400, damping: 10}}
                                    >
                                        <ArrowRight className="ml-3 h-5 w-5" />
                                    </motion.div>
                                </span>

                                {/* Ripple effect on hover */}
                                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                </div>
                            </NextLink>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            className="relative border-2 border-white/20 bg-white/5 backdrop-blur-lg text-white hover:bg-white/10 hover:border-white/40 px-8 py-6 rounded-2xl text-lg transition-all duration-500 group overflow-hidden min-w-[200px] h-16 hover:shadow-2xl hover:shadow-indigo-500/20 hover:text-white"
                        >
                            <NextLink href={APP_ROUTES.auth.signup}>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                                <span className="relative z-10 flex items-center justify-center">
                                    Join as Organizer
                                    <motion.div
                                        className="ml-3 w-2 h-2 bg-emerald-400 rounded-full"
                                        initial={{scale: 1}}
                                        whileHover={{
                                            scale: [1, 1.5, 1],
                                            boxShadow: '0 0 10px rgba(52, 211, 153, 0.5)',
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                    />
                                </span>

                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-indigo-500/30 to-emerald-400/30 blur-sm group-hover:opacity-100 opacity-0 transition-opacity duration-500 -z-10" />

                                <motion.div
                                    className="absolute inset-0 rounded-2xl border border-emerald-400/30"
                                    animate={{
                                        opacity: [0.3, 0.7, 0.3],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />
                            </NextLink>
                        </Button>
                    </motion.div>

                    {/* Stats section with reduced animations */}
                    <motion.div
                        initial={{opacity: 0}}
                        animate={isInView ? {opacity: 1} : {}}
                        transition={{duration: 0.6, delay: 1.6}}
                        className="mt-12"
                    >
                        <p className="text-base text-white/70 mb-6 font-medium">
                            Trusted by event organizers worldwide
                        </p>

                        <div className="flex justify-center gap-6 md:gap-12 flex-wrap">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{opacity: 0, scale: 0.8}}
                                    animate={isInView ? {opacity: 1, scale: 1} : {}}
                                    transition={{duration: 0.4, delay: 1.8 + index * 0.1}}
                                    className="text-center"
                                >
                                    <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-300 to-violet-400 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="text-white/60 text-xs mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{opacity: 0}}
                animate={isInView ? {opacity: 1} : {}}
                transition={{duration: 0.8, delay: 2.2}}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    variants={scrollIndicatorVariants}
                    animate={isInView ? 'animate' : 'initial'}
                    className="w-5 h-8 border border-white/20 rounded-full flex justify-center"
                >
                    <div className="w-0.5 h-2 bg-indigo-300 rounded-full mt-2" />
                </motion.div>
            </motion.div>
        </section>
    );
}
