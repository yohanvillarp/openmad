import { Outlet } from 'react-router';
import { Navbar } from '@widgets/navbar';
import { Footer } from '@widgets/footer';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface">
      <Navbar />
      <main className="flex-1 pt-16 flex flex-col items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
