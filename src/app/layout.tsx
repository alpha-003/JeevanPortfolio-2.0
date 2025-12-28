import { getDoc, doc, getFirestore } from 'firebase/firestore';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { FirebaseClientProvider, initializeFirebase } from '@/firebase';
import type { SeoSettings } from '@/lib/definitions';
import type { Metadata } from 'next';

// This function can be used in other layouts or pages that need SEO data.
async function getSeoMetadata(): Promise<Metadata> {
  try {
    const { firestore } = initializeFirebase();
    const seoRef = doc(firestore, 'settings', 'seo');
    const seoSnap = await getDoc(seoRef);

    if (seoSnap.exists()) {
      const seoData = seoSnap.data() as SeoSettings;
      return {
        title: {
          default: seoData.siteTitle || 'EditFlow Portfolio',
          template: `%s | ${seoData.siteTitle || 'EditFlow Portfolio'}`,
        },
        description: seoData.metaDescription,
        keywords: seoData.metaKeywords,
      };
    }
  } catch (error) {
    console.error("Failed to fetch SEO settings:", error);
    // Fallback metadata
    return {
      title: 'EditFlow Portfolio',
      description: 'Portfolio of a creative video editor and colorist.',
    };
  }

  // Fallback for when data doesn't exist
  return {
    title: 'EditFlow Portfolio',
    description: 'Portfolio of a creative video editor and colorist.',
    keywords: ['video editing', 'color grading', 'post-production', 'freelance', 'react', 'nextjs'],
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return await getSeoMetadata();
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
