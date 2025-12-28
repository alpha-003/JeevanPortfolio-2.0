import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import type { Metadata } from 'next';
import { format } from 'date-fns';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | EditFlow Portfolio`,
    description: post.summary,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

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
          Published on {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
        </p>
      </div>

      <div className="my-8 rounded-lg overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={1200}
          height={600}
          data-ai-hint={post.imageHint}
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

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
