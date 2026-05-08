
import BenefitsSection from '@/components/users_pages/home/BenefitsSection.jsx';
import CategoriesSection from '@/components/users_pages/home/CategoriesSection.jsx';
import CollectionsSection from '@/components/users_pages/home/CollectionsSection.jsx';
import FeaturedProducts from '@/components/users_pages/home/FeaturedProducts.jsx';
import HeroSection from '@/components/users_pages/home/HeroSection.jsx';
import NewsletterSection from '@/components/users_pages/home/NewsletterSection.jsx';
import TestimonialsSection from '@/components/users_pages/home/TestimonialsSection.jsx';


export default function Page() {
    return (
        <main className="min-h-screen bg-white">
            <HeroSection />
            <FeaturedProducts />
            <CategoriesSection />
            <BenefitsSection />
            <CollectionsSection />
            <TestimonialsSection />
            <NewsletterSection />
        </main>
    );
}
