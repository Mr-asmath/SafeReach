'use client';

import Link from 'next/link';

export default function AdminAccountPage() {
  return (
    <div className="p-container-padding-mobile md:p-container-padding-desktop space-y-stack-lg max-w-[1600px] mx-auto w-full">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-l-4 border-primary transition-transform hover:scale-[1.02]"><div className="flex justify-between items-start"><div><p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Total Students</p><h3 className="font-display-lg text-headline-lg font-bold text-primary">1,284</h3></div><span className="material-symbols-outlined text-primary-container p-2 bg-primary-fixed rounded-lg">group</span></div><p className="mt-2 text-label-sm text-secondary flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">trending_up</span>+12% from last term</p></div>
        <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-l-4 border-secondary transition-transform hover:scale-[1.02]"><div className="flex justify-between items-start"><div><p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Staff Members</p><h3 className="font-display-lg text-headline-lg font-bold text-primary">86</h3></div><span className="material-symbols-outlined text-secondary p-2 bg-secondary-container rounded-lg">badge</span></div><p className="mt-2 text-label-sm text-on-surface-variant">4 on leave today</p></div>
        <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-l-4 border-tertiary-container transition-transform hover:scale-[1.02]"><div className="flex justify-between items-start"><div><p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">System Health</p><h3 className="font-display-lg text-headline-lg font-bold text-primary">99.9%</h3></div><span className="material-symbols-outlined text-tertiary p-2 bg-tertiary-fixed rounded-lg" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span></div><p className="mt-2 text-label-sm text-secondary">All gateways active</p></div>
        <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-l-4 border-error transition-transform hover:scale-[1.02]"><div className="flex justify-between items-start"><div><p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Active Alerts</p><h3 className="font-display-lg text-headline-lg font-bold text-error">2</h3></div><span className="material-symbols-outlined text-error p-2 bg-error-container rounded-lg" style={{fontVariationSettings: "'FILL' 1"}}>warning</span></div><p className="mt-2 text-label-sm text-error font-bold">Requires immediate review</p></div>
      </section>
      <div className="bento-grid">
        <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="p-stack-md border-b border-surface-variant flex justify-between items-center">
            <h4 className="font-headline-md text-headline-md font-bold text-primary">System Activity Log</h4>
            <button className="text-primary font-label-md hover:underline">View All Logs</button>
          </div>
          <div className="divide-y divide-surface-variant max-h-[450px] overflow-y-auto custom-scrollbar">
            {[
              {icon:'login',bg:'bg-primary-fixed',color:'text-primary',text:'Admin <b>Sarah Jenkins</b> modified campus perimeter settings',time:'12 mins ago • Main Campus Server',tag:'Security',tagCls:'bg-secondary-container/20 text-on-secondary-container'},
              {icon:'update',bg:'bg-tertiary-fixed',color:'text-tertiary',text:'Bulk upload: <b>24 new staff records</b> processed',time:'45 mins ago • System Task',tag:'System',tagCls:'bg-surface-container-high text-on-surface-variant'},
              {icon:'no_accounts',bg:'bg-error-container',color:'text-error',text:'Unauthorized access attempt blocked from <b>IP 192.168.1.1</b>',time:'2 hours ago • Firewall Alert',tag:'Critical',tagCls:'bg-error-container text-on-error-container'},
              {icon:'mail',bg:'bg-secondary-fixed',color:'text-secondary',text:'Emergency broadcast system test completed successfully',time:'4 hours ago • Admin Dashboard',tag:'Communication',tagCls:'bg-secondary-container/20 text-on-secondary-container'},
            ].map((a,i)=>(
              <div key={i} className="p-stack-md flex items-center gap-4 hover:bg-surface-bright transition-colors">
                <div className={`h-10 w-10 ${a.bg} flex items-center justify-center rounded-full ${a.color}`}><span className="material-symbols-outlined">{a.icon}</span></div>
                <div className="flex-grow"><p className="font-label-md text-label-md text-on-surface" dangerouslySetInnerHTML={{__html:a.text}}></p><p className="text-label-sm text-outline">{a.time}</p></div>
                <span className={`px-2 py-1 text-label-sm rounded ${a.tagCls}`}>{a.tag}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="col-span-12 lg:col-span-4 space-y-gutter">
          <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] text-center">
            <div className="relative w-24 h-24 mx-auto mb-4"><img alt="Admin" className="rounded-full border-4 border-primary-container w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi0UwwwXCm3xF_smmKdR5td8HSvBteQUEPfOqiSOh5VxKNqZP5xkv0wJ-rQ6m3sjb8VttWwU1GTfAmVSQLLvhCssfFnn-HixvoAG7IRdYkFgQ27tT6HcR9m8qw8dXw93xN21FXXWuL-AotNKP2cRiTD8GA1lrciYGlOwsQ8B01Xzb_0ba1p5tZubGed6HvThXjV4ICtG1_pjdr1kezT2m5cJstd6eYsdWiax7T6ht9C7E5HZBUvAEvJF-SaimgIeMX5QpbNBraC-Xs" /><div className="absolute bottom-1 right-1 bg-secondary w-6 h-6 rounded-full border-2 border-surface flex items-center justify-center"><span className="material-symbols-outlined text-white text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span></div></div>
            <h5 className="font-headline-md text-headline-md font-bold text-primary">Dr. Robert Vance</h5>
            <p className="text-label-md text-outline mb-4">Super Administrator</p>
            <div className="flex justify-center gap-2 mb-6"><span className="px-3 py-1 bg-primary-container text-on-primary-container text-label-sm rounded-full">Level 5 Access</span><span className="px-3 py-1 bg-surface-container-high text-on-surface-variant text-label-sm rounded-full">HQ Office</span></div>
            <button className="w-full py-2 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary-container hover:text-white transition-all">Edit Account Profile</button>
          </div>
          <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <h4 className="font-label-md text-label-md font-bold text-on-surface mb-4 uppercase tracking-widest">Admin Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              {[['manage_accounts','User Access'],['shield','Security'],['history','Full Audit'],['settings_suggest','System Prefs']].map(([icon,label])=>(
                <Link key={label} href="#" className="flex flex-col items-center justify-center p-4 bg-surface-container hover:bg-primary-container hover:text-white rounded-xl transition-all group">
                  <span className="material-symbols-outlined text-[32px] mb-2 text-primary group-hover:text-white">{icon}</span>
                  <span className="font-label-sm text-center">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
      <section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-stack-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div><h4 className="font-headline-md text-headline-md font-bold text-primary">Live Campus Operations</h4><p className="text-body-md text-on-surface-variant">Real-time status of connected tracking devices and entrance points.</p></div>
          <div className="flex items-center gap-4"><div className="flex items-center gap-2"><span className="w-3 h-3 bg-secondary rounded-full animate-pulse"></span><span className="text-label-sm">Active Monitoring</span></div><button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold hover:shadow-lg transition-all">Refresh Network</button></div>
        </div>
        <div className="relative h-[300px] bg-surface-container-high rounded-xl overflow-hidden group">
          <img alt="Campus Map" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWvPf1W1wDul9m6eLzF3_lp8nIDat7CrExZMyUHV6TxYNIuVHYR6wYpBwmbXMeXf-iQF2e_1AJIo2bmWq-MqEq1BnZx2cp7kV90kF7qOhlwh4X_4jRULKCkdd1EwH1JuqVESgCSqjjLjtc_OYYVM0RtvTviKGuAWa1xV5fpLgeLqiUbXjycbsvjp1Jo2mUIkDa9Z-0ACE7YXRMY9ACOJmlZqRE6LTl6kusMSjlGOxXuHNHQTY6cxBYS3E7C2HUBX-I8XgveC2EZ8Uv" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
          <div className="absolute top-10 left-10 bg-white/90 backdrop-blur p-3 rounded-lg shadow-xl border border-primary/20"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>location_on</span><span className="font-bold text-primary">North Entrance</span></div><p className="text-label-sm">Status: High Traffic</p></div>
          <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur p-3 rounded-lg shadow-xl border border-primary/20"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>sensors</span><span className="font-bold text-primary">Gym Hub</span></div><p className="text-label-sm">Status: Operational</p></div>
        </div>
      </section>
    </div>
  );
}
