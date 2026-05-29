'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminStudentsPage() {
  const router = useRouter();
  return (
    <div className="p-gutter">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-stack-lg">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Student Directory</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Manage and track school enrollment in real-time.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-outline text-primary font-label-md rounded-lg hover:bg-surface-container-high transition-all">
            <span className="material-symbols-outlined text-[20px]">download</span>Download Template
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-on-secondary font-label-md rounded-lg hover:opacity-90 transition-all">
            <span className="material-symbols-outlined text-[20px]">upload_file</span>Upload Excel
          </button>
          <Link href="/admin/students/add" className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary font-label-md rounded-lg hover:opacity-90 transition-all shadow-md">
            <span className="material-symbols-outlined text-[20px]">person_add</span>Add Student
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg">
        <div className="glass-card p-stack-md rounded-xl"><div className="flex justify-between items-start mb-4"><div className="p-2 bg-primary-container/10 rounded-lg"><span className="material-symbols-outlined text-primary-container">groups</span></div><span className="text-label-sm font-label-sm text-on-surface-variant">+2.5%</span></div><p className="text-on-surface-variant font-label-md mb-1">Total Students</p><h3 className="text-display-lg font-display-lg text-primary leading-none">1,284</h3></div>
        <div className="glass-card p-stack-md rounded-xl border-l-4 border-l-secondary-container"><div className="flex justify-between items-start mb-4"><div className="p-2 bg-secondary-container/20 rounded-lg"><span className="material-symbols-outlined text-secondary">domain</span></div><span className="status-chip bg-secondary-container/20 text-secondary">92% present</span></div><p className="text-on-surface-variant font-label-md mb-1">At School</p><h3 className="text-display-lg font-display-lg text-primary leading-none">1,182</h3></div>
        <div className="glass-card p-stack-md rounded-xl border-l-4 border-l-tertiary-fixed"><div className="flex justify-between items-start mb-4"><div className="p-2 bg-tertiary-fixed/30 rounded-lg"><span className="material-symbols-outlined text-tertiary-container">directions_bus</span></div><span className="status-chip bg-tertiary-fixed/30 text-tertiary-container">8 Routes Active</span></div><p className="text-on-surface-variant font-label-md mb-1">In Transit</p><h3 className="text-display-lg font-display-lg text-primary leading-none">42</h3></div>
        <div className="glass-card p-stack-md rounded-xl border-l-4 border-l-error"><div className="flex justify-between items-start mb-4"><div className="p-2 bg-error-container/40 rounded-lg"><span className="material-symbols-outlined text-error">warning</span></div><span className="status-chip bg-error-container/40 text-error">Priority High</span></div><p className="text-on-surface-variant font-label-md mb-1">Alerts</p><h3 className="text-display-lg font-display-lg text-error leading-none">3</h3></div>
      </div>
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-stack-md border-b border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96"><span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span><input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary text-body-md font-body-md" placeholder="Search students by name, ID, or grade..." type="text" /></div>
          <div className="flex items-center gap-2"><button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined">filter_list</span></button><button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined">sort</span></button></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-high text-on-surface-variant font-label-md text-label-md">
              <tr>{['Student Name','Student ID','Grade/Section','Tracking Status','Guardian Contact','Last Activity','Action'].map(h=><th key={h} className="px-6 py-4 font-bold">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {[
                {name:'Sarah Jenkins',cls:'Class 5-B',id:'#ST-2024-001',grade:'5th Grade',status:'At School',statusCls:'bg-secondary-container/20 text-secondary',guardian:'Robert Jenkins',phone:'+1 (555) 0123-456',activity:'Arrived at 07:45 AM\nEntrance A-4',img:'https://lh3.googleusercontent.com/aida-public/AB6AXuB73TKLJyjm4mkyv7I4PrJ9mnFxgdkE8BRyUB-ITUiOJc1k0ihRfhK4fP9NguOToJ3mMkmC4HkQdufnsxctPg_UvHSP4XMl9MG_3J0GwmoKX10fwIMl75E0eNbUkyQTM1LsxPDjPnzNBmkUZJXB0YQlD7NFjqJW69sy4mtTslnLW3ZA4MXifkTv7vVJDKGa6g696BPkTKO-1E2fj21nHIEYyufkILJni87NLV2OY6bu80X3OYcOVPs4mV4y3kMJTQC-DRk8ufh5RXBW'},
                {name:'Marcus Thorne',cls:'Class 3-A',id:'#ST-2024-042',grade:'3rd Grade',status:'In Transit',statusCls:'bg-tertiary-fixed/30 text-tertiary-container',guardian:'Elena Thorne',phone:'+1 (555) 0987-654',activity:'Boarded Bus #4\n03:15 PM',img:'https://lh3.googleusercontent.com/aida-public/AB6AXuBBOfcmdDnYMgy4_gYaVvb2Y1Qth2evcFz_A5uBkdLWFM_Npm4UIgdWxNDgPuLrXQXcgUBdPn_jQG06jZHQHFt0pENq-6ztzu4tXHIoKHuulnFSe6BinsrI4NnKxR0fI3g3gG55k_ybjynIAcPyDK8h0YgrX14VfW7afEQJj1LTpH6GyJR6abqkEXd_pPke_w5GfdT_ZQcdOHnqVbM4ODWlRPmcs4RtDFZ7hj8yFGzx8B26YU-kpKocB1TpPHf-bWr2mPtbg3QIOiuz'},
                {name:'Leo Martinez',cls:'Class 4-C',id:'#ST-2024-118',grade:'4th Grade',status:'Absent',statusCls:'bg-error-container/40 text-error',guardian:'Maria Martinez',phone:'+1 (555) 1122-334',activity:'No check-in recorded\nToday',img:'https://lh3.googleusercontent.com/aida-public/AB6AXuBoTjfqHRB4yyENvgp31c3bbvRN5OsReUd4cRfVgynPSrppMzeenNDFZ7FhoQTjpXVIQqeKGOqoVPYfDoOEog62ODx9djfYl4PTQPAd'},
                {name:'Chloe Zhao',cls:'Class 2-A',id:'#ST-2024-089',grade:'2nd Grade',status:'At School',statusCls:'bg-secondary-container/20 text-secondary',guardian:'David Zhao',phone:'+1 (555) 4455-667',activity:'Class Check-in\n09:00 AM',img:'https://lh3.googleusercontent.com/aida-public/AB6AXuC6jeVPro3HcBnaYBKJGiF-SEFU0_Y7aoeXWn2dxPBSnmiPwiMHvK8n3NkGx7W76dfuC6nOKlOCWZgmik0ekuORvd_VciHMpoDG4jj8LkrvRBjC9Kdv9-v6OWFRPzAF7vT9IJtRZT4LpbUNkclt5pGE1jX8z7fCyVk9HaOf4m-Q_jopWeJodFbDjJIip18ujU58U23iJ0SXUUq3VZ4-7ThJDyDkJ4cvnVoBfsLWK26vdQR6G2qr9PrYqruZ83WO57_SqtiaImMZIDuG'},
              ].map((s,i)=>(
                <tr key={i} className="hover:bg-surface-container-low transition-colors group cursor-pointer" onClick={()=>router.push('/admin/students/profile')}>
                  <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high"><img alt={s.name} src={s.img} /></div><div><p className="font-bold text-primary">{s.name}</p><p className="text-xs text-on-surface-variant">{s.cls}</p></div></div></td>
                  <td className="px-6 py-4 font-label-md text-on-surface-variant">{s.id}</td>
                  <td className="px-6 py-4 text-on-surface">{s.grade}</td>
                  <td className="px-6 py-4"><span className={`status-chip ${s.statusCls}`}>{s.status}</span></td>
                  <td className="px-6 py-4 text-on-surface-variant"><p className="text-label-md font-bold text-on-surface">{s.guardian}</p><p className="text-xs">{s.phone}</p></td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant whitespace-pre-line">{s.activity}</td>
                  <td className="px-6 py-4"><button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">more_vert</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-outline-variant flex items-center justify-between">
          <p className="text-label-sm text-on-surface-variant">Showing 1 to 4 of 1,284 students</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50" disabled><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-label-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high font-label-sm">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-high font-label-sm">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-high"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
          </div>
        </div>
      </div>
      <footer className="mt-stack-lg flex flex-col sm:flex-row justify-between items-center text-label-sm text-on-surface-variant">
        <p>© 2024 GuardianTrack Pro. Security &amp; Safety First.</p>
        <div className="flex gap-4 mt-4 sm:mt-0"><a className="hover:text-primary" href="#">Terms</a><a className="hover:text-primary" href="#">Privacy</a><a className="hover:text-primary" href="#">Emergency Protocol</a></div>
      </footer>
    </div>
  );
}
