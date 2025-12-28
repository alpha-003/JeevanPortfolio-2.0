import Image from 'next/image';
import { projects, blogPosts } from '@/lib/data';
import { ProjectCard3D } from '@/components/project-card-3d';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Film, Palette, WandSparkles, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { format } from 'date-fns';


const services = [
  {
    icon: Film,
    title: 'Post-Production & Editing',
    description: 'Crafting compelling narratives through precise editing, pacing, and storytelling.',
  },
  {
    icon: Palette,
    title: 'Color Grading & Correction',
    description: 'Enhancing the mood and tone of your footage with professional color treatment.',
  },
  {
    icon: WandSparkles,
    title: 'Motion Graphics & VFX',
    description: 'Adding a layer of polish and excitement with custom animations and visual effects.',
  },
]

export default function HomePage() {
  const heroBg = PlaceHolderImages.find(p => p.id === 'hero-background');
  const ctaBg = PlaceHolderImages.find(p => p.id === 'cta-background');
  const recentPosts = blogPosts.slice(0, 3);

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
            Crafting Stories, Frame by Frame
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300 md:text-xl">
            A passionate video editor dedicated to bringing creative visions to life through the art of post-production.
          </p>
          <div className="mt-8 flex gap-4">
            <Button size="lg" asChild>
              <Link href="/projects">View Work</Link>
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
            Featured Work
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            A look into some of my favorite editing and color grading projects.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0,3).map((project) => (
            <ProjectCard3D key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
                <Link href="/projects">
                    View All Projects <ArrowRight className="ml-2" />
                </Link>
            </Button>
        </div>
      </section>
      
      <section id="services" className="bg-card/20 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Post-Production Services
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Offering a range of services to bring your vision to the screen.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-bold">{service.title}</h3>
                <p className="mt-2 text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="container py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            From the Edit Suite
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            The latest thoughts, tutorials, and behind-the-scenes on video post-production.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {recentPosts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden">
            <Link href={`/blog/${post.slug}`} className="block">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={800}
                height={400}
                data-ai-hint={post.imageHint}
                className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <CardHeader>
              <CardTitle className="font-headline text-xl">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </p>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{post.summary}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" asChild>
                <Link href={`/blog/${post.slug}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
                <Link href="/blog">
                    Visit the Blog <ArrowRight className="ml-2" />
                </Link>
            </Button>
        </div>
      </section>

      <section className="relative py-20 md:py-32">
        {ctaBg && (
            <Image
                src={ctaBg.imageUrl}
                alt={ctaBg.description}
                fill
                data-ai-hint={ctaBg.imageHint}
                className="object-cover"
            />
        )}
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 container text-center text-primary-foreground">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Have a Project in Mind?
            </h2>
            <p className="mx-auto mt-2 max-w-2xl">
                Let's collaborate to create something extraordinary. I'm currently available for freelance work and new opportunities.
            </p>
            <div className="mt-8">
                <Button size="lg" variant="secondary" asChild>
                    <Link href="/contact">Start a Conversation</Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
