const ProductHeader = ({ product, reviewsCount }) => {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
                {product.productType}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {product.name}
            </h1>
            <div className="flex items-center gap-3">
                <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                        <span key={i}>
                            {i < Math.round(product.rating) ? "★" : "☆"}
                        </span>
                    ))}
                </div>
                <span className="text-sm text-muted-foreground">
                    ({reviewsCount} reviews)
                </span>
            </div>
        </div>
    );
};

export default ProductHeader;
