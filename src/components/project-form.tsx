'use client';

import { useFormStatus } from 'react-dom';
import { useEffect, useRef, useActionState } from 'react';
import type { Project } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { saveProject, type State } from '@/lib/actions';
import { useRouter } from 'next/navigation';

function SubmitButton({ isUpdate }: { isUpdate: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (isUpdate ? 'Updating...' : 'Creating...') : (isUpdate ? 'Update Project' : 'Create Project')}
    </Button>
  );
}

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useActionState(saveProject, initialState);
  
  useEffect(() => {
    if (state.message?.type === 'success') {
      toast({ title: 'Success!', description: state.message.text });
      router.push('/admin/projects');
    } else if (state.message?.type === 'error') {
      toast({ variant: 'destructive', title: 'Error!', description: state.message.text });
    }
  }, [state, toast, router]);

  return (
    <form ref={formRef} action={dispatch} className="space-y-6">
      {project && <input type="hidden" name="id" value={project.id} />}
      
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input id="title" name="title" defaultValue={project?.title} required />
        {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={project?.description} required rows={8} />
        {state.errors?.description && <p className="text-sm text-destructive">{state.errors.description[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input id="tags" name="tags" defaultValue={project?.tags?.join(', ')} placeholder="e.g., commercial, documentary, color grading" />
        <p className="text-xs text-muted-foreground">Separate tags with a comma.</p>
        {state.errors?.tags && <p className="text-sm text-destructive">{state.errors.tags[0]}</p>}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
        <SubmitButton isUpdate={!!project} />
      </div>
    </form>
  );
}
