'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import type { BlogPost } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { saveBlogPost, type State } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

function SubmitButton({ isUpdate }: { isUpdate: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (isUpdate ? 'Updating...' : 'Publishing...') : (isUpdate ? 'Update Post' : 'Publish Post')}
    </Button>
  );
}

export function BlogPostForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useActionState(saveBlogPost, initialState);
  const { user } = useUser();

  useEffect(() => {
    if (state.message?.type === 'success') {
      toast({ title: 'Success!', description: state.message.text });
      router.push('/admin/blog');
    } else if (state.message?.type === 'error') {
      toast({ variant: 'destructive', title: 'Error!', description: state.message.text });
    }
  }, [state, toast, router]);

  return (
    <form ref={formRef} action={dispatch} className="space-y-6">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="author" value={user?.displayName || user?.email || 'Admin'} />

      <div className="space-y-2">
        <Label htmlFor="title">Post Title</Label>
        <Input id="title" name="title" defaultValue={post?.title} required />
        {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" defaultValue={post?.content} required rows={15} placeholder="Write your blog post here. You can use HTML."/>
        {state.errors?.content && <p className="text-sm text-destructive">{state.errors.content[0]}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" name="imageUrl" defaultValue={post?.imageUrl} placeholder="e.g., https://res.cloudinary.com/.../image.jpg" required />
        <p className="text-xs text-muted-foreground">Paste a link to the blog post's cover image.</p>
        {state.errors?.imageUrl && <p className="text-sm text-destructive">{state.errors.imageUrl[0]}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input id="tags" name="tags" defaultValue={post?.tags?.join(', ')} placeholder="e.g., tutorial, color grading, vfx" />
          <p className="text-xs text-muted-foreground">Separate tags with a comma.</p>
          {state.errors?.tags && <p className="text-sm text-destructive">{state.errors.tags[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="seoDescription">SEO Description</Label>
          <Input id="seoDescription" name="seoDescription" defaultValue={post?.seoDescription} placeholder="A short summary for search engines." />
          {state.errors?.seoDescription && <p className="text-sm text-destructive">{state.errors.seoDescription[0]}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
        <SubmitButton isUpdate={!!post} />
      </div>
    </form>
  );
}
