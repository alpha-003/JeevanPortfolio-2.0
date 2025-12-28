'use client';

import { useParams } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { BlogPost } from '@/lib/definitions';
import { BlogPostForm } from '@/components/blog-post-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function EditBlogPostPage() {
  const params = useParams();
  const id = params.id as string;
  const firestore = useFirestore();

  const postRef = useMemoFirebase(() => doc(firestore, 'blogPosts', id), [firestore, id]);
  const { data: post, isLoading } = useDoc<BlogPost>(postRef);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Blog Post</CardTitle>
        <CardDescription>Update your article below.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading post...</p>}
        {post && <BlogPostForm post={post} />}
      </CardContent>
    </Card>
  );
}
