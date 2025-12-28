'use client';
import { ContactForm } from '@/components/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import type { SiteSettings } from '@/lib/definitions';
import { doc } from 'firebase/firestore';

export default function ContactPage() {
  const firestore = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(firestore, 'settings', 'site'), [firestore]);
  const { data: settings, isLoading } = useDoc<SiteSettings>(settingsRef);

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
          {isLoading ? <p>Loading contact info...</p> : settings && (
            <>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <Mail className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Email</h3>
                  <p className="text-muted-foreground">
                    Drop a line for project inquiries, collaborations, or questions.
                  </p>
                  <a href={`mailto:${settings.email}`} className="mt-1 block text-accent hover:underline">
                    {settings.email}
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
                  <a href={`tel:${settings.phone}`} className="mt-1 block text-accent hover:underline">
                    {settings.phone}
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
                    {settings.location}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="rounded-lg border bg-card p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
