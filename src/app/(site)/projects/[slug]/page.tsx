'use client';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import type { Project } from '@/lib/definitions';
import { doc } from 'firebase/firestore';

const getYouTubeEmbedUrl = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length == 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return null;
}

const getVimeoEmbedUrl = (url: string) => {
    const regExp = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
    const match = url.match(regExp);
    if (match) {
        return `https://player.vimeo.com/video/${match[3]}`;
    }
    return null;
}

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

  let embedUrl = null;
  if(project.videoUrl) {
    embedUrl = getYouTubeEmbedUrl(project.videoUrl) || getVimeoEmbedUrl(project.videoUrl) || project.videoUrl;
  }

  return (
    <article className="container max-w-4xl py-12 md:py-20">
      <div className="space-y-4 text-center">
        <div className="flex justify-center gap-2">
            {project.tags?.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
        <h1 className="font-headline text-4xl font-extrabold tracking-tight lg:text-5xl">
          {project.title}
        </h1>
        <p className="text-muted-foreground">
          Completed on {format(new Date(project.dateCreated), 'MMMM d, yyyy')}
        </p>
      </div>

      {embedUrl ? (
        <div className="my-8 aspect-video w-full rounded-lg overflow-hidden">
            <iframe
            src={embedUrl}
            title={project.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            ></iframe>
        </div>
      ) : (
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
      )}

      <div
        className="prose prose-invert mx-auto max-w-none prose-p:text-muted-foreground prose-headings:text-foreground prose-a:text-accent prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: project.description }}
      />
    </article>
  );
}
