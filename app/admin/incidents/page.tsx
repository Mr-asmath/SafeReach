'use client';

import { useState } from 'react';

const incidents = [
  { id: 'INC-2025-001', date: 'May 28, 2025', student: 'Aryan Shah', grade: '10-A', type: 'Medical Emergency', severity: 'Critical', status: 'Open', handler: 'Dr. Meera Patel' },
  { id: 'INC-2025-002', date: 'May 27, 2025', student: 'Priya Nair', grade: '9-B', type: 'Bullying', severity: 'High', status: 'Under Review', handler: 'Mr. Rajan Kumar' },
  { id: 'INC-2025-003', date: 'May 26, 2025', student: 'Rohan Verma', grade: '8-C', type: 'Minor Injury', severity: 'Low', status: 'Resolved', handler: 'Nurse Sheetal' },
  { id: 'INC-2025-004', date: 'May 25, 2025', student: 'Sneha Reddy', grade: '11-A', type: 'Unauthorized Absence', severity: 'Medium', status: 'Resolved', handler: 'Ms. Anita Roy' },
  { id: 'INC-2025-005', date: 'May 24, 2025', student: 'Karan Mehta', grade: '7-B', type: 'Behavioural Issue', severity: 'Medium', status: 'Resolved', handler: 'Mr. David Lee' },
  { id: 'INC-2025-006', date: 'May 22, 2025', student: 'Aisha Begum', grade: '12-A', type: 'Medical Emergency', severity: 'High', status: 'Resolved', handler: 'Dr. Meera Patel' },
  { id: 'INC-2025-007', date: 'May 21, 2025', student: 'Dev Sharma', grade: '6-C', type: 'Property Damage', severity: 'Low', status: 'Open', handler: 'Mr. Rajan Kumar' },
];
const sevColor: Record<string,string> = { Critical:'bg-red-100 text-red-700', High:'bg-orange-100 text-orange-700', Medium:'bg-yellow-100 text-yellow-700', Low:'bg-green-100 text-green-700' };
const stColor: Record<string,string> = { Open:'bg-orange-100 text-orange-700', 'Under Review':'bg-blue-100 text-blue-700', Resolved:'bg-green-100 text-green-700' };

export default function AdminIncidentsPage() {
  const [search, setSearch] = useState('');
  const [sev, setSev] = useState('All');
  const [st, setSt] = useState('All');
  const filtered = incidents.filter(i => (i.student.toLowerCase().includes(search.toLowerCase()) || i.id.includes(search)) && (sev==='All'||i.severity===sev) && (st==='All'||i.status===st));
  return (
    <div className="p-container-padding-mobile md:p-container-padding-desktop">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-stack-lg gap-4">
        <div><h1 className="font-headline-lg text-headline-lg text-primary">Incident Logs</h1><p className="text-body-md text-on-surface-variant">Track and manage all reported safety incidents</p></div>
        <button className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-md hover:bg-primary-container transition-colors shadow-sm"><span className="material-symbols-outlined text-[18px]">add</span>Report New Incident</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-stack-lg">
        {[{l:'Total Incidents',v:'24',sub:'This academic year',icon:'folder_open',c:'text-primary',bg:'bg-primary/5 border-primary/20'},{l:'Open',v:'8',sub:'Requires action',icon:'pending',c:'text-orange-600',bg:'bg-orange-50 border-orange-100'},{l:'Resolved',v:'14',sub:'Closed this month',icon:'check_circle',c:'text-green-600',bg:'bg-green-50 border-green-100'},{l:'Critical',v:'2',sub:'Immediate attention',icon:'emergency',c:'text-error',bg:'bg-red-50 border-red-100'}].map(c=>(
          <div key={c.l} className={`${c.bg} p-stack-md rounded-xl border`}><div className="flex items-center justify-between mb-2"><p className="text-label-md text-on-surface-variant">{c.l}</p><span className={`material-symbols-outlined text-[20px] ${c.c}`}>{c.icon}</span></div><p className={`font-headline-md text-headline-md ${c.c}`}>{c.v}</p><p className="text-label-sm text-on-surface-variant mt-1">{c.sub}</p></div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-4 mb-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1"><span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span><input className="w-full pl-10 pr-4 py-2.5 bg-surface-container rounded-lg border border-outline-variant focus:border-primary focus:ring-0 text-body-md outline-none" placeholder="Search by student or incident ID..." value={search} onChange={e=>setSearch(e.target.value)} /></div>
        <select className="bg-surface-container border border-outline-variant rounded-lg px-4 py-2.5 text-label-md focus:ring-2 focus:ring-primary focus:outline-none" value={sev} onChange={e=>setSev(e.target.value)}><option value="All">All Severities</option>{['Critical','High','Medium','Low'].map(s=><option key={s}>{s}</option>)}</select>
        <select className="bg-surface-container border border-outline-variant rounded-lg px-4 py-2.5 text-label-md focus:ring-2 focus:ring-primary focus:outline-none" value={st} onChange={e=>setSt(e.target.value)}><option value="All">All Statuses</option>{['Open','Under Review','Resolved'].map(s=><option key={s}>{s}</option>)}</select>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-surface-container-low border-b border-outline-variant">{['Incident ID','Date','Student','Type','Severity','Status','Handler','Actions'].map(h=><th key={h} className="text-left px-4 py-3 font-label-md text-label-md text-on-surface-variant whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map((inc,idx)=>(
                <tr key={inc.id} className={`border-b border-outline-variant/30 hover:bg-surface-container/40 transition-colors ${idx%2!==0?'bg-surface-container/10':''}`}>
                  <td className="px-4 py-3 font-label-md text-primary font-bold whitespace-nowrap">{inc.id}</td>
                  <td className="px-4 py-3 text-body-md text-on-surface-variant whitespace-nowrap">{inc.date}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-label-sm shrink-0">{inc.student[0]}</div><div><p className="font-label-md text-label-md whitespace-nowrap">{inc.student}</p><p className="text-label-sm text-on-surface-variant">Grade {inc.grade}</p></div></div></td>
                  <td className="px-4 py-3 text-body-md whitespace-nowrap">{inc.type}</td>
                  <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-label-sm font-bold whitespace-nowrap ${sevColor[inc.severity]}`}>{inc.severity}</span></td>
                  <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-label-sm font-bold whitespace-nowrap ${stColor[inc.status]}`}>{inc.status}</span></td>
                  <td className="px-4 py-3 text-body-md text-on-surface-variant whitespace-nowrap">{inc.handler}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1"><button className="text-primary hover:bg-primary-container p-1.5 rounded-lg transition-colors" title="View"><span className="material-symbols-outlined text-[18px]">visibility</span></button><button className="text-secondary hover:bg-secondary/10 p-1.5 rounded-lg transition-colors" title="Edit"><span className="material-symbols-outlined text-[18px]">edit</span></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-outline-variant flex items-center justify-between">
          <p className="text-label-md text-on-surface-variant">Showing {filtered.length} of {incidents.length} incidents</p>
          <div className="flex gap-1.5"><button className="px-3 py-1.5 rounded-lg border border-outline-variant text-label-md hover:bg-surface-container">Prev</button><button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-label-md">1</button><button className="px-3 py-1.5 rounded-lg border border-outline-variant text-label-md hover:bg-surface-container">Next</button></div>
        </div>
      </div>
    </div>
  );
}
