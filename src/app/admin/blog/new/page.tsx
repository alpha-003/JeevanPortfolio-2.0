'use client';
import { BlogPostForm } from '@/components/blog-post-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function NewBlogPostPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Blog Post</CardTitle>
        <CardDescription>Write a new article for your audience.</CardDescription>
      </CardHeader>
      <CardContent>
        <BlogPostForm />
      </CardContent>
    </Card>
  );
}
