'use client';

import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Sophie Anderson',
        role: 'Fashion Blogger',
        initials: 'SA',
        content:
            'AuraWear AI completely transformed my wardrobe. The recommendations feel intentional and deeply personal.',
        rating: 5,
        image: "/users/user_01.avif"
    },
    {
        id: 2,
        name: 'Emily Chen',
        role: 'Marketing Manager',
        initials: 'EC',
        content:
            'I finally stopped second-guessing purchases. The styling quiz nailed my taste better than I ever expected.',
        rating: 5,
        image: "/users/user_02.avif"
    },
    {
        id: 3,
        name: 'Jessica Williams',
        role: 'Entrepreneur',
        initials: 'JW',
        content:
            'Shopping went from overwhelming to effortless. I trust the picks every time.',
        rating: 5,
        image: "/users/user_03.jpg"
    },
    {
        id: 4,
        name: 'Rachel Matthews',
        role: 'Creative Director',
        initials: 'RM',
        content:
            'Minimal, thoughtful, and high quality. AuraWear feels aligned with how I want to consume fashion.',
        rating: 5,
        image: "/users/user_04.avif"
    },
];

export default function TestimonialsSection() {
    return (
        <section className="w-full py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >

                <div className="max-w-2xl mb-16 " data-aos="fade-up" >
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                        Testimonials
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
                        Trusted by modern shoppers
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((t, index) => (
                        <Card
                            key={t.id}
                            className="p-6 rounded-2xl border border-border bg-background hover:border-muted-foreground/30 transition-colors"
                            data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-yellow-500 text-yellow-600"
                                    />
                                ))}
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                "{t.content}"
                            </p>

                            <div className="flex items-center gap-3 pt-4 border-t border-border">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <div className="leading-tight">
                                    <p className="text-sm font-medium text-foreground">
                                        {t.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {t.role}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
