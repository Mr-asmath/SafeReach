'use client';

import { useState } from 'react';

const recentReports = [
  {id:'RPT-001',title:'Monthly Safety Summary – May 2025',type:'Safety',date:'May 28, 2025',status:'Published',author:'System Auto'},
  {id:'RPT-002',title:'Term 2 Attendance Analysis',type:'Attendance',date:'May 25, 2025',status:'Published',author:'Admin Priya'},
  {id:'RPT-003',title:'Incident Overview Q1 2025',type:'Incident',date:'May 20, 2025',status:'Draft',author:'Admin Priya'},
  {id:'RPT-004',title:'Staff Performance Review – April',type:'Staff',date:'May 10, 2025',status:'Published',author:'Admin Raj'},
  {id:'RPT-005',title:'Emergency Response Drill Log',type:'Safety',date:'May 5, 2025',status:'Published',author:'Admin Raj'},
];
const weekData = [65,78,82,70,88,75,90];
const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const incidentTypes = [
  {label:'Medical',count:8,pct:33,color:'bg-red-400'},{label:'Bullying',count:5,pct:21,color:'bg-orange-400'},
  {label:'Injury',count:6,pct:25,color:'bg-yellow-400'},{label:'Absence',count:3,pct:13,color:'bg-blue-400'},{label:'Other',count:2,pct:8,color:'bg-gray-300'},
];

export default function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState<'overview'|'incident'|'attendance'|'staff'>('overview');
  return (
    <div className="p-container-padding-mobile md:p-container-padding-desktop">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-stack-lg gap-4">
        <div><h1 className="font-headline-lg text-headline-lg text-primary">Safety Reports</h1><p className="text-body-md text-on-surface-variant">Analytics and reports for academic session 2024–25</p></div>
        <div className="flex gap-3">
          <select className="bg-white border border-outline-variant rounded-lg px-4 py-2 text-label-md focus:ring-2 focus:ring-primary focus:outline-none"><option>May 2025</option><option>April 2025</option><option>March 2025</option></select>
          <button className="flex items-center gap-2 bg-secondary text-on-secondary px-4 py-2 rounded-lg font-label-md hover:opacity-90 shadow-sm"><span className="material-symbols-outlined text-[18px]">download</span>Export PDF</button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-stack-lg">
        {[{label:'Reports Generated',value:'47',delta:'+12%',icon:'description',c:'text-primary',bg:'bg-primary/5 border-primary/20'},{label:'Avg Response Time',value:'2.4h',delta:'-18%',icon:'schedule',c:'text-green-600',bg:'bg-green-50 border-green-100'},{label:'Compliance Score',value:'94%',delta:'+3%',icon:'verified',c:'text-secondary',bg:'bg-secondary/5 border-secondary/20'},{label:'Pending Review',value:'5',delta:'-2',icon:'pending_actions',c:'text-orange-600',bg:'bg-orange-50 border-orange-100'}].map(c=>(
          <div key={c.label} className={`p-stack-md rounded-xl border ${c.bg}`}><div className="flex items-center justify-between mb-2"><p className="text-label-md text-on-surface-variant">{c.label}</p><span className={`material-symbols-outlined text-[20px] ${c.c}`}>{c.icon}</span></div><p className={`font-headline-md text-headline-md ${c.c}`}>{c.value}</p><p className="text-label-sm text-green-600 mt-1">{c.delta} vs last month</p></div>
        ))}
      </div>
      <div className="flex gap-1 mb-stack-lg bg-surface-container p-1 rounded-xl w-fit">
        {(['overview','incident','attendance','staff'] as const).map(tab=>(
          <button key={tab} onClick={()=>setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-label-md capitalize transition-all ${activeTab===tab?'bg-white text-primary font-bold shadow-sm':'text-on-surface-variant hover:text-on-surface'}`}>{tab==='incident'?'Incidents':tab.charAt(0).toUpperCase()+tab.slice(1)}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-stack-lg">
        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-stack-md lg:col-span-2">
          <div className="flex items-center justify-between mb-4"><div><h3 className="font-headline-md text-headline-md text-on-surface">Weekly Attendance Rate</h3><p className="text-label-md text-on-surface-variant">This week – School-wide</p></div><span className="text-headline-md font-bold text-green-600">78.9%</span></div>
          <div className="flex items-end gap-3 h-40">
            {weekData.map((v,i)=>(
              <div key={i} className="flex-1 flex flex-col items-center gap-1"><span className="text-label-sm text-on-surface-variant">{v}%</span><div className="w-full rounded-t-lg bg-primary/80" style={{height:`${v}%`}}></div><span className="text-label-sm text-on-surface-variant">{days[i]}</span></div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-stack-md">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-1">Incident Breakdown</h3>
          <p className="text-label-md text-on-surface-variant mb-4">By type – May 2025</p>
          <div className="space-y-3">
            {incidentTypes.map(t=>(
              <div key={t.label}><div className="flex justify-between text-label-md mb-1"><span>{t.label}</span><span className="text-on-surface-variant">{t.count} ({t.pct}%)</span></div><div className="w-full bg-surface-container rounded-full h-2"><div className={`${t.color} rounded-full h-2`} style={{width:`${t.pct}%`}}></div></div></div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="px-4 py-3 border-b border-outline-variant flex items-center justify-between"><h3 className="font-headline-md text-headline-md text-on-surface">Recent Reports</h3><button className="text-primary text-label-md hover:underline">View All</button></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-surface-container-low">{['Report ID','Title','Type','Date','Status','Author',''].map(h=><th key={h} className="text-left px-4 py-3 font-label-md text-label-md text-on-surface-variant">{h}</th>)}</tr></thead>
            <tbody>
              {recentReports.map((r,idx)=>(
                <tr key={r.id} className={`border-b border-outline-variant/20 hover:bg-surface-container/30 transition-colors ${idx%2!==0?'bg-surface-container/10':''}`}>
                  <td className="px-4 py-3 text-label-md text-primary font-bold">{r.id}</td>
                  <td className="px-4 py-3 text-body-md font-medium">{r.title}</td>
                  <td className="px-4 py-3"><span className="px-2.5 py-1 rounded-full text-label-sm bg-primary/10 text-primary font-bold">{r.type}</span></td>
                  <td className="px-4 py-3 text-body-md text-on-surface-variant whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-label-sm font-bold ${r.status==='Published'?'bg-green-100 text-green-700':'bg-yellow-100 text-yellow-700'}`}>{r.status}</span></td>
                  <td className="px-4 py-3 text-body-md text-on-surface-variant">{r.author}</td>
                  <td className="px-4 py-3"><div className="flex gap-1"><button className="text-primary hover:bg-primary-container p-1.5 rounded-lg"><span className="material-symbols-outlined text-[18px]">download</span></button><button className="text-secondary hover:bg-secondary/10 p-1.5 rounded-lg"><span className="material-symbols-outlined text-[18px]">open_in_new</span></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
