'use client';

export default function AdminDashboardPage() {
  return (
    <>
      <div className="p-container-padding-mobile md:p-container-padding-desktop">
        {/* Page Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-stack-lg gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary">System Overview</h1>
            <p className="text-body-md text-on-surface-variant">Live tracking and safety metrics for academic session 2024-25</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <select className="bg-white border border-outline-variant rounded-lg px-4 py-2 text-label-md focus:ring-2 focus:ring-primary focus:outline-none">
              <option>All Classes</option><option>Grade 10-A</option><option>Grade 9-B</option>
            </select>
            <select className="bg-white border border-outline-variant rounded-lg px-4 py-2 text-label-md focus:ring-2 focus:ring-primary focus:outline-none">
              <option>All Teachers</option><option>Mr. Anderson</option><option>Ms. Smith</option>
            </select>
            <input className="bg-white border border-outline-variant rounded-lg px-4 py-2 text-label-md focus:ring-2 focus:ring-primary focus:outline-none" type="date" />
          </div>
        </div>
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg">
          <div className="bg-white p-stack-md rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.12)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">groups</span>
            </div>
            <div><p className="text-label-md text-on-surface-variant">Total Students</p><p className="text-headline-md font-bold text-primary">2,480</p></div>
          </div>
          <div className="bg-white p-stack-md rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.12)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">directions_bus</span>
            </div>
            <div><p className="text-label-md text-on-surface-variant">On Route</p><p className="text-headline-md font-bold text-secondary">412</p></div>
          </div>
          <div className="bg-white p-stack-md rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.12)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-700">task_alt</span>
            </div>
            <div><p className="text-label-md text-on-surface-variant">Reached School</p><p className="text-headline-md font-bold text-green-700">1,892</p></div>
          </div>
          <div className="bg-white p-stack-md rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.12)] flex items-center gap-4 border-l-4 border-error">
            <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center">
              <span className="material-symbols-outlined text-error" style={{fontVariationSettings: "'FILL' 1"}}>emergency_home</span>
            </div>
            <div><p className="text-label-md text-on-surface-variant">Active Alerts</p><p className="text-headline-md font-bold text-error">03</p></div>
          </div>
        </div>
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.12)] overflow-hidden">
            <div className="p-stack-md border-b border-surface-container flex items-center justify-between">
              <h3 className="font-headline-md text-on-surface">Active Transit Map</h3>
              <span className="status-chip bg-secondary-container/20 text-secondary">42 Buses Active</span>
            </div>
            <div className="h-[400px] bg-surface-container relative">
              <img className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT52X1NLXNnVvOc9SuGIUaQizND1kWKhn5QHdQtbSbyOY3rhMJ_Tza5I25-UeoOZc2mcZ_aJ5CnbQ5Ruf7KyctA-XTjqFTHB7EL12ouWcZ35kcEAYGVuwsiZ0cayckG9_TtiOZbLwTNtzfiDBvlK3RR9-UCN4xZLhil6jH1rrFd2KyMn6NUhZ1f_yHaE-JoCsClgvFM3y4fy-64glnQPL9h3yuWmexZkzg6pgAEnVaiysGCP7B1l-QgnUOqOgKBoZoTbyIeyiQzr49" alt="Transit Map" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-stack-sm rounded-lg shadow-lg border border-outline-variant">
                <p className="text-label-sm font-bold text-primary mb-1">Live Feed</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
                  <span className="text-[10px] uppercase font-bold">Route 42: Delay Reported</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.12)] p-stack-md flex flex-col">
            <h3 className="font-headline-md text-on-surface mb-stack-lg">Attendance Status</h3>
            <div className="flex-1 flex flex-col justify-center gap-6">
              {[['At School','76%','bg-primary','text-primary'],['On Route','16%','bg-secondary','text-secondary'],['On Leave','6%','bg-tertiary','text-tertiary-fixed-dim'],['Absent/Alert','2%','bg-error','text-error']].map(([label,pct,bg,color])=>(
                <div key={label} className="space-y-2">
                  <div className="flex justify-between text-label-md"><span className="text-on-surface-variant">{label}</span><span className={`font-bold ${color}`}>{pct}</span></div>
                  <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden"><div className={`${bg} h-full rounded-full`} style={{width:pct}}></div></div>
                </div>
              ))}
            </div>
            <button className="mt-stack-lg w-full py-3 bg-surface-container-high text-primary font-bold rounded-lg hover:bg-surface-container-highest transition-colors">View Detailed Report</button>
          </div>
        </div>
        {/* Alerts Table */}
        <div className="mt-stack-lg bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.12)] overflow-hidden">
          <div className="p-stack-md border-b border-surface-container flex items-center justify-between">
            <h3 className="font-headline-md text-on-surface">Critical Safety Alerts</h3>
            <button className="text-primary font-bold text-label-md hover:underline">Mark all as seen</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant">
                  {['Student Name','Class','Alert Type','Timestamp','Status','Action'].map(h=><th key={h} className="p-4 text-label-md font-bold uppercase tracking-wider">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-4 flex items-center gap-3"><img alt="Student" className="w-10 h-10 rounded-full object-cover border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHI8f6W9UmjITDauOhfPyEalZNcvD4PxOpJ_mBcFpmqXTVEbD9v9WT1scMdoRjdB2vtZ-JwHiocntyXQT-cKk5V-S8m-V5_du9UWa9QSYr_pCWnSlyB2IvKShYKE75iXX3Evvmged28XZyHvd3p_gJJqIRB1dySH7Fh1oP-PG4TBerfH9bUJg6pzafcrEPb8EaTivgVZzCXT2cFxJsLXHZ8Lhc2DaGNdJhsz0gUziLTswFt7Pf2WsHhbm1EkzXdNm8mtgxGm-4y2h4" /><span className="text-body-md font-medium">Ethan Miller</span></td>
                  <td className="p-4 text-body-md">10-A</td>
                  <td className="p-4"><span className="flex items-center gap-1 text-error font-bold"><span className="material-symbols-outlined text-[18px]">location_off</span>Route Deviation</span></td>
                  <td className="p-4 text-on-surface-variant font-label-md">08:42 AM</td>
                  <td className="p-4"><span className="status-chip bg-error-container text-on-error-container">URGENT</span></td>
                  <td className="p-4"><button className="text-primary font-bold text-label-md px-3 py-1 border border-primary rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all">Verify</button></td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-4 flex items-center gap-3"><img alt="Student" className="w-10 h-10 rounded-full object-cover border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXIwnUm8U9YlaqlNBu7J6jm0zH7PFaHrOSkfeOhHLemNOp-Vu3GCOuNc7jXIw4zKjRxFhfJg_NbG3I2njZrny9zdIxfVHgH9oy00lv3iG0JYuWHb3P2ChQpiF99ZtOlsIkUp-ScVwlXh1eqYD0RBQUpYmLGOaW6pGCU9O_UQoR5ZbanlNb_aljLPrX20OztFRcOuvSUtqIQ8iwLxam4OYp_qoJ9i8hTuvjQHinK1auF82A1I3DIU_hUp3uA4Di-O96zLVQPUq4G4ek" /><span className="text-body-md font-medium">Sophia Chen</span></td>
                  <td className="p-4 text-body-md">9-B</td>
                  <td className="p-4"><span className="flex items-center gap-1 text-tertiary-fixed-dim font-bold"><span className="material-symbols-outlined text-[18px]">sensor_door</span>Unscheduled Exit</span></td>
                  <td className="p-4 text-on-surface-variant font-label-md">08:15 AM</td>
                  <td className="p-4"><span className="status-chip bg-tertiary-container/20 text-on-tertiary-container">FOLLOW-UP</span></td>
                  <td className="p-4"><button className="text-primary font-bold text-label-md px-3 py-1 border border-primary rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all">Verify</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:opacity-80 z-50">
        <span className="material-symbols-outlined text-[28px]" style={{fontVariationSettings: "'FILL' 1"}}>add</span>
      </button>
    </>
  );
}
