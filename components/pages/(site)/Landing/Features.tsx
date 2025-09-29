import {features} from './data';

export function Features() {
    return (
        <section className="py-24 gradient-feature">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                        Everything You Need to Succeed
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Powerful features designed to streamline your event management process and
                        create exceptional experiences for your attendees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-card group"
                        >
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-950 to-indigo-600 rounded flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <div className="inline-flex items-center justify-center p-8 bg-gradient-to-r from-primary/5 to-primary-light/5 rounded border border-primary/10">
                        <div className="text-center">
                            <p className="text-lg font-semibold text-foreground mb-2">
                                Ready to transform your events?
                            </p>
                            <p className="text-muted-foreground">
                                Join thousands of successful event organizers today.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
