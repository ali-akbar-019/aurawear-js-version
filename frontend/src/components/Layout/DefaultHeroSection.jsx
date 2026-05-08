const DefaultHeroSection = ({
    title = "   Your Beauty, Our Priority", desc = "   At Beauty By Aurawear ai, we believe that beauty is more than skin deep. Our expert team is dedicated to helping you look and feel your best through personalized beauty treatments and premium products that enhance your natural radiance.", image = "/imgs/banner_image.jpg", buttonText = "Contact"
}) => {
    return (
        <section className="relative min-h-[500px]">
            <img src={image} alt={"about us"} className="absolute w-full h-full object-cover" id="scrollLeft" />
            <div className="absolute  h-full flex items-center " id="scrollRight">
                <div className="px-10 md:px-20 lg:px-32 space-y-5">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-white max-w-lg" data-aos="fade-right" data-aos-delay={100}>
                        {title}
                    </h2>
                    <p className="max-w-xl text-base text-white/90" data-aos="fade-right" data-aos-delay={200}>
                        {desc}
                    </p>
                    <button className="border border-[#de3577] text-sm transition-all text-[#de3577] px-10 py-1 rounded-full cursor-pointer hover:bg-primary hover:text-white" data-aos="fade-right" data-aos-delay={300}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default DefaultHeroSection
