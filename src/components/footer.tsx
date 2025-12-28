import { Github, Twitter, Dribbble } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'GitHub', icon: Github, url: '#' },
        { name: 'Twitter', icon: Twitter, url: '#' },
        { name: 'Dribbble', icon: Dribbble, url: '#' },
    ];

    return (
        <footer className="border-t border-border/40">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; {currentYear} 3D Portfolio X. All rights reserved.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {socialLinks.map((social) => (
                        <Button key={social.name} variant="ghost" size="icon" asChild>
                            <Link href={social.url} aria-label={social.name}>
                                <social.icon className="h-4 w-4" />
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
        </footer>
    );
}
