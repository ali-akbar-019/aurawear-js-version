export default function LocationMap() {
    return (
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="max-w-7xl mx-auto space-y-12" data-aos="fade-up"  >
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12">
                        Visit Our Store
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <div className="rounded-2xl overflow-hidden shadow-lg h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-74.0059728!3d40.7127837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e6d4e8f7%3A0x1234567890abcdef!2s123%20Fashion%20Ave%2C%20New%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-2xl"
                        />
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-foreground mb-4">
                                AuraWear NYC Store
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Visit our flagship store in the heart of Manhattan. Our knowledgeable staff is ready to help you find the perfect pieces for your wardrobe.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-muted-foreground uppercase">Address</p>
                                <p className="text-lg text-foreground">123 Fashion Avenue, New York, NY 10001</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-muted-foreground uppercase">Hours</p>
                                <div className="text-foreground space-y-1">
                                    <p>Monday - Friday: 10AM - 8PM</p>
                                    <p>Saturday: 11AM - 7PM</p>
                                    <p>Sunday: 12PM - 6PM</p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-muted-foreground uppercase">Phone</p>
                                <a href="tel:+18005551234" className="text-lg text-primary hover:underline">
                                    +1 (800) 555-1234
                                </a>
                            </div>
                        </div>

                        <button className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors duration-300">
                            Get Directions
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
