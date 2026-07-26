import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
    {
        id: 1,
        name: 'Essential White Linen Shirt',
        price: 'Rs. 8,900',
        rating: 4.8,
        reviews: 124,
        image: "/products/product_01.jpg"
    },
    {
        id: 2,
        name: 'Tailored Black Blazer',
        price: 'Rs. 24,900',
        rating: 4.9,
        reviews: 89,
        image: "/products/product_02.jpg"
    },
    {
        id: 3,
        name: 'Classic Denim Jeans',
        price: 'Rs. 12,900',
        rating: 4.7,
        reviews: 156,
        image: "/products/product_03.webp"
    },
    {
        id: 4,
        name: 'Minimalist Crew Neck Sweater',
        price: 'Rs. 11,900',
        rating: 4.8,
        reviews: 92,
        image: "/products/product_04.webp"
    },
];

export default function FeaturedProducts() {
    return (
        <section className="w-full py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">

                <div className="mb-14 max-w-2xl">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                        Curated selection
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
                        Best Sellers
                    </h2>
                    <p className="text-base text-muted-foreground">
                        Timeless pieces chosen for quality, comfort, and everyday elegance.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {products.map((product, index) => (
                        <div key={product.id} className="group" data-aos="fade-up" data-aos-delay={index * 100}>

                            <div className="relative aspect-[4/5] bg-muted rounded-lg overflow-hidden border border-border mb-5" >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />

                                <button className="absolute top-3 right-3 p-2 rounded-full bg-background shadow-sm opacity-0 group-hover:opacity-100 transition">
                                    <Heart className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                                </button>

                                <div className="absolute inset-x-0 bottom-3 px-3 opacity-0 group-hover:opacity-100 transition">
                                    <Button className="w-full h-10 text-sm font-medium flex items-center justify-center gap-2">
                                        <ShoppingBag className="w-4 h-4" />
                                        Add to bag
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-foreground leading-snug">
                                    {product.name}
                                </h3>

                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>{product.rating} ★</span>
                                    <span>({product.reviews})</span>
                                </div>

                                <p className="text-base font-semibold text-foreground">
                                    {product.price}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-16" data-aos="fade-up" >
                    <Link to="/shop">
                        <Button variant="outline" className="h-12 px-8 text-sm font-medium flex items-center gap-2">
                            View all products
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}
