'use client';

import { usePathname } from 'next/navigation';
import TeacherSidebar from '@/components/TeacherSidebar';

type ActiveItem = 'dashboard' | 'students' | 'attendance' | 'messages' | 'reports';

const itemMap: Record<string, ActiveItem> = {
  '/teacher/dashboard': 'dashboard',
  '/teacher/students': 'students',
  '/teacher/attendance': 'attendance',
  '/teacher/messages': 'messages',
  '/teacher/reports': 'reports',
};

const titleMap: Record<string, { title: string; sub: string }> = {
  '/teacher/dashboard': { title: 'Welcome, Sarah Jenkins', sub: 'Class 4-B Supervisor · Academic Year 2024–25' },
  '/teacher/students': { title: 'My Students', sub: 'Student records and live tracking status' },
  '/teacher/attendance': { title: 'Attendance', sub: 'Mark and track daily attendance' },
  '/teacher/messages': { title: 'Messages', sub: 'Communicate with parents and staff' },
  '/teacher/reports': { title: 'Reports', sub: 'File incidents and view class reports' },
};

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeItem: ActiveItem = itemMap[pathname] ?? 'dashboard';
  const { title, sub } = titleMap[pathname] ?? { title: 'Teacher Portal', sub: '' };

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <TeacherSidebar activeItem={activeItem} />
      <div className="md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex justify-between items-center h-16 px-container-padding-mobile md:px-container-padding-desktop bg-surface border-b border-outline-variant/30 shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-on-surface-variant">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div>
              <h2 className="font-headline-md text-headline-md text-primary leading-tight">{title}</h2>
              <p className="text-label-sm text-on-surface-variant hidden md:block">{sub}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:flex items-center gap-2 bg-surface-container rounded-full px-3 py-1.5 border border-outline-variant">
              <span className="material-symbols-outlined text-outline text-[18px]">search</span>
              <input className="bg-transparent focus:ring-0 border-none text-body-md w-36 outline-none" placeholder="Search..." />
            </div>
            <button className="relative h-9 w-9 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary-container shrink-0">
              <img alt="Teacher" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd1RNbZ24b_iQ3_FL57yS395rgZ_iD9C2SdErGHp_gkjLnLAitVvWoTTn6T3VJL-VlQYIlp7EEZId9MF4tahLWSeqot2YhPM_REtQz5zVSjnG0qQ5_T6CW86GKtb-7sFlfw1uRDn0m6W41RVZI8TjHEQyoayt7xLSkamLgDULlnUKeitN2QoVlwfyn4No3nHQty7g70eWPuMQCNWFboad27ZSPcqOoXncwKU1ZzcVMRJDtdfMx8hEJL4D55qi7gO2ak1rsos2pm_CA" />
            </div>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
