import { CheckCircle } from 'lucide-react';

const milestones = [
    {
        id: 1,
        year: '2019',
        title: 'Founded AuraWear',
        description: 'Our journey began with a vision to combine AI and fashion for personalized style experiences.',
    },
    {
        id: 2,
        year: '2020',
        title: 'First Collection Launch',
        description: 'Released our debut collection, gaining recognition for premium quality and sustainable designs.',
    },
    {
        id: 3,
        year: '2021',
        title: 'AI Styling Feature',
        description: 'Introduced AI-powered style recommendations, revolutionizing personalized shopping.',
    },
    {
        id: 4,
        year: '2023',
        title: 'Global Expansion',
        description: 'Expanded to over 50 countries, connecting fashion enthusiasts worldwide.',
    },
];

export default function JourneyTimeline() {
    return (
        <section className="w-full py-24 md:py-40 px-4 sm:px-6 lg:px-8 bg-muted/5">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4" data-aos="fade-up" >
                    <h2 className="text-4xl md:text-5xl font-semibold text-foreground">
                        Our Journey
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        From our founding to global expansion, here's how AuraWear has evolved over the years.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line for desktop */}
                    <div className="hidden lg:block absolute left-1/2 top-0 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-yellow-500 to-yellow-300/30"></div>

                    <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
                        {milestones.map((milestone, idx) => (
                            <div
                                data-aos="fade-up" data-aos-delay={idx * 200}
                                key={milestone.id}
                                className="relative flex flex-col items-center lg:items-start text-center lg:text-left"
                            >
                                {/* Icon Dot */}
                                <div className="z-10 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </div>

                                {/* Milestone Info */}
                                <h3 className="text-xl font-semibold text-foreground mb-1">{milestone.year}</h3>
                                <h4 className="text-lg font-semibold text-foreground/90 mb-2">{milestone.title}</h4>
                                <p className="text-sm text-muted-foreground max-w-xs">{milestone.description}</p>

                                {/* Connector line for desktop */}
                                {idx !== milestones.length - 1 && (
                                    <div className="hidden lg:block absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-secondary/50 to-accent/20"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}