import { projects } from '@/lib/data';
import { ProjectCard3D } from '@/components/project-card-3d';

export const metadata = {
  title: 'Projects | EditFlow Portfolio',
  description: 'A curated collection of video editing projects that blend storytelling with technical skill.',
};

export default function ProjectsPage() {
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
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard3D key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
