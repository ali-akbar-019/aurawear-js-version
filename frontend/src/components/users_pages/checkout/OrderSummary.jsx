import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/currency.js';

export const OrderSummary = ({
    cartItems,
    subtotal,
    shippingCost,
    totalAmount
}) => {
    return (
        <Card className="h-fit sticky top-20">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
                {cartItems.map(item => (
                    <div key={item._id} className="flex gap-4">
                        <img
                            src={item.productId.images[0]?.url || ""}
                            alt={item.productId.name}
                            className="w-16 h-20 object-cover rounded-md border"
                        />
                        <div className="flex-1">
                            <p className="text-sm font-medium">{item.productId.name}</p>
                            <p className="text-xs text-muted-foreground">
                                {item.variant.color} • {item.variant.size}
                            </p>
                            <p className="text-sm mt-1">
                                {formatCurrency(item.productId.discountPrice || item.productId.basePrice)} × {item.quantity}
                            </p>
                        </div>
                    </div>
                ))}

                <Separator />

                <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{formatCurrency(shippingCost)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>{formatCurrency(totalAmount)}</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderSummary;
