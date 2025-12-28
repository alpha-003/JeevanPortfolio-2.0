import { notFound } from 'next/navigation';
import Image from 'next/image';
import { projects } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';
import { format } from 'date-fns';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | EditFlow Portfolio`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="container max-w-4xl py-12 md:py-20">
      <div className="space-y-4 text-center">
        <Badge variant="secondary">{project.category}</Badge>
        <h1 className="font-headline text-4xl font-extrabold tracking-tight lg:text-5xl">
          {project.title}
        </h1>
        <p className="text-muted-foreground">
          Completed on {format(new Date(project.publishedAt), 'MMMM d, yyyy')}
        </p>
      </div>

      <div className="my-8 rounded-lg overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={1200}
          height={675}
          data-ai-hint={project.imageHint}
          className="w-full object-cover"
        />
      </div>

      <div
        className="prose prose-invert mx-auto max-w-none prose-p:text-muted-foreground prose-headings:text-foreground prose-a:text-accent prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: project.longDescription }}
      />
    </article>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
