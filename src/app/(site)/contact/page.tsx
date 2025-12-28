import { ContactForm } from '@/components/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Contact | EditFlow Portfolio',
  description: 'Get in touch for collaborations, freelance video editing work, or any inquiries.',
};

export default function ContactPage() {
  return (
    <div className="container max-w-6xl py-16 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Let's Create Together
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Have a project in mind or just want to say hi? I'd love to hear from you.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Mail className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Email</h3>
              <p className="text-muted-foreground">
                Drop a line for project inquiries, collaborations, or questions.
              </p>
              <a href="mailto:hello@editflow.com" className="mt-1 block text-accent hover:underline">
                hello@editflow.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Phone className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Phone</h3>
              <p className="text-muted-foreground">
                Available for calls during business hours for urgent matters.
              </p>
              <a href="tel:+1234567890" className="mt-1 block text-accent hover:underline">
                +1 (234) 567-890
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Location</h3>
              <p className="text-muted-foreground">
                Based in the creative hub of the internet. Available for remote work worldwide.
              </p>
              <p className="mt-1 block text-accent">
                Digital Realm
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
