export const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
export const addDays = (dateString, amount) => {
  const d = new Date(`${dateString || todayKey()}T12:00:00`);
  d.setDate(d.getDate() + amount);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
export const isOverdue = task => !task.completed && !!task.dueDate && task.dueDate < todayKey();
export const formatDate = date => date ? new Date(`${date}T12:00:00`).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}) : 'No deadline';
export const safeRead = (key, fallback) => {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch { return fallback; }
};
export const makeId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
export function makeSampleTasks() {
  const today = todayKey();
  return [
    {id:makeId(),isSample:true,title:'Finish portfolio project',description:'Polish the dashboard and write a short project README.',category:'Development',priority:'High',dueDate:today,completed:false,createdAt:new Date().toISOString(),completedAt:null,postponedCount:0,recurrence:'None',subtasks:[{id:makeId(),title:'Review responsive layout',completed:false},{id:makeId(),title:'Write README',completed:false}]},
    {id:makeId(),isSample:true,title:'Practice React fundamentals',description:'Review state, props, and reusable components.',category:'Learning',priority:'Medium',dueDate:addDays(today,1),completed:false,createdAt:new Date().toISOString(),completedAt:null,postponedCount:0,recurrence:'None',subtasks:[]},
    {id:makeId(),isSample:true,title:'Update job application tracker',description:'Check application statuses and prepare follow-ups.',category:'Career',priority:'High',dueDate:addDays(today,-2),completed:false,createdAt:new Date().toISOString(),completedAt:null,postponedCount:2,recurrence:'None',subtasks:[]},
    {id:makeId(),isSample:true,title:'Organize study notes',description:'Group notes into clear topics for revision.',category:'Personal',priority:'Low',dueDate:addDays(today,3),completed:true,createdAt:new Date().toISOString(),completedAt:new Date().toISOString(),postponedCount:0,recurrence:'None',subtasks:[]},
    {id:makeId(),isSample:true,title:'Plan the week',description:'Choose a realistic number of priorities for each day.',category:'Planning',priority:'Medium',dueDate:addDays(today,-1),completed:false,createdAt:new Date().toISOString(),completedAt:null,postponedCount:1,recurrence:'Weekly',subtasks:[]}
  ];
}
export function recoverySuggestions(tasks, dailyLimit=3) {
  const open = tasks.filter(t => !t.completed && isOverdue(t)).sort((a,b) => ({High:0,Medium:1,Low:2}[a.priority] - {High:0,Medium:1,Low:2}[b.priority]) || a.dueDate.localeCompare(b.dueDate));
  const plan = {};
  open.forEach((task,index) => {
    const dayOffset = Math.floor(index / Math.max(1,dailyLimit));
    const date = addDays(todayKey(), dayOffset);
    (plan[date] ||= []).push(task);
  });
  return {overdue:open, plan};
}
export function nextRecurringDate(date, recurrence) {
  if (!date || recurrence === 'None') return date;
  const d = new Date(`${date}T12:00:00`);
  if (recurrence === 'Daily') d.setDate(d.getDate()+1);
  if (recurrence === 'Weekly') d.setDate(d.getDate()+7);
  if (recurrence === 'Monthly') d.setMonth(d.getMonth()+1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
