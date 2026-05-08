import { ArrowRight } from 'lucide-react';

const categories = [
    {
        id: 1,
        name: 'Women',
        count: '2,450+ items',
        image: "/winter_essential.webp"
    },
    {
        id: 2,
        name: 'Men',
        count: '1,890+ items',
        image: "/men_fashion.jpg"
    },
    {
        id: 3,
        name: 'Accessories',
        count: '980+ items',
        image: "/accessories.jpeg"
    },
];

export default function CategoriesSection() {
    return (
        <section className="w-full py-20 bg-background" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-14 max-w-xl" data-aos="fade-up">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                        Shop by category
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
                        Find your style
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className="group cursor-pointer rounded-xl border border-border bg-background overflow-hidden transition-shadow hover:shadow-lg"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="aspect-[4/3] bg-muted">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-foreground">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {category.count}
                                    </p>
                                </div>

                                <ArrowRight className="w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
