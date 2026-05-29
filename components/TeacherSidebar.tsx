'use client';

import Link from 'next/link';

type ActiveItem = 'dashboard' | 'students' | 'attendance' | 'messages' | 'reports';

interface TeacherSidebarProps {
  activeItem: ActiveItem;
}

const activeClass = 'bg-primary-container text-on-primary-container font-bold rounded-lg px-4 py-3 flex items-center gap-3 transition-all';
const inactiveClass = 'text-on-surface-variant hover:bg-surface-variant px-4 py-3 rounded-lg flex items-center gap-3 transition-all';

export default function TeacherSidebar({ activeItem }: TeacherSidebarProps) {
  return (
    <aside className="hidden md:flex flex-col h-full py-stack-lg px-stack-md bg-surface-container-low w-64 fixed left-0 top-0 z-40 border-r border-outline-variant">
      <div className="mb-8 flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[18px]">shield</span>
          </div>
          <h1 className="font-headline-md text-headline-md font-extrabold text-primary">GuardianTrack</h1>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant opacity-70 pl-10">Teacher Portal</p>
      </div>
      <nav className="flex-1 flex flex-col gap-1">
        <Link href="/teacher/dashboard" className={activeItem === 'dashboard' ? activeClass : inactiveClass}>
          <span className="material-symbols-outlined text-[20px]">dashboard</span>
          <span className="font-label-md text-label-md">Dashboard</span>
        </Link>
        <Link href="/teacher/students" className={activeItem === 'students' ? activeClass : inactiveClass}>
          <span className="material-symbols-outlined text-[20px]">school</span>
          <span className="font-label-md text-label-md">My Students</span>
        </Link>
        <Link href="/teacher/attendance" className={activeItem === 'attendance' ? activeClass : inactiveClass}>
          <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
          <span className="font-label-md text-label-md">Attendance</span>
        </Link>
        <Link href="/teacher/messages" className={activeItem === 'messages' ? activeClass : inactiveClass}>
          <span className="material-symbols-outlined text-[20px]">chat</span>
          <span className="font-label-md text-label-md">Messages</span>
        </Link>
        <Link href="/teacher/reports" className={activeItem === 'reports' ? activeClass : inactiveClass}>
          <span className="material-symbols-outlined text-[20px]">analytics</span>
          <span className="font-label-md text-label-md">Reports</span>
        </Link>
      </nav>
      <div className="mt-auto flex flex-col gap-3">
        <button className="bg-error text-on-error py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform hover:opacity-90">
          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>report</span>
          Emergency Alert
        </button>
        <div className="pt-4 border-t border-outline-variant flex flex-col gap-1">
          <Link href="#" className="text-on-surface-variant hover:bg-surface-variant px-4 py-2 rounded-lg flex items-center gap-3 transition-all">
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span className="font-label-md text-label-md">Help Center</span>
          </Link>
          <Link href="/" className="text-on-surface-variant hover:bg-surface-variant px-4 py-2 rounded-lg flex items-center gap-3 transition-all">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="font-label-md text-label-md">Sign Out</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
