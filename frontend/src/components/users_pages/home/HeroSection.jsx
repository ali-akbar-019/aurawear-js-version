import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className="relative w-full bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

                    <div className="space-y-8" data-aos="fade-right">
                        <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground">
                            Premium menswear collection
                        </p>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-tight">
                            Designed for<br />Modern Elegance
                        </h1>

                        <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                            Thoughtfully crafted clothing made from premium materials.
                            Built for comfort, longevity, and timeless style.
                        </p>

                        <div className="flex items-center gap-4 pt-4">
                            <Link to="/shop">
                                <Button className="h-12 px-7 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                                    Shop Collection
                                </Button>
                            </Link>
                            <Link to="/shop">
                                <Button
                                    variant="ghost"
                                    className="h-12 px-4 text-sm font-medium hover:text-foreground"
                                >
                                    New arrivals
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-6 pt-10 border-t border-border">
                            <div>
                                <p className="text-lg font-semibold text-foreground">10k+</p>
                                <p className="text-xs text-muted-foreground">Customers</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-foreground">Premium</p>
                                <p className="text-xs text-muted-foreground">Materials</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-foreground">Free</p>
                                <p className="text-xs text-muted-foreground">Shipping $500+</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative" data-aos="fade-left">
                        <div className="aspect-square w-full rounded-xl overflow-hidden border border-border bg-muted">
                            <Carousel
                                opts={{ align: "start", loop: true }}
                                plugins={[Autoplay({ delay: 2000 })]}
                                className="h-full w-full"
                            >
                                <CarouselContent className="h-full">
                                    {[
                                        "/carousel/banner_06.jpg",
                                        "/carousel/banner_07.jpg",
                                        "/carousel/banner_08.jpg",
                                        "/carousel/banner_09.jpg",
                                        "/carousel/banner_01.jpg",
                                        "/carousel/banner_02.jpg",
                                        "/carousel/banner_03.jpg",
                                        "/carousel/banner_04.jpg",
                                        "/carousel/banner_05.jpg",
                                        "/carousel/banner_10.jpg",
                                        "/carousel/banner_11.jpg",
                                    ].map((src, i) => (
                                        <CarouselItem key={i} className="h-full">
                                            <img
                                                src={src}
                                                alt={`Banner ${i + 1}`}
                                                className="h-[600px] w-full object-cover"
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
