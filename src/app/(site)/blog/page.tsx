import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export const metadata = {
  title: 'Blog | EditFlow Portfolio',
  description: 'Thoughts and insights on video editing, color grading, and creative storytelling.',
};

export default function BlogPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          From the Edit Suite
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Thoughts, tutorials, and behind-the-scenes on video post-production.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
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
    </div>
  );
}
