import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { LineChart } from 'lucide-react';

export default function AdminSeoPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <LineChart className="h-8 w-8 text-primary" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold">SEO Tools Under Construction</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        This section will house tools to help you optimize your portfolio's visibility on search engines. Features will include metadata management, sitemap generation, and keyword analysis. Stay tuned!
      </p>
    </div>
  );
}
