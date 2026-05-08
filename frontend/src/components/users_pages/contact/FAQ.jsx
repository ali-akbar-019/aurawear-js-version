import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        id: 1,
        question: 'What is your return policy?',
        answer:
            'We offer 30-day returns on all items in original condition with tags attached. Simply initiate a return through your account or contact our support team.',
    },
    {
        id: 2,
        question: 'How long does shipping take?',
        answer:
            'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business day delivery. Orders over $50 qualify for free standard shipping.',
    },
    {
        id: 3,
        question: 'Do you ship internationally?',
        answer:
            'Yes! We ship to over 50 countries worldwide. International shipping times vary by location (10-21 business days) and may include customs duties.',
    },
    {
        id: 4,
        question: 'How can I track my order?',
        answer:
            "You'll receive a tracking number via email once your order ships. You can also track your order anytime in your account.",
    },
    {
        id: 5,
        question: 'What payment methods do you accept?',
        answer:
            'We accept all major credit cards, PayPal, Apple Pay, Google Pay, and installment plans through Affirm and Klarna.',
    },
    {
        id: 6,
        question: 'How do I contact customer support?',
        answer:
            'Reach us via email at support@aurawear.com, call +1 (800) 555-1234, or use the chat feature. Responses typically take under 2 hours.',
    },
];

export default function ContactFAQ() {
    const [openId, setOpenId] = useState(null);

    return (
        <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="text-center space-y-3" data-aos="fade-up" >
                    <h2 className="text-4xl md:text-5xl font-semibold text-foreground">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Find answers to common questions about shipping, returns, and more.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            data-aos="fade-up" data-aos-delay={index * 200}
                            key={faq.id}
                            className="border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
                        >
                            <button
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-foreground text-lg rounded-2xl hover:bg-muted/10 transition-colors"
                            >
                                <span>{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ${openId === faq.id ? 'max-h-96 py-4' : 'max-h-0'
                                    }`}
                            >
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <p className="text-sm text-muted-foreground">
                        Still have questions?{' '}
                        <a href="/contact" className="text-primary font-semibold hover:underline">
                            Contact us
                        </a>
                        .
                    </p>
                </div>
            </div>
        </section>
    );
}
