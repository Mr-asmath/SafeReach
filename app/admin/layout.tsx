'use client';

import { usePathname } from 'next/navigation';
import AdminTopNav from '@/components/AdminTopNav';
import AdminSidebar from '@/components/AdminSidebar';

type SidebarItem = 'analytics' | 'students' | 'teachers' | 'incident' | 'reports' | 'audit';
type NavPage = 'dashboard' | 'students' | 'teachers' | 'reports';

function getSidebar(p: string): SidebarItem {
  if (p.includes('/incidents')) return 'incident';
  if (p.includes('/reports')) return 'reports';
  if (p.includes('/account')) return 'audit';
  if (p.includes('/teachers')) return 'teachers';
  if (p.includes('/students')) return 'students';
  return 'analytics';
}

function getNav(p: string): NavPage {
  if (p.includes('/reports')) return 'reports';
  if (p.includes('/teachers')) return 'teachers';
  if (p.includes('/students')) return 'students';
  return 'dashboard';
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <AdminTopNav activePage={getNav(pathname)} />
      <div className="flex min-h-[calc(100vh-64px)]">
        <AdminSidebar activeItem={getSidebar(pathname)} />
        <div className="flex-1 lg:ml-64">
          {children}
        </div>
      </div>
    </div>
  );
}
