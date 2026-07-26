
import DefaultHeroSection from '@/components/Layout/DefaultHeroSection.jsx';
import { PhotoAnalysisCard } from '@/components/users_pages/aifit/PhotoAnalysisCard.jsx';
import { RecommendedProducts } from '@/components/users_pages/aifit/RecommendedProducts.jsx';
import { uploadImageToCloudinary } from '@/lib/cloudinary.js';
import { useState } from 'react';
import { toast } from 'sonner';

const dummyRecommendations = [
    { id: 1, name: 'Slim Fit Shirt', image: '/banner_01.jpg', price: 'Rs. 1,499', occasion: 'Casual' },
    { id: 2, name: 'Ethnic Kurta', image: '/banner_02.jpg', price: 'Rs. 2,499', occasion: 'Ethnic' },
    { id: 3, name: 'Formal Blazer', image: '/placeholder_formal.jpg', price: 'Rs. 3,999', occasion: 'Formal' },
];

const API_BASE = import.meta.env.VITE_API_BASE || '';

export default function AIFitsPage() {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        gender: '',
        bodyType: '',
        skinTone: '',
        heightCm: '',
        weightKg: '',
        age: ''
    });
    const [recommendations, setRecommendations] = useState(dummyRecommendations);

    // Upload image to Cloudinary

    const handleUpload = async (e) => {
        if (!e.target.files?.[0]) return;

        const file = e.target.files[0];
        setUploadedImage(file);
        setLoading(true);

        try {
            const url = await uploadImageToCloudinary(file);
            setImageUrl(url);
            toast.success("Image uploaded successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Image upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    // Handle form input changes
    const handleFormChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // -------------------- AI ANALYSIS FUNCTION --------------------


    const fetchAnalyzeImage = async (imageUrl) => {
        if (!imageUrl) throw new Error("Image URL is required");

        const res = await fetch(`${API_BASE}/api/ai/extract`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl }),
        });

        if (!res.ok) {
            const errBody = await res.json().catch(() => null);
            throw new Error(errBody?.message || "Failed to analyze image");
        }

        const data = await res.json();
        return data.bodyInfo;
    };

    const handleAnalyze = async () => {
        if (!imageUrl) {
            toast.error("Please upload an image first.");
            return;
        }

        setLoading(true);

        try {
            // 1️⃣ Get AI body info
            const bodyInfo = await fetchAnalyzeImage(imageUrl);

            console.log("AI data:", bodyInfo);

            setFormData({
                gender: bodyInfo.gender || "",
                bodyType: bodyInfo.bodyType || "",
                skinTone: bodyInfo.skinTone || "",
                heightCm: bodyInfo.heightCm?.toString() || "",
                weightKg: bodyInfo.weightKg?.toString() || "",
                age: bodyInfo.age?.toString() || "",
            });

            toast.success("Body analysis completed");

            // 2️⃣ Fetch real product recommendations
            const res = await fetch(`${API_BASE}/api/products/recommendations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    gender: bodyInfo.gender,
                    bodyType: bodyInfo.bodyType,
                    skinTone: bodyInfo.skinTone,
                    heightCm: bodyInfo.heightCm,
                    weightKg: bodyInfo.weightKg,
                }),
            });

            if (!res.ok) {
                const errBody = await res.json().catch(() => null);
                throw new Error(errBody?.message || "Failed to fetch recommendations");
            }

            const data = await res.json();
            setRecommendations(
                data.products.map((p) => ({
                    id: p._id,
                    name: p.name,
                    image:
                        p.images.find((img) => img.isPrimary)?.url ||
                        p.images[0]?.url ||
                        "",
                    price: p.discountPrice ? `Rs. ${p.discountPrice}` : `Rs. ${p.basePrice}`,
                    occasion: p.occasion,
                }))
            );

            // 3️⃣ Feedback based on results
            if (data.products.length === 0) {
                toast.error("No products found for your profile");
            } else {
                toast.success("Recommendations ready for you!");
            }
        } catch (err) {
            console.error("AI analysis or recommendation error:", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="w-full min-h-screen bg-background">
            {/* Hero Section */}
            <DefaultHeroSection
                image="/banner_10.jpg"
                title="Discover Your Perfect Fit"
                desc="Upload your photo and let Aurawear recommend outfits tailored to your body type, style, and preferences."
                buttonText="Get Started"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24 space-y-20">
                {/* Upload + Form Section */}
                <PhotoAnalysisCard
                    uploadedImage={uploadedImage}
                    imageUrl={imageUrl}
                    loading={loading}
                    formData={formData}
                    handleUpload={handleUpload}
                    handleFormChange={handleFormChange}
                    handleAnalyze={handleAnalyze}
                />

                {/* Recommendations Section */}
                <RecommendedProducts
                    recommendations={recommendations}
                    loading={loading}
                    imageUrl={imageUrl}
                />
            </div>
        </section>
    );
}
