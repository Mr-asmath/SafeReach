'use client';

import { useState } from 'react';

type DayStatus = 'present'|'absent'|'late'|'holiday'|'weekend'|'future';
const calendarData: Record<string,DayStatus> = {
  '2025-05-01':'present','2025-05-02':'present','2025-05-05':'present','2025-05-06':'present','2025-05-07':'late','2025-05-08':'present','2025-05-09':'present',
  '2025-05-12':'present','2025-05-13':'present','2025-05-14':'present','2025-05-15':'absent','2025-05-16':'present','2025-05-19':'holiday','2025-05-20':'present',
  '2025-05-21':'present','2025-05-22':'present','2025-05-23':'present',
  '2025-05-03':'weekend','2025-05-04':'weekend','2025-05-10':'weekend','2025-05-11':'weekend','2025-05-17':'weekend','2025-05-18':'weekend','2025-05-24':'weekend','2025-05-25':'weekend',
};
const styleCls: Record<DayStatus,string> = {
  present:'bg-green-100 text-green-700 font-bold',absent:'bg-red-100 text-red-700 font-bold ring-2 ring-red-300',late:'bg-yellow-100 text-yellow-700 font-bold',
  holiday:'bg-blue-100 text-blue-600',weekend:'bg-surface-container text-on-surface-variant',future:'bg-transparent text-on-surface-variant/30',
};
const absenceHistory = [
  {date:'May 15, 2025',child:'Aarav Mehta',reason:'Fever – Medical Certificate Submitted',status:'Excused'},
  {date:'Apr 28, 2025',child:'Diya Mehta',reason:'Family Event',status:'Approved'},
  {date:'Apr 3, 2025',child:'Aarav Mehta',reason:'Not Submitted',status:'Unexcused'},
];

export default function ParentAttendancePage() {
  const [selectedChild, setSelectedChild] = useState('Aarav Mehta');
  const daysInMay = Array.from({length:31},(_,i)=>i+1);
  const firstDay = new Date('2025-05-01').getDay();
  const present = Object.values(calendarData).filter(v=>v==='present').length;
  const absent = Object.values(calendarData).filter(v=>v==='absent').length;
  const late = Object.values(calendarData).filter(v=>v==='late').length;
  const total = present+absent+late;
  return (
    <div className="px-container-padding-mobile md:px-container-padding-desktop py-stack-lg space-y-stack-lg">
      <div className="flex items-center gap-3 mb-2">
        <select className="bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-label-md focus:ring-2 focus:ring-primary focus:outline-none" value={selectedChild} onChange={e=>setSelectedChild(e.target.value)}>
          <option>Aarav Mehta</option><option>Diya Mehta</option>
        </select>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[{label:'Present',value:present,c:'text-green-600',bg:'bg-green-50 border-green-100'},{label:'Absent',value:absent,c:'text-error',bg:'bg-red-50 border-red-100'},{label:'Late',value:late,c:'text-yellow-600',bg:'bg-yellow-50 border-yellow-100'},{label:'Rate',value:`${Math.round((present/total)*100)}%`,c:'text-primary',bg:'bg-primary/5 border-primary/20'}].map(s=>(
          <div key={s.label} className={`border rounded-xl p-3 text-center ${s.bg}`}><p className={`font-headline-md text-headline-md ${s.c}`}>{s.value}</p><p className="text-label-sm text-on-surface-variant">{s.label}</p></div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-stack-md">
        <div className="flex items-center justify-between mb-4"><h3 className="font-headline-md text-on-surface">May 2025</h3><div className="flex flex-wrap gap-2 text-label-sm">{[['bg-green-100 text-green-700','Present'],['bg-red-100 text-red-700','Absent'],['bg-yellow-100 text-yellow-700','Late'],['bg-blue-100 text-blue-600','Holiday']].map(([cls,lbl])=><span key={lbl} className={`px-2 py-0.5 rounded-full ${cls}`}>{lbl}</span>)}</div></div>
        <div className="grid grid-cols-7 gap-1 mb-1">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><div key={d} className="text-center text-label-sm text-on-surface-variant py-1">{d}</div>)}</div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({length:firstDay},(_,i)=><div key={`e${i}`} />)}
          {daysInMay.map(day=>{const key=`2025-05-${String(day).padStart(2,'0')}`;const status:DayStatus=calendarData[key]||(day>28?'future':'present');return <div key={day} className={`rounded-lg h-10 flex items-center justify-center text-label-md cursor-default ${styleCls[status]}`}>{day}</div>;})}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="px-4 py-3 border-b border-outline-variant"><h3 className="font-headline-md text-on-surface">Absence History</h3></div>
        <div className="divide-y divide-outline-variant/20">
          {absenceHistory.map((a,i)=>(
            <div key={i} className="px-4 py-3 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${a.status==='Unexcused'?'bg-red-100':'bg-green-100'}`}><span className={`material-symbols-outlined text-[18px] ${a.status==='Unexcused'?'text-error':'text-green-600'}`}>event_busy</span></div>
              <div className="flex-1 min-w-0"><p className="font-label-md text-label-md text-on-surface">{a.date} – {a.child}</p><p className="text-label-sm text-on-surface-variant truncate">{a.reason}</p></div>
              <span className={`px-2.5 py-1 rounded-full text-label-sm font-bold shrink-0 ${a.status==='Unexcused'?'bg-red-100 text-red-700':'bg-green-100 text-green-700'}`}>{a.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
