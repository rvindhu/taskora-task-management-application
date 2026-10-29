import React from 'react';
import { LayoutDashboard, ListTodo, CalendarDays, CalendarRange, CheckCircle2, RefreshCw, Settings, PanelLeftClose, PanelLeftOpen, CheckCheck, X } from 'lucide-react';
export const NAV_ITEMS=[
  {id:'Dashboard',label:'Dashboard',icon:LayoutDashboard},
  {id:'My Tasks',label:'My Tasks',icon:ListTodo},
  {id:'Today',label:'Today',icon:CalendarDays},
  {id:'Upcoming',label:'Upcoming',icon:CalendarRange},
  {id:'Completed',label:'Completed',icon:CheckCircle2},
  {id:'Recovery Center',label:'Recovery Center',icon:RefreshCw,recovery:true},
  {id:'Settings',label:'Settings',icon:Settings}
];
export default function Sidebar({page,setPage,collapsed,setCollapsed,counts,mobileOpen,setMobileOpen}) {
  return <><div className={`sidebar-scrim ${mobileOpen?'visible':''}`} onClick={()=>setMobileOpen(false)}></div><aside className={`sidebar ${collapsed?'collapsed':''} ${mobileOpen?'mobile-open':''}`}>
    <div className="brand-row"><div className="brand-mark"><CheckCheck size={21}/></div>{!collapsed&&<div className="brand-copy"><strong>taskora</strong><span>PLAN WITH PURPOSE</span></div>}<button className="icon-button sidebar-collapse" onClick={()=>setCollapsed(!collapsed)} aria-label={collapsed?'Expand sidebar':'Collapse sidebar'}>{collapsed?<PanelLeftOpen size={17}/>:<PanelLeftClose size={17}/>}</button><button className="icon-button mobile-close" onClick={()=>setMobileOpen(false)} aria-label="Close menu"><X size={18}/></button></div>
    <div className="nav-caption">WORKSPACE</div><nav className="side-nav" aria-label="Main navigation">{NAV_ITEMS.map(item=>{const Icon=item.icon;return <button key={item.id} className={`nav-item ${page===item.id?'active':''}`} onClick={()=>{setPage(item.id);setMobileOpen(false)}} title={collapsed?item.label:undefined}><Icon size={19}/>{!collapsed&&<span>{item.label}</span>}{!collapsed&&item.recovery&&counts.overdue>0&&<span className="nav-count">{counts.overdue}</span>}</button>})}</nav>
    {!collapsed&&<div className="sidebar-bottom"><div className="sidebar-note"><div className="note-icon"><RefreshCw size={17}/></div><strong>Plans change. That's okay.</strong><p>Small steps can bring a missed task back on track.</p><button onClick={()=>{setPage('Recovery Center');setMobileOpen(false)}}>Open recovery <span>↗</span></button></div><div className="sidebar-foot"><span className="online-dot"></span> Your work stays on this device</div></div>}
  </aside></>;
}
