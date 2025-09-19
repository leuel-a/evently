import {Star} from 'lucide-react';
import {testimonials} from './data';

export function Testimonials() {
    return (
        <section className="py-24 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                        Loved by Event Organizers
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Don't just take our word for it. See what successful event organizers are
                        saying about Evently.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-card rounded p-8 shadow-soft border border-border hover:shadow-medium transition-all duration-300"
                        >
                            <div className="flex space-x-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>
                            <blockquote className="text-foreground mb-8 text-lg leading-relaxed">
                                "{testimonial.content}"
                            </blockquote>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="font-semibold text-foreground">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-muted-foreground text-sm">
                                        {testimonial.role} at {testimonial.company}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-20">
                    <div className="bg-gradient-to-r from-indigo-950 to-indigo-200 rounded p-12 text-white">
                        <h3 className="text-3xl font-bold mb-4">Ready to Join Them?</h3>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Start creating memorable events today with our 14-day free trial. No
                            credit card required.
                        </p>
                        <button className="bg-white text-primary px-8 py-4 rounded cursor-pointer font-semibold text-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                            Start Your Free Trial
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
