import DefaultHeroSection from "@/components/Layout/DefaultHeroSection.jsx";
import ContactForm from "@/components/users_pages/contact/ContactForm.jsx";
import ContactInfo from "@/components/users_pages/contact/ContactInfo.jsx";
import FAQ from "@/components/users_pages/contact/FAQ.jsx";
import Map from "@/components/users_pages/contact/Map.jsx";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <DefaultHeroSection
                image="/banner_04.jpg"
                title="Get in Touch with Aurawear"
                desc="Have questions or need assistance? Our team is here to help you with orders, styling advice, or any inquiries."
                buttonText="Contact Us"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <ContactForm />
                    </div>
                    <div>
                        <ContactInfo />
                    </div>
                </div>
            </div>
            <Map />
            <FAQ />
        </main>
    );
}
