'use client';
import { ProjectCard3D } from '@/components/project-card-3d';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { Project } from '@/lib/definitions';
import { collection } from 'firebase/firestore';

export default function ProjectsPage() {
  const firestore = useFirestore();
  const projectsQuery = useMemoFirebase(
    () => collection(firestore, 'portfolioProjects'),
    [firestore]
  );
  const { data: projects, isLoading } = useCollection<Project>(projectsQuery);

  return (
    <div className="container py-16 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Portfolio Showcase
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          From commercials to short films, here are my projects. Each one is a story of creative collaboration.
        </p>
      </div>
      {isLoading && <div className="text-center">Loading projects...</div>}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <ProjectCard3D key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
