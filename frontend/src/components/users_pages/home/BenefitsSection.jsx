import { Truck, RotateCcw, Shield, Zap } from 'lucide-react';

const benefits = [
    {
        id: 1,
        icon: Truck,
        title: 'Free Shipping',
        description: 'Complimentary shipping on orders above Rs. 10,000 worldwide.',
    },
    {
        id: 2,
        icon: RotateCcw,
        title: 'Easy Returns',
        description: '30-day easy returns with instant refunds.',
    },
    {
        id: 3,
        icon: Shield,
        title: 'Secure Payments',
        description: 'End-to-end encrypted checkout experience.',
    },
    {
        id: 4,
        icon: Zap,
        title: 'Premium Quality',
        description: 'Designed with precision and premium materials.',
    },
];

export default function BenefitsSection() {
    return (
        <section className="w-full bg-background border-y border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                <div className="mb-12 max-w-xl" data-aos="fade-up" >
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                        Why choose us
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
                        Built for quality and trust
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;

                        return (
                            <div
                                key={benefit.id}
                                className="group rounded-xl border border-border bg-muted/30 p-6 transition-colors hover:bg-muted/50"
                                data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="flex items-start gap-4">

                                    <div className="flex items-center justify-center rounded-lg min-w-10 h-10 bg-white/30 border border-border">
                                        <Icon className="w-5 h-5 text-primary" />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-primary">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
