import { useState } from 'react';
import { Link } from 'react-router-dom';

export const RecommendedProducts = ({
    recommendations,
    loading,
    imageUrl,
}) => {
    return (
        <>
            {recommendations.length > 0 ? (
                <div className="space-y-10">
                    <div className="text-center space-y-3">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                            Recommended for You
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Curated styles based on your unique profile and preferences
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {recommendations.map((product, index) => {
                            const [isHovered, setIsHovered] = useState(false);

                            return (
                                <Link
                                    key={product.id}
                                    to={`/shop/${product.id}`}
                                    className="group"
                                >
                                    <div
                                        className="flex flex-col h-full bg-background border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        <div className="relative w-full aspect-3/4 bg-muted overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-contain bg-muted transition-transform duration-700 ease-out group-hover:scale-105"
                                            />
                                            {isHovered && (
                                                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm transition-opacity duration-300" />
                                            )}
                                        </div>

                                        <div className="p-4 flex flex-col grow justify-between">
                                            <p className="text-xs uppercase tracking-widest font-light text-muted-foreground mb-1">
                                                {product.occasion}
                                            </p>

                                            <h3 className="text-sm font-medium mb-2 line-clamp-2 group-hover:text-foreground/90 transition-colors">
                                                {product.name}
                                            </h3>

                                            <div className="flex items-baseline gap-2 pt-2 border-t border-border">
                                                <span className="text-sm font-medium text-foreground">
                                                    {product.price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ) : (
                !loading &&
                imageUrl && (
                    <div className="text-center py-16 space-y-4">
                        <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                            <span className="text-muted-foreground text-2xl">📷</span>
                        </div>
                        <p className="text-muted-foreground text-lg font-medium">
                            No products available for your profile yet.
                        </p>
                        <p className="text-muted-foreground">
                            Try uploading a different photo or adjusting your preferences.
                        </p>
                    </div>
                )
            )}
        </>
    );
};

export default RecommendedProducts;
