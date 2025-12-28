'use client';

import { useFormStatus } from 'react-dom';
import { useEffect, useRef, useActionState } from 'react';
import type { SeoSettings } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { saveSeoSettings, type State } from '@/lib/actions';
import { useRouter } from 'next/navigation';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save SEO Settings'}
    </Button>
  );
}

export function SeoSettingsForm({ settings }: { settings: SeoSettings }) {
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useActionState(saveSeoSettings, initialState);
  
  useEffect(() => {
    if (state.message?.type === 'success') {
      toast({ title: 'Success!', description: state.message.text });
      router.refresh();
    } else if (state.message?.type === 'error') {
      toast({ variant: 'destructive', title: 'Error!', description: state.message.text });
    }
  }, [state, toast, router]);

  return (
    <form ref={formRef} action={dispatch} className="space-y-6">
      
      <div className="space-y-2">
        <Label htmlFor="siteTitle">Site Title</Label>
        <Input id="siteTitle" name="siteTitle" defaultValue={settings?.siteTitle} required />
        <p className="text-xs text-muted-foreground">The title that appears in the browser tab.</p>
        {state.errors?.siteTitle && <p className="text-sm text-destructive">{state.errors.siteTitle[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea id="metaDescription" name="metaDescription" defaultValue={settings?.metaDescription} rows={3} />
         <p className="text-xs text-muted-foreground">A brief summary of your page for search engine results.</p>
        {state.errors?.metaDescription && <p className="text-sm text-destructive">{state.errors.metaDescription[0]}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="metaKeywords">Meta Keywords</Label>
        <Input id="metaKeywords" name="metaKeywords" defaultValue={settings?.metaKeywords?.join(', ')} />
        <p className="text-xs text-muted-foreground">Comma-separated keywords relevant to your site.</p>
        {state.errors?.metaKeywords && <p className="text-sm text-destructive">{state.errors.metaKeywords[0]}</p>}
      </div>

      <div className="flex justify-end gap-2">
        <SubmitButton />
      </div>
    </form>
  );
}
