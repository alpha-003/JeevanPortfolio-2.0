'use client';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import type { BlogPost } from '@/lib/definitions';
import { doc } from 'firebase/firestore';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const firestore = useFirestore();
  
  const postRef = useMemoFirebase(() => doc(firestore, 'blogPosts', slug), [firestore, slug]);
  const { data: post, isLoading } = useDoc<BlogPost>(postRef);

  if (isLoading) {
    return <div className="container py-12 text-center">Loading post...</div>;
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-4xl py-12 md:py-20">
      <div className="space-y-4 text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight lg:text-5xl">
          {post.title}
        </h1>
        <p className="text-muted-foreground">
          Published on {format(new Date(post.datePublished), 'MMMM d, yyyy')} by {post.author}
        </p>
      </div>

      <div className="my-8 rounded-lg overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={1200}
          height={600}
          data-ai-hint={post.tags?.[0] || 'blog'}
          className="w-full object-cover"
        />
      </div>

      <div
        className="prose prose-invert mx-auto max-w-none prose-p:text-muted-foreground prose-headings:text-foreground prose-a:text-accent prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
