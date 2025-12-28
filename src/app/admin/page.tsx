'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, PenSquare, Mails, ArrowUpRight } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { Project, BlogPost, Message } from '@/lib/definitions';
import { collection } from 'firebase/firestore';

export default function AdminDashboardPage() {
  const firestore = useFirestore();

  const projectsQuery = useMemoFirebase(() => collection(firestore, 'portfolioProjects'), [firestore]);
  const { data: projects } = useCollection<Project>(projectsQuery);

  const blogPostsQuery = useMemoFirebase(() => collection(firestore, 'blogPosts'), [firestore]);
  const { data: blogPosts } = useCollection<BlogPost>(blogPostsQuery);

  const messagesQuery = useMemoFirebase(() => collection(firestore, 'contactMessages'), [firestore]);
  const { data: messages } = useCollection<Message>(messagesQuery);

  const unreadMessages = messages?.filter(m => m.isReplied === false).length || 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects?.length ?? 0}</div>
            <p className="text-xs text-muted-foreground">
              Number of projects in your portfolio
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Blog Posts
            </CardTitle>
            <PenSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPosts?.length ?? 0}</div>
            <p className="text-xs text-muted-foreground">
              Total articles published
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inbox</CardTitle>
            <Mails className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages?.length ?? 0}</div>
            <p className="text-xs text-muted-foreground">
              {unreadMessages > 0 ? `${unreadMessages} unread messages` : 'All messages read'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump right into managing your content.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Button asChild>
            <Link href="/admin/projects">Manage Projects</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/blog">Manage Blog</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/inbox">View Inbox</Link>
          </Button>
          <Button variant="outline" asChild>
             <Link href="/">
              View Live Site <ArrowUpRight className="ml-2 h-4 w-4" />
             </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
