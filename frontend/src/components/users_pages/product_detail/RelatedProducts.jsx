import { Link } from "react-router-dom";

export default function RelatedProducts({
    products,
    currentProductId,
}) {
    const relatedProducts = products?.filter(
        (prod) => prod._id !== currentProductId
    );

    return (
        <div className="mt-20 pt-10 border-t border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
                Related Products
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {relatedProducts && relatedProducts.length > 0 ? (
                    relatedProducts.map((prod) => (
                        <Link key={prod._id} to={`/product/${prod._id}`} className="group">
                            <div className="rounded-xl overflow-hidden bg-secondary aspect-square">
                                <img
                                    src={prod.images?.[0]?.url}
                                    alt={prod.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="mt-3 space-y-1">
                                <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:opacity-80 transition">
                                    {prod.description}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    ${prod.discountPrice}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center text-muted-foreground py-10">
                        No products found
                    </div>
                )}
            </div>
        </div>
    );
}
