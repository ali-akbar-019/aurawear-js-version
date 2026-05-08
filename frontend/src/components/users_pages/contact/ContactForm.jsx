'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Error while submitting the form");
            }

            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            toast.success("Thank you for submitting the form. Our team will contact you soon.");

        } catch (error) {
            console.error("Error while submitting the form", error);
            toast.error("Error while submitting the form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto" data-aos="fade-right">
            <h2 className="text-3xl font-semibold text-foreground mb-8">Send us a Message</h2>

            {submitted && (
                <div className="mb-8 p-4 bg-secondary/10 border border-secondary text-muted-foreground rounded-xl">
                    Thank you! We've received your message and will get back to you soon.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">Name</label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            className="h-12 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                            className="h-12 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">Subject</label>
                    <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this about?"
                        required
                        className="h-12 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more..."
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground resize-none transition"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className={`w-full h-12 bg-primary hover:bg-primary/90 text-background font-semibold rounded-xl flex items-center justify-center gap-2 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                    {loading ? "Sending..." : "Send Message"}
                </Button>
            </form>
        </div>
    );
}
