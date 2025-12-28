import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export const metadata = {
  title: 'About | 3D Portfolio X',
  description: 'Learn more about the creative mind behind 3D Portfolio X, a specialist in graphic design and 3D art.',
};

const skills = [
  '3D Modeling (Blender, Cinema 4D, ZBrush)',
  'Texturing & Materials (Substance Painter, Octane)',
  'Rendering (V-Ray, Redshift, Keyshot)',
  'Motion Graphics (Houdini, After Effects)',
  'Architectural Visualization',
  'Product Visualization',
  'Character Design',
  'Environment Design',
];

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-portrait');

  return (
    <div className="container max-w-6xl py-16 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          A Fusion of Art and Technology
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Crafting digital experiences where creativity meets precision.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <h2 className="font-headline text-3xl font-semibold">My Philosophy</h2>
            <p className="text-muted-foreground">
              I believe that great design is not just about aesthetics; it's about telling a story and evoking emotion. My work is driven by a passion for pushing the boundaries of digital art, blending technical skill with a strong artistic vision. Every project is an opportunity to create something unique and memorable, a digital artifact that resonates with its audience.
            </p>
            <p className="text-muted-foreground">
              From the smallest detail in a product render to the grand scale of a virtual world, I strive for excellence and a deep understanding of the project's goals. Collaboration is key, and I enjoy working with clients to bring their ideas to life in ways that exceed their expectations.
            </p>
          </div>
           <div className="space-y-3">
            <h2 className="font-headline text-3xl font-semibold">My Journey</h2>
            <p className="text-muted-foreground">
              My journey into the world of 3D and design began over a decade ago, fueled by a fascination with video games and visual effects. This curiosity led me to pursue a formal education in graphic design, which I later combined with self-taught expertise in 3D software. Today, my portfolio is a testament to that journey—a diverse collection of projects spanning various industries, each with its own story and set of challenges.
            </p>
          </div>
        </div>
        <div className="relative">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              width={600}
              height={750}
              data-ai-hint={aboutImage.imageHint}
              className="rounded-lg object-cover"
            />
          )}
          <div className="absolute -bottom-4 -right-4 hidden rounded-lg border bg-card p-4 md:block">
            <p className="text-sm font-semibold">Alex Xenon</p>
            <p className="text-xs text-muted-foreground">3D Artist & Designer</p>
          </div>
        </div>
      </div>

      <div className="py-16 md:py-24">
        <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Core Skills & Expertise
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                A versatile skill set to tackle any creative challenge.
            </p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
            {skills.map((skill) => (
                <div key={skill} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{skill}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
