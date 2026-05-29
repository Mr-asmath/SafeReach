'use client';

import { useState } from 'react';

const reports = [
  {id:'RPT-A-001',title:'Term 2 Progress Report – Aarav Mehta',child:'Aarav Mehta',type:'Academic',date:'May 25, 2025',grade:'B+',status:'Available'},
  {id:'RPT-D-001',title:'Term 2 Progress Report – Diya Mehta',child:'Diya Mehta',type:'Academic',date:'May 25, 2025',grade:'A',status:'Available'},
  {id:'RPT-A-002',title:'Safety & Wellbeing Report – May 2025',child:'Aarav Mehta',type:'Safety',date:'May 20, 2025',grade:'—',status:'Available'},
  {id:'RPT-A-003',title:'Term 1 Progress Report – Aarav Mehta',child:'Aarav Mehta',type:'Academic',date:'Jan 30, 2025',grade:'B',status:'Available'},
];
const subjects = [
  {name:'Mathematics',score:85,grade:'A',prev:72},{name:'Science',score:78,grade:'B+',prev:80},
  {name:'English',score:91,grade:'A+',prev:88},{name:'Social Studies',score:74,grade:'B',prev:71},{name:'Computer Science',score:88,grade:'A',prev:85},
];

export default function ParentReportsPage() {
  const [selectedChild, setSelectedChild] = useState('Aarav Mehta');
  const childReports = reports.filter(r=>r.child===selectedChild);
  return (
    <div className="px-container-padding-mobile md:px-container-padding-desktop py-stack-lg space-y-stack-lg">
      <div className="flex items-center gap-3 mb-2">
        <select className="bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-label-md focus:ring-2 focus:ring-primary focus:outline-none" value={selectedChild} onChange={e=>setSelectedChild(e.target.value)}>
          <option>Aarav Mehta</option><option>Diya Mehta</option>
        </select>
      </div>
      <div className="bg-gradient-to-r from-primary to-primary-container rounded-2xl p-stack-md text-on-primary">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div><h3 className="font-headline-md text-headline-md">Term 2 Performance</h3><p className="text-on-primary/80 text-body-md">{selectedChild} · Academic Year 2024–25</p></div>
          <div className="flex gap-6">{[['83%','Overall Score'],['B+','Grade'],['94%','Attendance']].map(([v,l])=><div key={l} className="text-center"><p className="font-headline-lg text-headline-lg">{v}</p><p className="text-on-primary/80 text-label-sm">{l}</p></div>)}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg">
        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-stack-md">
          <h3 className="font-headline-md text-on-surface mb-4">Subject Performance</h3>
          <div className="space-y-4">
            {subjects.map(s=>(
              <div key={s.name}><div className="flex items-center justify-between mb-1"><span className="text-label-md text-on-surface">{s.name}</span><div className="flex items-center gap-2"><span className="text-label-sm text-on-surface-variant">{s.prev}% →</span><span className={`font-bold text-label-md ${s.score>=s.prev?'text-green-600':'text-error'}`}>{s.score}%</span><span className="px-1.5 py-0.5 rounded text-label-sm font-bold bg-primary/10 text-primary">{s.grade}</span></div></div><div className="w-full bg-surface-container rounded-full h-2"><div className="bg-primary rounded-full h-2" style={{width:`${s.score}%`}}></div></div></div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
          <div className="px-4 py-3 border-b border-outline-variant"><h3 className="font-headline-md text-on-surface">Report Documents</h3></div>
          <div className="divide-y divide-outline-variant/20">
            {childReports.map(r=>(
              <div key={r.id} className="px-4 py-3 flex items-center gap-3 hover:bg-surface-container/30 transition-colors">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${r.type==='Safety'?'bg-secondary/10':'bg-primary/10'}`}><span className={`material-symbols-outlined text-[18px] ${r.type==='Safety'?'text-secondary':'text-primary'}`}>{r.type==='Safety'?'shield':'description'}</span></div>
                <div className="flex-1 min-w-0"><p className="font-label-md text-label-md text-on-surface truncate">{r.title}</p><p className="text-label-sm text-on-surface-variant">{r.date}</p></div>
                {r.grade!=='—'&&<span className="px-2 py-1 rounded-full text-label-sm font-bold bg-primary/10 text-primary shrink-0">{r.grade}</span>}
                <button className="flex items-center gap-1 text-primary hover:bg-primary-container px-2 py-1.5 rounded-lg transition-colors text-label-sm shrink-0"><span className="material-symbols-outlined text-[16px]">download</span>PDF</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-stack-md">
        <h3 className="font-headline-md text-on-surface mb-4">Teacher Remarks</h3>
        <div className="space-y-3">
          {[{teacher:'Mr. James Anderson',sub:'Mathematics',remark:`${selectedChild} has shown significant improvement this term. Very dedicated and participates actively in class.`},{teacher:'Ms. Kavitha Menon',sub:'Science',remark:'Good understanding of concepts. Needs to work on lab report writing skills.'},{teacher:'Ms. Priya Singh',sub:'English',remark:'Exceptional vocabulary and comprehension skills. Keep up the outstanding work!'}].map((r,i)=>(
            <div key={i} className="flex items-start gap-3 p-3 bg-surface-container/40 rounded-xl">
              <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-label-sm shrink-0">{r.teacher.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
              <div><div className="flex items-center gap-2 mb-1"><p className="font-label-md text-label-md font-bold text-on-surface">{r.teacher}</p><span className="text-label-sm text-on-surface-variant">· {r.sub}</span></div><p className="text-body-md text-on-surface-variant italic">&ldquo;{r.remark}&rdquo;</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
