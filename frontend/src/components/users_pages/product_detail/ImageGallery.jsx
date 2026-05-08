import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery({ product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const discount = product.discountPrice
        ? Math.round(((product.basePrice - product.discountPrice) / product.basePrice) * 100)
        : 0;

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="relative bg-secondary rounded-lg overflow-hidden aspect-square" data-aos="fade-right" >
                <img
                    src={product.images[currentImageIndex].url}
                    alt={`${product.name} view ${currentImageIndex + 1}`}
                    className="object-cover w-full h-full"
                />

                <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                </button>

                {product.discountPrice && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        -{discount}%
                    </div>
                )}
            </div>

            <div className="flex gap-3">
                {product.images.map((image, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition ${currentImageIndex === idx
                            ? "border-foreground"
                            : "border-border hover:border-muted-foreground"
                            }`}
                        aria-label={`View image ${idx + 1}`}
                    >
                        <img
                            src={image.url}
                            alt={`Thumbnail ${idx + 1}`}
                            className="object-cover w-full h-full"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
