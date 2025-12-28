import { MetadataRoute } from 'next'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
import type { Project, BlogPost } from '@/lib/definitions';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: siteUrl, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
        { url: `${siteUrl}/projects`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
        { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    ];
    
    const projectsSnap = await getDocs(collection(firestore, 'portfolioProjects'));
    const projectsRoutes = projectsSnap.docs.map(docSnap => {
        const project = docSnap.data() as Project;
        return {
            url: `${siteUrl}/projects/${project.id}`,
            lastModified: new Date(project.dateCreated),
            changeFrequency: 'monthly' as 'monthly',
            priority: 0.6,
        };
    });

    const blogPostsSnap = await getDocs(collection(firestore, 'blogPosts'));
    const blogRoutes = blogPostsSnap.docs.map(docSnap => {
        const post = docSnap.data() as BlogPost;
        return {
            url: `${siteUrl}/blog/${post.id}`,
            lastModified: new Date(post.datePublished),
            changeFrequency: 'weekly' as 'weekly',
            priority: 0.7,
        };
    });

    return [...staticRoutes, ...projectsRoutes, ...blogRoutes];
}