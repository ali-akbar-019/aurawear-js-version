import { Leaf, Globe, Heart } from 'lucide-react';

const missions = [
    {
        id: 1,
        icon: Leaf,
        title: 'Sustainable Materials',
        description:
            'We prioritize organic, recycled, and responsibly sourced fabrics to reduce our environmental impact.',
        color: 'from-green-400 to-green-200',
    },
    {
        id: 2,
        icon: Globe,
        title: 'Global Responsibility',
        description:
            'Working with ethical suppliers and fair labor practices ensures our products benefit communities worldwide.',
        color: 'from-blue-400 to-blue-200',
    },
    {
        id: 3,
        icon: Heart,
        title: 'Customer Care',
        description:
            'We focus on long-lasting, quality products that our customers can cherish and enjoy sustainably.',
        color: 'from-pink-400 to-pink-200',
    },
];

export default function SustainabilitySection() {
    return (
        <section className="w-full py-24 md:py-40 px-4 sm:px-6 lg:px-8 bg-muted/5">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4" data-aos="fade-up" >
                    <h2 className="text-4xl md:text-5xl font-semibold text-foreground">
                        Our Mission & Values
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        At AuraWear, we combine style with sustainability, crafting clothing that's good for you and the planet.
                    </p>
                </div>

                {/* Mission Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {missions.map((mission, idx) => (
                        <div
                            data-aos="fade-up" data-aos-delay={idx * 200}
                            key={mission.id}
                            className="group relative rounded-2xl p-8 bg-white border border-border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                            style={{ transitionDelay: `${idx * 150}ms` }}
                        >
                            {/* Icon */}
                            <div
                                className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center bg-gradient-to-br ${mission.color} text-white text-2xl group-hover:scale-105 transition-transform duration-300`}
                            >
                                <mission.icon className="w-8 h-8" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-semibold text-foreground mb-2">{mission.title}</h3>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground">{mission.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}