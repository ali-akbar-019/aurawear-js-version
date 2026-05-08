import { Card } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook } from 'lucide-react';

const contactMethods = [
    {
        id: 1,
        icon: Mail,
        title: 'Email',
        details: 'support@aurawear.com',
        description: 'Replies within 2 hours',
    },
    {
        id: 2,
        icon: Phone,
        title: 'Phone',
        details: '+1 (555) 123-4567',
        description: 'Mon–Fri · 9AM–6PM EST',
    },
    {
        id: 3,
        icon: MapPin,
        title: 'Address',
        details: '123 Fashion Street, New York, NY',
        description: 'Flagship store',
    },
    {
        id: 4,
        icon: Clock,
        title: 'Hours',
        details: 'Mon–Fri · 9AM–6PM',
        description: 'Weekend: 10AM–4PM',
    },
];

const socialLinks = [
    { name: 'Instagram', icon: MessageCircle, url: '#' },
    { name: 'Facebook', icon: Facebook, url: '#' },
];

export default function ContactInfo() {
    return (
        <div className="space-y-12">

            <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">
                    Contact Information
                </h3>

                <div className="grid gap-4">
                    {contactMethods.map((method, index) => {
                        const Icon = method.icon;
                        return (
                            <Card
                                data-aos="fade-left" data-aos-delay={index * 100}
                                key={method.id}
                                className="flex items-start gap-4 p-5 rounded-xl border border-border bg-background hover:bg-muted/20 transition-colors duration-300"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/90">
                                    <Icon className="h-5 w-5 text-white" />
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-foreground">{method.title}</p>
                                    <p className="text-sm text-foreground">{method.details}</p>
                                    <p className="text-xs text-muted-foreground">{method.description}</p>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Follow Us</h3>
                <div className="flex gap-3">
                    {socialLinks.map((link, i) => {
                        const Icon = link.icon;
                        return (
                            <a
                                data-aos="fade-up" data-aos-delay={i * 200}
                                key={i}
                                href={link.url}
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-primary hover:bg-primary/80 transition-colors duration-300"
                            >
                                <Icon className="h-5 w-5 text-white" />
                            </a>
                        );
                    })}
                </div>
            </div>

            <Card className="p-6 rounded-xl border border-border bg-muted/30 hover:bg-muted/40 transition-colors duration-300" data-aos="fade-up" >
                <div className="flex items-start gap-3">
                    <MessageCircle className="min-h-5 min-w-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">Need quick help?</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Our support team is available 24/7 to assist you with any questions or concerns.
                        </p>
                    </div>
                </div>
            </Card>

        </div>
    );
}
