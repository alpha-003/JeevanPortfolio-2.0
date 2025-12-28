'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { initializeFirebase } from '@/firebase';
import {
  addDoc,
  deleteDoc,
  setDoc,
  collection,
  doc,
} from 'firebase/firestore';

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
    imageUrl?: string[];
    seoDescription?: string[];
    siteTitle?: string[],
    metaDescription?: string[],
    metaKeywords?: string[],
    phone?: string[],
    location?: string[],
    socialLinks?: string[]
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

    await addDoc(messagesCollection, {
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
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
  tags: z.string().transform((str) => str.split(',').map((s) => s.trim())),
  videoUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
});

export async function saveProject(prevState: State, formData: FormData) {
  const validatedFields = ProjectSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
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
  const data = validatedFields.data;

  try {
    if (id) {
      // Update
      const projectRef = doc(firestore, 'portfolioProjects', id);
      await setDoc(projectRef, data, { merge: true });
    } else {
      // Create
      const projectsCollection = collection(firestore, 'portfolioProjects');
      await addDoc(projectsCollection, {
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
        await deleteDoc(doc(firestore, 'portfolioProjects', id));
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
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
  seoDescription: z.string().optional(),
  tags: z.string().transform((str) => str.split(',').map((s) => s.trim())),
});


export async function saveBlogPost(prevState: State, formData: FormData) {
  const validatedFields = BlogPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    author: formData.get('author'),
    imageUrl: formData.get('imageUrl'),
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
  };

  try {
    if (id) {
      const postRef = doc(firestore, 'blogPosts', id);
      await setDoc(postRef, data, { merge: true });
    } else {
      const postsCollection = collection(firestore, 'blogPosts');
      await addDoc(postsCollection, {
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
        await deleteDoc(doc(firestore, 'blogPosts', id));
        revalidatePath('/admin/blog');
        revalidatePath('/blog');
        revalidatePath('/');
        return { message: { type: 'success', text: 'Blog post deleted successfully.' } };
    } catch (error) {
        return { message: { type: 'error', text: 'Failed to delete blog post.' } };
    }
}


const SeoSettingsSchema = z.object({
  siteTitle: z.string().min(3, "Site title is required"),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().transform((str) => str.split(',').map((s) => s.trim())),
});

export async function saveSeoSettings(prevState: State, formData: FormData) {
  const validatedFields = SeoSettingsSchema.safeParse({
    siteTitle: formData.get('siteTitle'),
    metaDescription: formData.get('metaDescription'),
    metaKeywords: formData.get('metaKeywords'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: { type: 'error', text: 'Please check your SEO inputs.' },
    };
  }

  const { firestore } = initializeFirebase();
  const settingsRef = doc(firestore, 'settings', 'seo');

  try {
    await setDoc(settingsRef, validatedFields.data, { merge: true });
    revalidatePath('/');
    // Revalidate all pages for SEO changes to take effect
    ['/', '/about', '/blog', '/contact', '/projects'].forEach(path => revalidatePath(path));
    
    return { message: { type: 'success', text: 'SEO settings updated successfully.' } };
  } catch (error) {
    return { message: { type: 'error', text: 'Failed to save SEO settings.' } };
  }
}

const SocialLinkSchema = z.object({
  name: z.string(),
  url: z.string().url({ message: 'Please enter a valid URL.' }).or(z.literal('')),
});

const SiteSettingsSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  socialLinks: z.array(SocialLinkSchema),
});


export async function saveSiteSettings(prevState: State, formData: FormData) {
  const socialLinks: { name: string; url: string }[] = [];
  const entries = Array.from(formData.entries());

  const socialLinkNames = entries
    .filter(([key]) => key.startsWith('socialLinks[') && key.endsWith('][name]'))
    .map(([, value]) => value as string);
  
  const socialLinkUrls = entries
    .filter(([key]) => key.startsWith('socialLinks[') && key.endsWith('][url]'))
    .map(([, value]) => value as string);

  socialLinkNames.forEach((name, index) => {
    socialLinks.push({ name, url: socialLinkUrls[index] || '' });
  });

  const validatedFields = SiteSettingsSchema.safeParse({
    email: formData.get('email'),
    phone: formData.get('phone'),
    location: formData.get('location'),
    socialLinks: socialLinks,
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    // The socialLinks error is nested, so we need to check if any of its children have errors.
    const socialLinkError = fieldErrors.socialLinks ? 'Please enter valid URLs for social links.' : undefined;
    const errors = { ...fieldErrors, socialLinks: socialLinkError ? [socialLinkError] : undefined };

    return {
      errors: errors,
      message: { type: 'error', text: 'Please check your inputs.' },
    };
  }

  const { firestore } = initializeFirebase();
  const settingsRef = doc(firestore, 'settings', 'site');

  try {
    await setDoc(settingsRef, validatedFields.data, { merge: true });
    revalidatePath('/');
    // Revalidate other pages that might use this data
    revalidatePath('/contact');
    
    return { message: { type: 'success', text: 'Site settings updated successfully.' } };
  } catch (error) {
    console.error("Error saving site settings:", error);
    return { message: { type: 'error', text: 'Failed to save site settings.' } };
  }
}
