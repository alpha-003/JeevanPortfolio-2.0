'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { initializeFirebase } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';

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

  try {
    const { firestore } = initializeFirebase();
    const messagesCollection = collection(firestore, 'contactMessages');
    
    await addDocumentNonBlocking(messagesCollection, {
      ...validatedFields.data,
      dateReceived: new Date().toISOString(),
      isReplied: false,
    });
    
    revalidatePath('/admin/inbox');

    return {
      errors: {},
      message: {
        type: 'success',
        text: 'Thank you for your message! I will get back to you soon.',
      },
    };
  } catch (error) {
    console.error('Error saving message to Firestore:', error);
    return {
      errors: {},
      message: {
        type: 'error',
        text: 'An unexpected error occurred. Please try again.',
      },
    };
  }
}
