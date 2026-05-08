import { Leaf, Star, Shield, Zap } from 'lucide-react';

const values = [
    {
        icon: Leaf,
        title: 'Sustainable Fashion',
        description: 'We prioritize eco-friendly materials and responsible production to protect the planet.',
        color: 'from-secondary/30 to-accent/20',
    },
    {
        icon: Star,
        title: 'Quality Excellence',
        description: 'Each product is crafted with precision, ensuring long-lasting style and comfort.',
        color: 'from-accent/30 to-secondary/20',
    },
    {
        icon: Shield,
        title: 'Secure Shopping',
        description: 'Your personal and payment information is always safe and protected.',
        color: 'from-secondary/20 to-accent/30',
    },
    {
        icon: Zap,
        title: 'Innovative AI Styling',
        description: 'Our AI-driven recommendations make finding your perfect outfit effortless.',
        color: 'from-accent/20 to-secondary/30',
    },
];

export default function CoreValues() {
    return (
        <section className="w-full py-24 md:py-40 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4" data-aos="fade-up" >
                    <h2 className="text-4xl md:text-5xl font-semibold text-foreground">
                        Why AuraWear?
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Our philosophy drives every decision we make—from sustainable materials to innovative AI styling. Here's why our customers trust and love us.
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, idx) => {
                        const Icon = value.icon;
                        return (
                            <div
                                data-aos="fade-up" data-aos-delay={idx * 200}
                                key={idx}
                                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col items-center text-center"
                            >
                                <div
                                    className={`p-4 mb-4 rounded-xl bg-primary/80 ${value.color} text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                                >
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {value.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}