'use client';
import { SeoSettingsForm } from '@/components/seo-settings-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import type { SeoSettings } from '@/lib/definitions';
import { doc } from 'firebase/firestore';


export default function AdminSeoPage() {
    const firestore = useFirestore();
    const settingsRef = useMemoFirebase(() => doc(firestore, 'settings', 'seo'), [firestore]);
    const { data: settings, isLoading } = useDoc<SeoSettings>(settingsRef);

  return (
    <Card>
        <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>Manage global SEO settings for your website.</CardDescription>
        </CardHeader>
        <CardContent>
            {isLoading && <p>Loading SEO settings...</p>}
            {settings && <SeoSettingsForm settings={settings} />}
        </CardContent>
    </Card>
  );
}
