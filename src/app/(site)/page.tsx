import Image from 'next/image';
import { projects } from '@/lib/data';
import { ProjectCard3D } from '@/components/project-card-3d';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HomePage() {
  const heroBg = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <div className="flex flex-col">
      <section className="relative flex h-[60vh] min-h-[500px] w-full items-center justify-center overflow-hidden">
        {heroBg && (
           <Image
            src={heroBg.imageUrl}
            alt={heroBg.description}
            fill
            data-ai-hint={heroBg.imageHint}
            className="object-cover object-center"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center text-center text-white">
          <h1 className="font-headline text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Designing Dimensions
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300 md:text-xl">
            A creative journey through the realms of graphic design and 3D artistry.
            Explore a curated collection of projects that blend imagination with technical skill.
          </p>
          <div className="mt-8 flex gap-4">
            <Button size="lg" asChild>
              <Link href="#portfolio">View Work</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="portfolio" className="container py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Portfolio Showcase
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            From concept to creation, here are some of my favorite projects.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard3D key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
