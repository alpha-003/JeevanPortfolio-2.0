'use client';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import type { Project } from '@/lib/definitions';
import { doc } from 'firebase/firestore';

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const firestore = useFirestore();

  const projectRef = useMemoFirebase(
    () => doc(firestore, 'portfolioProjects', slug),
    [firestore, slug]
  );
  const { data: project, isLoading } = useDoc<Project>(projectRef);

  if (isLoading) {
    return <div className="container py-12 text-center">Loading project...</div>;
  }

  if (!project) {
    notFound();
  }

  return (
    <article className="container max-w-4xl py-12 md:py-20">
      <div className="space-y-4 text-center">
        <Badge variant="secondary">{project.tags?.join(', ')}</Badge>
        <h1 className="font-headline text-4xl font-extrabold tracking-tight lg:text-5xl">
          {project.title}
        </h1>
        <p className="text-muted-foreground">
          Completed on {format(new Date(project.dateCreated), 'MMMM d, yyyy')}
        </p>
      </div>

      <div className="my-8 rounded-lg overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={1200}
          height={675}
          data-ai-hint={project.tags?.[0] || 'project'}
          className="w-full object-cover"
        />
      </div>

      <div
        className="prose prose-invert mx-auto max-w-none prose-p:text-muted-foreground prose-headings:text-foreground prose-a:text-accent prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: project.description }}
      />
    </article>
  );
}
