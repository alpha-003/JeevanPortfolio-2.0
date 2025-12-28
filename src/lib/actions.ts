'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { initializeFirebase } from '@/firebase';
import {
  addDocumentNonBlocking,
  deleteDocumentNonBlocking,
  setDocumentNonBlocking,
} from '@/firebase/non-blocking-updates';
import { collection, doc } from 'firebase/firestore';

const ContactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type State = {
  errors?: {
    [key: string]: string[] | undefined;
    name?: string[];
    email?: string[];
    message?: string[];
    title?: string[];
    description?: string[];
    content?: string[];
    tags?: string[];
    videoUrl?: string[];
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

const ProjectSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  tags: z.string().transform((str) => str.split(',').map((s) => s.trim())),
  videoUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
});

export async function saveProject(prevState: State, formData: FormData) {
  const validatedFields = ProjectSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    tags: formData.get('tags'),
    videoUrl: formData.get('videoUrl'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: { type: 'error', text: 'Please check your inputs.' },
    };
  }

  const { firestore } = initializeFirebase();
  const id = formData.get('id') as string;
  const data = {
    ...validatedFields.data,
    imageUrl: 'https://picsum.photos/seed/project-placeholder/800/600', // Placeholder
  };

  try {
    if (id) {
      // Update
      const projectRef = doc(firestore, 'portfolioProjects', id);
      await setDocumentNonBlocking(projectRef, data, { merge: true });
    } else {
      // Create
      const projectsCollection = collection(firestore, 'portfolioProjects');
      await addDocumentNonBlocking(projectsCollection, {
        ...data,
        dateCreated: new Date().toISOString(),
      });
    }
    revalidatePath('/admin/projects');
    revalidatePath('/projects');
    revalidatePath('/');
    return { message: { type: 'success', text: `Project ${id ? 'updated' : 'created'} successfully.` } };
  } catch (error) {
    return { message: { type: 'error', text: 'Failed to save project.' } };
  }
}

export async function deleteProject(id: string) {
    if (!id) return { message: { type: 'error', text: 'Project ID is required.' } };
    const { firestore } = initializeFirebase();
    try {
        await deleteDocumentNonBlocking(doc(firestore, 'portfolioProjects', id));
        revalidatePath('/admin/projects');
        revalidatePath('/projects');
        revalidatePath('/');
        return { message: { type: 'success', text: 'Project deleted successfully.' } };
    } catch (error) {
        return { message: { type: 'error', text: 'Failed to delete project.' } };
    }
}


const BlogPostSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters.' }),
  author: z.string().min(2, { message: 'Author name is required.' }),
  seoDescription: z.string().optional(),
  tags: z.string().transform((str) => str.split(',').map((s) => s.trim())),
});


export async function saveBlogPost(prevState: State, formData: FormData) {
  const validatedFields = BlogPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    author: formData.get('author'),
    seoDescription: formData.get('seoDescription'),
    tags: formData.get('tags'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: { type: 'error', text: 'Please check your inputs.' },
    };
  }

  const { firestore } = initializeFirebase();
  const id = formData.get('id') as string;
  const data = {
    ...validatedFields.data,
    slug: validatedFields.data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
    imageUrl: 'https://picsum.photos/seed/blog-placeholder/800/400',
  };

  try {
    if (id) {
      const postRef = doc(firestore, 'blogPosts', id);
      await setDocumentNonBlocking(postRef, data, { merge: true });
    } else {
      const postsCollection = collection(firestore, 'blogPosts');
      await addDocumentNonBlocking(postsCollection, {
        ...data,
        datePublished: new Date().toISOString(),
      });
    }
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath('/');
    return { message: { type: 'success', text: `Blog post ${id ? 'updated' : 'created'} successfully.` } };
  } catch (error) {
    return { message: { type: 'error', text: 'Failed to save blog post.' } };
  }
}

export async function deleteBlogPost(id: string) {
    if (!id) return { message: { type: 'error', text: 'Blog post ID is required.' } };
    const { firestore } = initializeFirebase();
    try {
        await deleteDocumentNonBlocking(doc(firestore, 'blogPosts', id));
        revalidatePath('/admin/blog');
        revalidatePath('/blog');
        revalidatePath('/');
        return { message: { type: 'success', text: 'Blog post deleted successfully.' } };
    } catch (error) {
        return { message: { type: 'error', text: 'Failed to delete blog post.' } };
    }
}
