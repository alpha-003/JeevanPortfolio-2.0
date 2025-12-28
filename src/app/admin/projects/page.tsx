'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { Project } from '@/lib/definitions';
import { collection } from 'firebase/firestore';

export default function AdminProjectsPage() {
  const firestore = useFirestore();
  const projectsQuery = useMemoFirebase(() => collection(firestore, 'portfolioProjects'), [firestore]);
  const { data: projects, isLoading } = useCollection<Project>(projectsQuery);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Manage your portfolio projects.</CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading projects...</p>}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt={project.title}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={project.imageUrl}
                    data-ai-hint={project.tags?.[0] || 'project'}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {project.tags?.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(new Date(project.dateCreated), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
