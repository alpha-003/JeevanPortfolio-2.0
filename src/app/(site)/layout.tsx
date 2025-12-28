import { MainNav } from '@/components/main-nav';
import { Footer } from '@/components/footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
