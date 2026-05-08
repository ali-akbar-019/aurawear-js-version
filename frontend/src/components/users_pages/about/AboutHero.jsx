import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function AboutHero() {
    return (
        <section className="w-full relative bg-background py-24 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                {/* LEFT — Text */}
                <div className="space-y-6 z-10 relative">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border shadow-sm">
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm font-medium text-foreground">
                            Timeless Fashion & Modern Style
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
                        Crafted With Purpose
                    </h1>

                    <p className="text-base sm:text-lg text-muted-foreground max-w-lg font-light leading-relaxed">
                        AuraWear blends thoughtful design with premium quality. Our collections make you feel confident, stylish, and comfortable every day.
                    </p>

                    <Button className="mt-6 h-14 px-8 text-base font-semibold bg-pink-500 text-primary-foreground rounded-lg shadow-md hover:bg-primary/90 transition-all duration-300">
                        Explore Our Collections
                    </Button>
                </div>

                {/* RIGHT — Image */}
                <div className="relative flex justify-center lg:justify-end">
                    <div className="aspect-[4/5] w-full max-w-md md:max-w-lg rounded-xl overflow-hidden border border-border shadow-lg">
                        <img
                            src="/banner_02.jpg"
                            alt="AuraWear Style"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* subtle background accent */}
                    <div className="absolute -inset-6 rounded-3xl bg-accent/10 blur-3xl"></div>
                </div>
            </div>
        </section>
    );
}