'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/definitions';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export function ProjectCard3D({ project }: { project: Project }) {
  return (
    <div className="group perspective">
      <Link href={`/projects/${project.id}`}>
        <Card className="relative h-full overflow-hidden bg-card transition-all duration-500 preserve-3d group-hover:shadow-2xl group-hover:shadow-accent/20 group-hover:-translate-y-2 group-hover:rotate-x-6 group-hover:-rotate-y-4">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={600}
            height={400}
            data-ai-hint={project.tags?.[0] || 'project'}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <CardHeader className="absolute bottom-0 p-4 md:p-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="w-fit">{tag}</Badge>
              ))}
            </div>
            <CardTitle className="font-headline text-xl font-bold text-white">
              {project.title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-300 line-clamp-2">
              {project.description}
            </CardDescription>
            <div className="mt-4 flex items-center text-sm font-semibold text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              View Project <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}
