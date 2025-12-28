import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export const metadata = {
  title: 'About | EditFlow Portfolio',
  description: 'Learn more about the creative mind behind EditFlow, a specialist in video editing and post-production.',
};

const skills = [
  'Video Editing (Premiere Pro, DaVinci Resolve, Final Cut Pro)',
  'Color Grading & Correction',
  'Motion Graphics (After Effects)',
  'Sound Design & Mixing',
  'Visual Effects (VFX) Compositing',
  'Storytelling & Pacing',
  'Drone Footage Editing',
  'Multi-cam Editing',
];

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-portrait');

  return (
    <div className="container max-w-6xl py-16 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          A Passion for Visual Storytelling
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Crafting compelling narratives, one frame at a time.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <h2 className="font-headline text-3xl font-semibold">My Philosophy</h2>
            <p className="text-muted-foreground">
              I believe that great video editing is invisible. It's about seamlessly weaving together shots, sounds, and colors to create an experience that captivates and moves the audience. My work is driven by a deep respect for the story, ensuring that every cut, transition, and effect serves the narrative. Every project is a unique puzzle, and I love finding the perfect rhythm and pace to bring it to life.
            </p>
            <p className="text-muted-foreground">
              From fast-paced commercials to emotive documentaries, I strive for technical excellence and creative innovation. Collaboration is at the heart of my process, and I enjoy working closely with directors and clients to translate their vision into a polished final product.
            </p>
          </div>
           <div className="space-y-3">
            <h2 className="font-headline text-3xl font-semibold">My Journey</h2>
            <p className="text-muted-foreground">
              My journey into video editing started with a simple camcorder and a love for movies. This passion led me to pursue a degree in film studies, where I discovered my fascination with the art of post-production. Over the past decade, I've honed my skills across a wide range of projects, from corporate videos and music videos to short films and social media content. Each project has been a learning experience, pushing me to become a more versatile and effective storyteller.
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
            <p className="text-sm font-semibold">Alex Chroma</p>
            <p className="text-xs text-muted-foreground">Video Editor & Colorist</p>
          </div>
        </div>
      </div>

      <div className="py-16 md:py-24">
        <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Core Skills & Expertise
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                A comprehensive post-production skillset.
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
