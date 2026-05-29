'use client';

export default function ParentDashboardPage() {
  return (
    <div className="px-container-padding-mobile md:px-container-padding-desktop py-stack-lg">
      <section className="mb-stack-lg">
        <h3 className="font-headline-lg text-headline-lg text-on-background mb-2">Welcome back, Sarah.</h3>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Your children are currently in safe zones. High-visibility tracking is active.</p>
      </section>
      <div className="bento-grid flex flex-col lg:grid lg:grid-cols-12">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {name:'Leo Thompson',grade:'Grade 3 • Room 204',status:'In Class',stCls:'bg-secondary/10 text-secondary',stIcon:'check_circle',borderColor:'bg-secondary',location:'Main Campus - Building A • 2 mins ago',action:'View Timeline',img:'https://lh3.googleusercontent.com/aida-public/AB6AXuDa6H4VKjTP9Imk43jnzcgwRNPyi4Q3r67a2Yj7Njd98OY8B_oyYeV1lL0aCpoRZbEaZlzGK2jwCWbNNvjbcyOG97ebUpFnUllaPdHNkGgPVp-HuzlHdqeDq7nwdUDVwm_KrepAmPLfWYfkvZVyPkx3c4QWi05hWcQVcr4hpBomLIxlXhejNwZHhCRLz-rGZFotvQAUQC-pYFo42BEyC6pQD_QOu95EW-cieydVwpwc2JXZeCYLDnu17lYdJvXZ5IOyzhR0MNL5IDuf',mapImg:'https://lh3.googleusercontent.com/aida-public/AB6AXuA9c9yqn5F2Bof-_difyeln3vFUIVnEhkP5rHZifGkGQl4Ts1dGqCgcKBEdEiSSSQF28u0AR7CgnzcmmMgz4ugTcM2v9fCdRHnT36LCNh2ryLgCZHK82qohGbpjTibytK9GP7Bqh-CT74mWmNREaHQzD1XZ6BTgC_ThIKqwudTXTmFcxoEKPVxFVomgiQszULGqOe-WSH6eQ9nk2lNLWOMJ7pI8jvUSXHEwjkUNgTIgljzFwH5eM1t0NPOaJdVRxnvau-DBNDLqez6L'},
            {name:'Maya Thompson',grade:'Grade 7 • Room 112',status:'In Transit',stCls:'bg-tertiary/10 text-tertiary-container',stIcon:'directions_bus',borderColor:'bg-tertiary-container',location:'School Bus #42 - 0.5 miles from home',action:'Notify Bus Driver',img:'https://lh3.googleusercontent.com/aida-public/AB6AXuAzMI5xibGtTtfMyXCma5Z_tDPNpXJf087we43gR-s_W3jSJT_hKhRCUULEXCsTu6K8qwtzt7f5HwZN2B2Bhemb9JV__w2-LPk3KYWDkYIBxuw5_Q2Xe7waW6scWjfbeDJ-BUVeRDbp4t0JL7EqSWBGD6kpQRfCnhUTVpvceQ7tyv9Kvb1nVjpV76XguJAKE6b9igBwnE-WzAYx0SmGeV2vw8jkiYHn2ykBJJYIfuyfYuiJwXeLD-65eUQFtNzM5iEk8mMqz0tBQlbB',mapImg:'https://lh3.googleusercontent.com/aida-public/AB6AXuAPXbEQ5m4gj7JMzpec7S3JXJftfMaTd3M5Dn03Ncip2eOVzZW3ygMrAFidvQbn5R9JPND2AFG2gkWrfaTa-H1t4likHMlyXeZTTJJdCUTjY0KCHG2SC_CBCocOl-TGnUYGhlHW_IVZ1J9eFC5I0rW9dLo5307kL_eFVfmCpRVv41jzKuIvIYFunKL95uDSqkbcqqesj9n7O4c5nBXJ_O71WM6f9pKiUEsQ4MxynlhB9taKMiiQJhxsCs037JkB9dmbNRW8O_oLU2Nq'},
          ].map((child,i)=>(
            <div key={i} className="glass-card rounded-xl p-stack-md flex flex-col gap-4 relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-1 h-full ${child.borderColor}`}></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-3"><img alt={child.name} className="w-14 h-14 rounded-full object-cover" src={child.img} /><div><h4 className="font-headline-md text-[18px] font-bold">{child.name}</h4><p className="text-label-sm text-on-surface-variant">{child.grade}</p></div></div><span className={`${child.stCls} px-3 py-1 rounded-full text-label-sm font-bold flex items-center gap-1`}><span className="material-symbols-outlined text-[14px]">{child.stIcon}</span>{child.status}</span></div>
              <div className="bg-surface-container rounded-lg p-3"><div className="flex items-center gap-2 mb-2"><span className="material-symbols-outlined text-primary text-[18px]">location_on</span><span className="text-label-md font-bold">Current Location</span></div><p className="text-label-sm text-on-surface-variant">{child.location}</p><div className="mt-2 h-24 rounded-md overflow-hidden relative"><img className="w-full h-full object-cover grayscale opacity-80" src={child.mapImg} alt="Map" /><div className="absolute inset-0 bg-primary/5"></div></div></div>
              <button className="w-full py-2 text-primary font-bold text-label-md border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">{child.action}</button>
            </div>
          ))}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-stack-md">
              <div className="flex items-center justify-between mb-4"><h4 className="text-headline-md text-[18px] font-bold">Billing &amp; Fees</h4><span className="material-symbols-outlined text-primary">payments</span></div>
              <div className="space-y-3"><div className="flex justify-between items-center"><span className="text-label-md text-on-surface-variant">Lunch Balance</span><span className="font-bold text-on-background">$42.50</span></div><div className="flex justify-between items-center"><span className="text-label-md text-on-surface-variant">Field Trip: Zoo</span><span className="font-bold text-error">Unpaid</span></div></div>
              <button className="w-full mt-4 py-2 bg-primary text-white font-bold rounded-lg text-label-md active:scale-95 transition-transform">Add Funds</button>
            </div>
            <div className="glass-card rounded-xl p-stack-md flex flex-col">
              <h4 className="text-headline-md text-[18px] font-bold mb-4">Quick Message</h4>
              <div className="flex-1 space-y-2 mb-4"><select className="w-full bg-surface-container border-none rounded-lg text-label-md py-2 px-3"><option>Select Teacher</option><option>Mr. Harrison (Math)</option><option>Ms. Clark (Science)</option></select><textarea className="w-full bg-surface-container border-none rounded-lg text-label-md py-2 px-3 h-20 resize-none focus:ring-primary" placeholder="Write a message..."></textarea></div>
              <button className="w-full py-2 bg-secondary text-white font-bold rounded-lg text-label-md flex items-center justify-center gap-2 hover:bg-on-secondary-container transition-colors"><span className="material-symbols-outlined text-[18px]">send</span>Send Message</button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-xl p-stack-md border-l-4 border-primary">
            <div className="flex items-center gap-2 mb-4"><span className="material-symbols-outlined text-primary">task_alt</span><h4 className="text-headline-md text-[18px] font-bold">Morning Checklist</h4></div>
            <div className="space-y-3">
              {[{text:'Lunch boxes packed',checked:false},{text:"Maya's gym kit",checked:false},{text:'ID cards check',checked:false},{text:'Signed permission slip',checked:true}].map((item,i)=>(
                <label key={i} className="flex items-center gap-3 p-2 hover:bg-surface-container rounded-lg transition-colors cursor-pointer group">
                  <input defaultChecked={item.checked} className="rounded text-primary focus:ring-primary w-5 h-5 border-outline-variant" type="checkbox" />
                  <span className={`text-label-md text-on-background group-hover:font-bold ${item.checked?'line-through text-on-surface-variant':''}`}>{item.text}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-xl p-stack-md">
            <h4 className="text-headline-md text-[18px] font-bold mb-4">Notification Feed</h4>
            <div className="space-y-4">
              {[{bg:'bg-primary/10',icon:'directions_bus',c:'text-primary',title:'Bus Arrival',msg:'Bus #42 has arrived at stop A-12.',time:'8:42 AM'},
                {bg:'bg-error/10',icon:'report',c:'text-error',title:'Security Alert',msg:'Scheduled drill at Main Campus at 11:00 AM.',time:'7:30 AM'},
                {bg:'bg-secondary/10',icon:'payments',c:'text-secondary',title:'New Invoice',msg:'Zoo field trip fees are now available for payment.',time:'Yesterday'},
              ].map((n,i)=>(
                <div key={i} className="flex gap-3"><div className={`w-8 h-8 ${n.bg} rounded-full flex items-center justify-center flex-shrink-0`}><span className={`material-symbols-outlined ${n.c} text-[18px]`}>{n.icon}</span></div><div><p className="text-label-md font-bold">{n.title}</p><p className="text-label-sm text-on-surface-variant">{n.msg}</p><p className="text-[10px] text-outline mt-1 uppercase tracking-widest">{n.time}</p></div></div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-primary font-bold text-label-sm border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">View All History</button>
          </div>
        </div>
      </div>
    </div>
  );
}
