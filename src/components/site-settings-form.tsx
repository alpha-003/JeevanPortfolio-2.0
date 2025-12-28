'use client';

import { useFormStatus } from 'react-dom';
import { useEffect, useRef, useActionState, use } from 'react';
import type { SiteSettings } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { saveSiteSettings, type State } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { Github, Twitter, Dribbble } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save Settings'}
    </Button>
  );
}

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useActionState(saveSiteSettings, initialState);
  
  useEffect(() => {
    if (state.message?.type === 'success') {
      toast({ title: 'Success!', description: state.message.text });
      router.refresh();
    } else if (state.message?.type === 'error') {
      toast({ variant: 'destructive', title: 'Error!', description: state.message.text });
    }
  }, [state, toast, router]);

  const socialIcons: { [key: string]: React.ReactNode } = {
    GitHub: <Github className="mr-2 h-5 w-5 text-muted-foreground" />,
    Twitter: <Twitter className="mr-2 h-5 w-5 text-muted-foreground" />,
    Dribbble: <Dribbble className="mr-2 h-5 w-5 text-muted-foreground" />,
  };
  
  const socialLinks = settings?.socialLinks || [];

  return (
    <form ref={formRef} action={dispatch} className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" defaultValue={settings?.email} required />
                {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" defaultValue={settings?.phone} />
                 {state.errors?.phone && <p className="text-sm text-destructive">{state.errors.phone[0]}</p>}
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" defaultValue={settings?.location} />
            {state.errors?.location && <p className="text-sm text-destructive">{state.errors.location[0]}</p>}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Social Links</h3>
        <div className="space-y-4">
            {socialLinks.map((link, index) => (
                <div key={index} className="flex items-end gap-4">
                    <Input type="hidden" name={`socialLinks[${index}][name]`} value={link.name} />
                    <div className="flex-grow space-y-2">
                        <Label htmlFor={`social-url-${index}`} className="flex items-center">
                            {socialIcons[link.name] || <div className="mr-2 h-5 w-5"/>}
                            {link.name} URL
                        </Label>
                        <Input 
                            id={`social-url-${index}`}
                            name={`socialLinks[${index}][url]`} 
                            defaultValue={link.url}
                            placeholder={`https://...`}
                        />
                    </div>
                </div>
            ))}
        </div>
        {state.errors?.socialLinks && <p className="text-sm text-destructive">Please enter valid URLs for social links.</p>}
      </div>


      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
        <SubmitButton />
      </div>
    </form>
  );
}
