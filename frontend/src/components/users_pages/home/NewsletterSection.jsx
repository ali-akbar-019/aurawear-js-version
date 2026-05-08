import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

export default function NewsletterSection() {
    return (
        <section className="w-full py-24 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up" >

                <div className="rounded-3xl border border-border bg-background px-8 py-14 sm:px-12 sm:py-16 shadow-lg" >
                    <div className="max-w-xl mx-auto text-center space-y-8">

                        <div className="mx-auto w-14 h-14 rounded-full bg-muted flex items-center justify-center shadow-md">
                            <Mail className="w-6 h-6 text-primary" />
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                                Join our newsletter
                            </h2>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                Monthly drops, early access, and thoughtful style insights — straight to your inbox.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                className="h-12 sm:flex-1 rounded-xl border border-border bg-background px-4 focus-visible:ring-0 focus-visible:border-primary transition-colors"
                            />
                            <Button
                                type="submit"
                                className="h-12 px-6 rounded-xl font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
                            >
                                Subscribe
                            </Button>
                        </div>

                        <p className="text-xs text-muted-foreground pt-2">
                            No spam. Unsubscribe anytime.
                        </p>

                    </div>
                </div>

            </div>
        </section>
    );
}
