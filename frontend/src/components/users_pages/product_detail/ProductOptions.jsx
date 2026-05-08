import { ShoppingCart } from "lucide-react";

const ProductOptions = ({
    colors,
    colorMap,
    selectedColor,
    setSelectedColor,
    allSizes,
    availableSizes,
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
    handleAddToCart,
    isOutOfStock,
}) => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                    Color: <span className="font-normal">{selectedColor}</span>
                </label>
                <div className="flex gap-3 flex-wrap">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-12 h-12 rounded-full border-2 transition ${selectedColor === color
                                ? "border-foreground ring-2 ring-offset-2 ring-foreground"
                                : "border-border hover:border-muted-foreground"
                                } ${colorMap[color]}`}
                            title={color}
                            aria-label={`Select color ${color}`}
                        />
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                    Size: <span className="font-normal">{selectedSize}</span>
                </label>
                <div className="flex gap-2 flex-wrap">
                    {allSizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            disabled={!availableSizes.includes(size)}
                            className={`px-6 py-3 border-2 rounded-lg font-medium transition ${selectedSize === size
                                ? "border-foreground bg-foreground text-background"
                                : "border-border text-foreground hover:border-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                                }`}
                            aria-label={`Select size ${size}`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 items-center pt-2">
                <div className="flex items-center border border-border rounded-lg">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-foreground hover:bg-secondary transition"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>
                    <span className="px-6 py-2 text-foreground font-semibold min-w-16 text-center">
                        {quantity}
                    </span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 text-foreground hover:bg-secondary transition"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex-1 bg-foreground text-background px-8 py-3 rounded-lg font-semibold hover:bg-foreground/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductOptions;
