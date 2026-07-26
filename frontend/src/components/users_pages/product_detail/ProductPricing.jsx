import { Check, X } from "lucide-react";
import { formatCurrency } from '@/lib/currency.js';

const ProductPricing = ({ basePrice, discountPrice, stock }) => {
    const isOutOfStock = stock === 0;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">
                    {formatCurrency(discountPrice || basePrice)}
                </span>
                {discountPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                        {formatCurrency(basePrice)}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-2">
                {isOutOfStock ? (
                    <>
                        <X className="w-5 h-5 text-red-600" />
                        <span className="text-red-600 font-semibold">Out of Stock</span>
                    </>
                ) : stock < 5 ? (
                    <>
                        <X className="w-5 h-5 text-orange-600" />
                        <span className="text-orange-600 font-semibold">
                            Only {stock} left in stock
                        </span>
                    </>
                ) : (
                    <>
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-green-600 font-semibold">In Stock</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductPricing;
