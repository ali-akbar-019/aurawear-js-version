import { Heart, Leaf, Award } from 'lucide-react';

const milestones = [
    {
        year: '2018',
        title: 'Founded AuraWear',
        description: 'Started with a vision to bring AI-powered style recommendations to modern wardrobes.',
        icon: Award,
    },
    {
        year: '2019',
        title: 'Sustainable Materials',
        description: 'Introduced eco-friendly fabrics and sustainable production practices.',
        icon: Leaf,
    },
    {
        year: '2021',
        title: '10K+ Happy Customers',
        description: 'Reached over 10,000 satisfied customers worldwide.',
        icon: Heart,
    },
];

export default function AboutStory() {
    return (
        <section className="w-full py-24 md:py-40 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-semibold text-foreground" data-aos="fade-up" data-aos-delay={100}>
                        Our Journey & Vision
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed" data-aos="fade-up" data-aos-delay={200}>
                        AuraWear was created to revolutionize how you experience fashion. Combining AI, sustainability, and modern design, our mission is to make style effortless, meaningful, and empowering.
                    </p>
                </div>

                {/* Timeline / Milestones */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {milestones.map((milestone, idx) => {
                        const Icon = milestone.icon;
                        return (
                            <div
                                data-aos="fade-up" data-aos-delay={idx * 200}
                                key={idx}
                                className="flex flex-col items-center text-center space-y-4 group"
                            >
                                <div className="p-5 rounded-2xl shadow-md bg-background border border-border flex flex-col items-center transition-shadow duration-300 group-hover:shadow-lg">
                                    <Icon className="w-8 h-8 text-yellow-500 mb-2" />
                                    <p className="font-semibold text-2xl text-foreground">{milestone.year}</p>
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">{milestone.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {milestone.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}