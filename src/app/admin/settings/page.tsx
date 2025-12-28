'use client';
import { SiteSettingsForm } from '@/components/site-settings-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import type { SiteSettings } from '@/lib/definitions';
import { doc } from 'firebase/firestore';


export default function AdminSettingsPage() {
    const firestore = useFirestore();
    const settingsRef = useMemoFirebase(() => doc(firestore, 'settings', 'site'), [firestore]);
    const { data: settings, isLoading } = useDoc<SiteSettings>(settingsRef);

  return (
    <Card>
        <CardHeader>
            <CardTitle>Site Settings</CardTitle>
            <CardDescription>Manage general site settings, contact information, and social media links.</CardDescription>
        </CardHeader>
        <CardContent>
            {isLoading && <p>Loading settings...</p>}
            {settings && <SiteSettingsForm settings={settings} />}
        </CardContent>
    </Card>
  );
}
