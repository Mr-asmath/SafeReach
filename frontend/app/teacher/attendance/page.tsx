'use client';

import { useState } from 'react';
import { travelStatusClass, travelStatusIcon, travelStatusLabel, useStudentTravelState } from '@/lib/studentTravel';

type AttendanceStatus = 'present' | 'absent' | 'late' | 'reached_school';

const btnCls = (cur: AttendanceStatus, tgt: AttendanceStatus) => {
  const base = 'px-3 py-1 rounded-lg text-label-sm font-bold transition-all border ';
  if (cur === tgt) {
    if (tgt === 'present') return base + 'bg-green-500 text-white border-green-500';
    if (tgt === 'absent') return base + 'bg-error text-white border-error';
    if (tgt === 'reached_school') return base + 'bg-blue-500 text-white border-blue-500';
    return base + 'bg-yellow-400 text-white border-yellow-400';
  }
  return base + 'bg-surface-container text-on-surface-variant border-outline-variant hover:bg-surface-container-high';
};

export default function TeacherAttendancePage() {
  const { classStudents, counts, smsLogs, actions } = useStudentTravelState();
  const [saved, setSaved] = useState(false);
  const [leaveIds, setLeaveIds] = useState<string[]>([]);
  const [leaveSaved, setLeaveSaved] = useState(false);
  const [lastSmsNotice, setLastSmsNotice] = useState('SMS will be sent automatically for teacher status updates.');

  function currentAttendance(studentId: string): AttendanceStatus {
    const student = classStudents.find(item => item.id === studentId);
    if (student?.attendance === 'absent') return 'absent';
    if (student?.attendance === 'late') return 'late';
    if (student?.status === 'reached_school') return 'reached_school';
    return 'present';
  }

  function mark(studentId: string, status: AttendanceStatus) {
    const student = classStudents.find(item => item.id === studentId);
    if (status === 'present') actions.markPresent(studentId);
    if (status === 'absent') actions.markAbsent(studentId);
    if (status === 'late') actions.markLate(studentId);
    if (status === 'reached_school') actions.markReachedSchool(studentId);
    if (student) {
      const label = status === 'reached_school' ? 'Reached School' : status.charAt(0).toUpperCase() + status.slice(1);
      setLastSmsNotice(`SMS sent to ${student.parentName} (${student.parentPhone}): ${student.name} - ${label}.`);
    }
    setSaved(false);
  }

  function markAll(status: AttendanceStatus) {
    classStudents.forEach(student => mark(student.id, status));
    setSaved(false);
  }

  function toggleLeave(studentId: string, checked: boolean) {
    setLeaveIds(current => checked ? [...current, studentId] : current.filter(id => id !== studentId));
    setLeaveSaved(false);
  }

  function submitLeave() {
    const selectedStudents = classStudents.filter(student => leaveIds.includes(student.id));
    actions.markLeavingSchool(leaveIds);
    setLastSmsNotice(`${selectedStudents.length} go-out SMS ${selectedStudents.length === 1 ? 'was' : 'were'} sent to parent phones.`);
    setLeaveIds([]);
    setLeaveSaved(true);
  }

  return (
    <div className="p-container-padding-mobile md:p-container-padding-desktop">
      <div className="flex flex-col md:flex-row gap-3 mb-stack-lg">
        <select className="bg-white border border-outline-variant rounded-lg px-4 py-2.5 text-label-md focus:ring-2 focus:ring-primary focus:outline-none flex-1">
          <option>Class 4-B - Morning Travel Attendance</option>
          <option>Class 4-B - Dismissal Travel Attendance</option>
        </select>
        <input type="date" defaultValue="2026-06-10" className="bg-white border border-outline-variant rounded-lg px-4 py-2.5 text-label-md focus:ring-2 focus:ring-primary focus:outline-none" />
        <select className="bg-white border border-outline-variant rounded-lg px-4 py-2.5 text-label-md focus:ring-2 focus:ring-primary focus:outline-none">
          <option>Morning Arrival</option>
          <option>Go Out Attendance</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-stack-lg">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center"><p className="font-headline-lg text-headline-lg text-blue-600">{counts.toSchool}</p><p className="text-label-md text-blue-700">To School</p></div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center"><p className="font-headline-lg text-headline-lg text-green-600">{counts.present}</p><p className="text-label-md text-green-700">Present</p></div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center"><p className="font-headline-lg text-headline-lg text-error">{counts.absent}</p><p className="text-label-md text-red-700">Absent</p></div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-center"><p className="font-headline-lg text-headline-lg text-yellow-600">{counts.goingHome}</p><p className="text-label-md text-yellow-700">Going Home</p></div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center"><p className="font-headline-lg text-headline-lg text-primary">{counts.reachedHome}</p><p className="text-label-md text-primary">Reached Home</p></div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-label-md text-on-surface-variant self-center">Mark All:</span>
        <button onClick={() => markAll('present')} className="px-4 py-1.5 rounded-lg text-label-md bg-green-500 text-white hover:bg-green-600 transition-colors">Present</button>
        <button onClick={() => markAll('absent')} className="px-4 py-1.5 rounded-lg text-label-md bg-error text-white hover:opacity-90">Absent</button>
        <button onClick={() => markAll('late')} className="px-4 py-1.5 rounded-lg text-label-md bg-yellow-400 text-white hover:bg-yellow-500">Late</button>
      </div>

      <section className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-stack-lg flex flex-col md:flex-row md:items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined">sms</span>
        </div>
        <div className="flex-1">
          <h2 className="font-headline-sm text-title-md text-blue-900">Parent SMS Enabled</h2>
          <p className="text-label-md text-blue-800">{lastSmsNotice}</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-white text-blue-700 text-label-sm font-bold border border-blue-200">Frontend demo only</span>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden mb-stack-lg">
        <div className="p-stack-md border-b border-outline-variant/30">
          <h2 className="font-headline-md text-headline-md text-primary">Morning Attendance and Travel Status</h2>
          <p className="text-label-md text-on-surface-variant">Present, Absent, Late, Reached School, and Go Out actions create parent SMS previews for families without smartphones.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px] text-left">
            <thead className="bg-surface-container-low text-label-md text-on-surface-variant">
              <tr>{['Roll', 'Student', 'Travel Status', 'Parent SMS / Reason', 'Attendance'].map(head => <th key={head} className="px-4 py-3 font-bold">{head}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {classStudents.map((student, idx) => (
                <tr key={student.id} className={idx % 2 !== 0 ? 'bg-surface-container/10' : ''}>
                  <td className="px-4 py-3 text-label-sm text-on-surface-variant">{student.roll}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-label-md shrink-0">{student.avatar}</div>
                      <div>
                        <p className="font-bold text-on-surface">{student.name}</p>
                        <p className="text-xs text-on-surface-variant">{student.className} - Section {student.section}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`${travelStatusClass(student.status)} px-3 py-1 rounded-full text-label-sm font-bold inline-flex items-center gap-1`}>
                      <span className="material-symbols-outlined text-[14px]">{travelStatusIcon(student.status)}</span>
                      {travelStatusLabel(student.status, 'teacher')}
                    </span>
                    <p className="text-xs text-on-surface-variant mt-1">{student.location}</p>
                  </td>
                  <td className="px-4 py-3 text-label-md">
                    {student.smsHistory?.[0] ? (
                      <div>
                        <p className="font-bold text-blue-700">SMS sent {student.smsHistory[0].sentAt}</p>
                        <p className="text-xs text-on-surface-variant max-w-xs truncate">{student.smsHistory[0].message}</p>
                        {student.absenceReason && <p className="text-xs text-green-700 font-bold mt-1">Reason: {student.absenceReason}</p>}
                        {student.absenceReasonRequested && !student.absenceReason && <p className="text-xs text-error font-bold mt-1">Absence reason pending.</p>}
                      </div>
                    ) : (
                      <span className="text-on-surface-variant">No SMS sent yet</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      <button title="Mark present and send parent SMS" onClick={() => mark(student.id, 'present')} className={btnCls(currentAttendance(student.id), 'present')}>P</button>
                      <button title="Mark absent and send parent SMS" onClick={() => mark(student.id, 'absent')} className={btnCls(currentAttendance(student.id), 'absent')}>A</button>
                      <button title="Mark late and send parent SMS" onClick={() => mark(student.id, 'late')} className={btnCls(currentAttendance(student.id), 'late')}>L</button>
                      <button title="Mark reached school and send parent SMS" onClick={() => mark(student.id, 'reached_school')} className={btnCls(currentAttendance(student.id), 'reached_school')}>R</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden mb-stack-lg">
        <div className="p-stack-md border-b border-outline-variant/30">
          <h2 className="font-headline-md text-headline-md text-primary">Recent Parent SMS Log</h2>
          <p className="text-label-md text-on-surface-variant">Frontend-only SMS records generated by teacher status updates.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-surface-container-low text-label-md text-on-surface-variant">
              <tr>{['Time', 'Student', 'Parent', 'Phone', 'SMS Message'].map(head => <th key={head} className="px-4 py-3 font-bold">{head}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {smsLogs.slice(0, 8).map(log => (
                <tr key={log.id}>
                  <td className="px-4 py-3 text-label-sm text-on-surface-variant">{log.sentAt}</td>
                  <td className="px-4 py-3 font-bold text-on-surface">{log.studentName}</td>
                  <td className="px-4 py-3 text-label-md">{log.parentName}</td>
                  <td className="px-4 py-3 text-label-md">{log.phone}</td>
                  <td className="px-4 py-3 text-label-md">{log.message}</td>
                </tr>
              ))}
              {smsLogs.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-on-surface-variant">No SMS records yet. Mark a student status to create the first parent SMS.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden mb-stack-lg">
        <div className="p-stack-md border-b border-outline-variant/30">
          <h2 className="font-headline-md text-headline-md text-primary">Go Out Attendance</h2>
          <p className="text-label-md text-on-surface-variant">Select students leaving school and submit. Parent cards will show Going Home and enable Reached Home confirmation.</p>
        </div>
        <div className="divide-y divide-outline-variant/20">
          {classStudents.map(student => (
            <label key={student.id} className="flex items-center gap-4 px-4 py-3 hover:bg-surface-container-low cursor-pointer">
              <input
                type="checkbox"
                checked={leaveIds.includes(student.id)}
                onChange={event => toggleLeave(student.id, event.target.checked)}
                className="w-5 h-5 rounded text-primary"
              />
              <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-label-md shrink-0">{student.avatar}</div>
              <div className="flex-1">
                <p className="font-bold text-on-surface">{student.name}</p>
                <p className="text-xs text-on-surface-variant">{student.parentName} - {student.parentPhone}</p>
              </div>
              <span className={`${travelStatusClass(student.status)} px-3 py-1 rounded-full text-label-sm font-bold`}>{travelStatusLabel(student.status, 'teacher')}</span>
            </label>
          ))}
        </div>
        <div className="p-stack-md flex justify-end gap-3 border-t border-outline-variant/30">
          {leaveSaved && <span className="flex items-center gap-1 text-green-600 text-label-md"><span className="material-symbols-outlined text-[18px]">check_circle</span>Go out attendance submitted.</span>}
          <button onClick={submitLeave} disabled={leaveIds.length === 0} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-label-md shadow-sm ${leaveIds.length > 0 ? 'bg-secondary text-on-secondary hover:opacity-90' : 'bg-surface-container text-on-surface-variant cursor-not-allowed'}`}>
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Submit Leave School
          </button>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        {saved && <span className="flex items-center gap-1 text-green-600 text-label-md"><span className="material-symbols-outlined text-[18px]">check_circle</span>Attendance saved successfully.</span>}
        <button onClick={() => setSaved(true)} className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md hover:bg-primary-container transition-colors shadow-sm"><span className="material-symbols-outlined text-[18px]">save</span>Submit Attendance</button>
      </div>
    </div>
  );
}
