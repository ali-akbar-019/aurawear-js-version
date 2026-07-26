import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lock, Loader2 } from 'lucide-react';
import { CardElement } from '@stripe/react-stripe-js';

export const CheckoutForm = ({
    shipping,
    setShipping,
    error,
    loading,
    stripe,
    handlePay,
    isFormValid,
    totalAmount
}) => {
    return (
        <div className="lg:col-span-2 space-y-8">

            <Card>
                <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(shipping).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                            <Label className="capitalize">
                                {key.replace(/([A-Z])/g, " $1")}
                            </Label>
                            <Input
                                value={value}
                                onChange={e => setShipping({ ...shipping, [key]: e.target.value })}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Secure Payment
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md p-4 mb-4 bg-background">
                        <CardElement />
                    </div>

                    {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

                    <Button
                        onClick={handlePay}
                        disabled={!stripe || loading || !isFormValid}
                        className="w-full h-12 text-base"
                    >
                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Pay Rs. {totalAmount.toFixed(2)}
                    </Button>

                    <p className="text-xs text-muted-foreground mt-3 text-center">
                        Your payment is encrypted and processed securely by Stripe.
                    </p>
                </CardContent>
            </Card>

        </div>
    );
};

export default CheckoutForm;
