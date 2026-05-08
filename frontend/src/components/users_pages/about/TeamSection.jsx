import { Instagram, Twitter, Linkedin } from 'lucide-react';

const teamMembers = [
    {
        id: 1,
        name: 'Olivia Martinez',
        role: 'Founder & CEO',
        image: '/users/user_01.avif',
        socials: [
            { icon: Instagram, url: '#' },
            { icon: Twitter, url: '#' },
            { icon: Linkedin, url: '#' },
        ],
    },
    {
        id: 2,
        name: 'Ethan Lee',
        role: 'Head of Design',
        image: '/users/user_05.avif',
        socials: [
            { icon: Instagram, url: '#' },
            { icon: Twitter, url: '#' },
            { icon: Linkedin, url: '#' },
        ],
    },
    {
        id: 3,
        name: 'Sophia Patel',
        role: 'Marketing Lead',
        image: '/users/user_02.avif',
        socials: [
            { icon: Instagram, url: '#' },
            { icon: Twitter, url: '#' },
            { icon: Linkedin, url: '#' },
        ],
    },
    {
        id: 4,
        name: 'Liam Johnson',
        role: 'AI Styling Specialist',
        image: '/users/user_06.webp',
        socials: [
            { icon: Instagram, url: '#' },
            { icon: Twitter, url: '#' },
            { icon: Linkedin, url: '#' },
        ],
    },
];

export default function TeamSection() {
    return (
        <section className="w-full py-24 md:py-40 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4" data-aos="fade-up" >
                    <h2 className="text-4xl md:text-5xl font-semibold text-foreground">
                        Meet Our Team
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        The passionate minds behind AuraWear, bringing style, innovation, and sustainability to life.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, idx) => (
                        <div
                            data-aos="fade-up" data-aos-delay={idx * 200}
                            key={member.id}
                            className="group bg-background rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Image */}
                            <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border border-border">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>

                            {/* Name & Role */}
                            <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{member.role}</p>

                            {/* Socials */}
                            <div className="flex gap-3">
                                {member.socials.map((social, i) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={i}
                                            href={social.url}
                                            className="p-2 rounded-full bg-background border border-border text-foreground hover:bg-secondary/10 transition-colors"
                                        >
                                            <Icon className="w-4 h-4" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}