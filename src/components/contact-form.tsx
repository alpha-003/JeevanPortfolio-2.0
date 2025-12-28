'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';

import { useToast } from '@/hooks/use-toast';
import { sendContactMessage, type State } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export function ContactForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(sendContactMessage, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message?.type === 'success') {
      toast({
        title: 'Message Sent!',
        description: state.message.text,
      });
      formRef.current?.reset();
    } else if (state.message?.type === 'error' && state.message.text) {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: state.message.text,
      });
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={dispatch} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Your Name" required />
        {state.errors?.name && (
          <p className="text-sm text-destructive">{state.errors.name[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="your@email.com" required />
        {state.errors?.email && (
          <p className="text-sm text-destructive">{state.errors.email[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Your message..." required rows={6} />
        {state.errors?.message && (
          <p className="text-sm text-destructive">{state.errors.message[0]}</p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
