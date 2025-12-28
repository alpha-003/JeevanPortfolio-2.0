'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const ContactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message?: {
    type: 'success' | 'error';
    text: string;
  } | null;
};

export async function sendContactMessage(prevState: State, formData: FormData) {
  const validatedFields = ContactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: {
        type: 'error',
        text: 'Failed to send message. Please check your inputs.',
      },
    };
  }
  
  // Here you would typically send an email or save to a database.
  // For this demo, we'll just log it and simulate success.
  console.log('New message received:');
  console.log(validatedFields.data);

  // Revalidate the inbox page to show the new message in a real app
  // revalidatePath('/admin/inbox');

  return {
    errors: {},
    message: {
      type: 'success',
      text: 'Thank you for your message! I will get back to you soon.',
    },
  };
}
