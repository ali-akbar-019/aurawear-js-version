import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const collections = [
    {
        id: 1,
        name: 'Spring Collection',
        description: 'Light layers and breathable silhouettes for warmer days.',
        image: '/banner_09.jpg',
        badge: 'Up to 30% Off',
    },
    {
        id: 2,
        name: 'Winter Essentials',
        description: 'Refined outerwear and elevated cold-weather staples.',
        image: '/banner_06.jpg',
        badge: 'Now Trending',
    },
];

export default function CollectionsSection() {
    return (
        <section className="w-full py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-14 max-w-2xl" data-aos="fade-up" >
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                        Seasonal collections
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
                        Designed for the season
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {collections.map((collection, index) => (
                        <div
                            key={collection.id}
                            className="group relative overflow-hidden rounded-2xl border border-border bg-background"
                            data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="aspect-[16/10]">
                                <img
                                    src={collection.image}
                                    alt={collection.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                            <div className="absolute top-6 right-6 z-10 rounded-full border border-border bg-background/80 backdrop-blur px-4 py-1.5 text-xs font-medium text-foreground">
                                {collection.badge}
                            </div>

                            <div className="absolute inset-x-0 bottom-0 z-10 p-8">
                                <div className="max-w-sm space-y-3">
                                    <h3 className="text-2xl font-semibold text-foreground">
                                        {collection.name}
                                    </h3>
                                    <p className="text-sm text-white leading-relaxed">
                                        {collection.description}
                                    </p>

                                    <Button
                                        variant="outline"
                                        className="mt-4 inline-flex items-center gap-2 rounded-full px-6 bg-background/50 backdrop-blur transition-transform group-hover:translate-x-1"
                                    >
                                        Shop collection
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
