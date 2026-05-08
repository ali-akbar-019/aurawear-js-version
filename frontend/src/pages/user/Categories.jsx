import DefaultHeroSection from '@/components/Layout/DefaultHeroSection.jsx';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
    { id: 1, name: 'Men', image: '/men_fashion.jpg' },
    { id: 2, name: 'Women', image: '/women_fashion.avif' },
    { id: 3, name: 'Kids', image: '/kids_fashion.jpg' },
    { id: 4, name: 'Ethnic Wear', image: '/ethnic_wear.webp' },
    { id: 5, name: 'Casual Wear', image: '/casual_wear.jpg' },
    { id: 6, name: 'Formal Wear', image: '/formal_wear.jpg' },
    { id: 7, name: 'Party Wear', image: '/party_wear.webp' },
    { id: 8, name: 'New Arrivals', image: '/spring_collection.jpg' },
    { id: 9, name: 'Best Sellers', image: '/winter_essential.webp' },
    { id: 10, name: 'Sale / Offers', image: '/sale.jpg' },
    { id: 11, name: 'Stitched', image: '/stiched.webp' },
    { id: 12, name: 'Unstitched', image: '/unstiched.webp' },
];

export default function CategoriesPage() {
    return (
        <>
            <DefaultHeroSection
                image="/banner_08.jpg"
                title="Shop by Category"
                desc="Explore our latest collections and find your perfect style."
                buttonText="Shop Now"
            />
            <section className="w-full py-24 px-4 sm:px-6 lg:px-12 bg-background">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-20 space-y-4" >
                        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground" data-aos="fade-up" data-aos-delay={100}>
                            Explore Categories
                        </p>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight" data-aos="fade-up" data-aos-delay={200}>
                            Find Your Perfect Look
                        </h2>
                        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay={200}>
                            Browse our curated collections. Each category is designed for modern fashion lovers looking for style and quality.
                        </p>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {categories.map((category, index) => (
                            <div
                                key={category.id}
                                className="relative rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow duration-500 group cursor-pointer"
                                data-aos="fade-up" data-aos-delay={index * 100}
                            >
                                {/* Image */}
                                <div className="aspect-[4/5] w-full overflow-hidden rounded-t-3xl bg-muted">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent rounded-3xl pointer-events-none" />

                                {/* Category name and button */}
                                <div className="absolute bottom-6 left-6 right-6 z-10">
                                    <h3 className="text-2xl font-semibold text-white group-hover:text-white/90 transition-colors">
                                        {category.name}
                                    </h3>
                                    <Link to={"/shop"}>
                                        <div className="mt-4 inline-flex items-center gap-2 bg-background/20 backdrop-blur-md px-4 py-2 rounded-lg hover:bg-background/30 transition-colors">
                                            <span className="text-foreground font-medium text-sm">Explore</span>
                                            <ArrowRight className="w-4 h-4 text-foreground" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
}
