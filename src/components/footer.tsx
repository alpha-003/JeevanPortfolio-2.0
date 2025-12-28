'use client';
import { Github, Twitter, Dribbble } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import Logo from './logo';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import type { SiteSettings } from '@/lib/definitions';
import { doc } from 'firebase/firestore';

export function Footer() {
    const currentYear = new Date().getFullYear();
    const firestore = useFirestore();
    const settingsRef = useMemoFirebase(() => doc(firestore, 'settings', 'site'), [firestore]);
    const { data: settings } = useDoc<SiteSettings>(settingsRef);

    const socialLinks = settings?.socialLinks?.filter(link => link.url) || [];

    const navLinks = [
      { href: '/', label: 'Home' },
      { href: '/projects', label: 'Projects' },
      { href: '/about', label: 'About' },
      { href: '/blog', label: 'Blog' },
      { href: '/contact', label: 'Contact' },
    ];
    
    const iconMap: { [key: string]: React.ElementType } = {
        GitHub: Github,
        Twitter: Twitter,
        Dribbble: Dribbble,
    };

    return (
        <footer className="border-t border-border/40 bg-card/20">
            <div className="container py-12">
              <div className="grid gap-8 md:grid-cols-12">

                <div className="md:col-span-4">
                  <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Logo />
                    <span className="font-bold">EditFlow Portfolio</span>
                  </Link>
                  <p className="mt-4 text-sm text-muted-foreground">
                    A creative journey through the art of video post-production.
                  </p>
                </div>

                <div className="md:col-span-2">
                  <h3 className="font-semibold">Quick Links</h3>
                  <ul className="mt-4 space-y-2">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-2">
                  <h3 className="font-semibold">Connect</h3>
                  <ul className="mt-4 space-y-2">
                    {socialLinks.map((social) => (
                      <li key={social.name}>
                        <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                          {social.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-4">
                  <h3 className="font-semibold">Get in Touch</h3>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Have a project in mind? Let's talk.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/contact">Contact Me</Link>
                  </Button>
                </div>

              </div>

              <div className="mt-12 border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-center text-sm text-muted-foreground md:text-left">
                    &copy; {currentYear} EditFlow Portfolio. All rights reserved.
                </p>
                <div className="flex items-center gap-2">
                    {socialLinks.map((social) => {
                       const Icon = iconMap[social.name];
                       return Icon ? (
                        <Button key={social.name} variant="ghost" size="icon" asChild>
                            <Link href={social.url} aria-label={social.name}>
                                <Icon className="h-4 w-4" />
                            </Link>
                        </Button>
                       ) : null;
                    })}
                </div>
              </div>
            </div>
        </footer>
    );
}
