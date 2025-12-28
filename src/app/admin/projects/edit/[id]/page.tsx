'use client';

import { useParams } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Project } from '@/lib/definitions';
import { ProjectForm } from '@/components/project-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function EditProjectPage() {
  const params = useParams();
  const id = params.id as string;
  const firestore = useFirestore();
  
  const projectRef = useMemoFirebase(() => doc(firestore, 'portfolioProjects', id), [firestore, id]);
  const { data: project, isLoading } = useDoc<Project>(projectRef);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Project</CardTitle>
        <CardDescription>Update the details for your project below.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading project details...</p>}
        {project && <ProjectForm project={project} />}
      </CardContent>
    </Card>
  );
}
