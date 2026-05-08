import DefaultHeroSection from "@/components/Layout/DefaultHeroSection.jsx"
import AboutStory from "@/components/users_pages/about/AboutStory.jsx"
import CoreValues from "@/components/users_pages/about/CoreValues.jsx"
import JourneyTimeline from "@/components/users_pages/about/JourneyTimeline.jsx"
import SustainabilitySection from "@/components/users_pages/about/SustainabilitySection.jsx"
import TeamSection from "@/components/users_pages/about/TeamSection.jsx"

const About = () => {
    return (
        <div>
            <DefaultHeroSection
                image="/banner_02.jpg"
                title="About Aurawear"
                desc="At Aurawear, we combine style, quality, and convenience to help you look your best. Explore our story and discover what makes us your go-to fashion destination."
                buttonText="Learn More"
            />
            <AboutStory />
            <CoreValues />
            <TeamSection />
            <JourneyTimeline />
            <SustainabilitySection />
        </div>
    )
}

export default About
