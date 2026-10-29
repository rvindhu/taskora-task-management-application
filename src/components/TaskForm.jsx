import React from 'react';
import { useEffect, useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { makeId, todayKey } from '../utils/taskUtils.js';
const blank = () => ({title:'',description:'',category:'Personal',priority:'Medium',dueDate:todayKey(),recurrence:'None',subtasks:[]});
export default function TaskForm({task,onSave,onClose}) {
  const [form,setForm] = useState(blank);
  const [subtaskText,setSubtaskText] = useState('');
  const [error,setError] = useState('');
  useEffect(()=>{ if(task) setForm({...blank(),...task,subtasks:(task.subtasks||[]).map(s=>({...s}))}); else setForm(blank()); },[task]);
  const update=(key,value)=>setForm(prev=>({...prev,[key]:value}));
  const addSubtask=()=>{const title=subtaskText.trim();if(!title)return;update('subtasks',[...form.subtasks,{id:makeId(),title,completed:false}]);setSubtaskText('');};
  const submit=e=>{e.preventDefault();if(!form.title.trim()){setError('Please enter a task title.');return;}setError('');onSave({...form,title:form.title.trim(),description:form.description.trim()});};
  return <div className="modal-backdrop" role="presentation" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <section className="task-form dialog-card" role="dialog" aria-modal="true" aria-labelledby="task-form-title">
      <div className="form-heading"><div><span className="eyebrow">MAKE IT HAPPEN</span><h2 id="task-form-title">{task?'Edit task':'Create a task'}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close form"><X/></button></div>
      <form onSubmit={submit}>
        <label className="field-label">Task title <span className="required">*</span><input autoFocus value={form.title} onChange={e=>update('title',e.target.value)} placeholder="What would you like to get done?" maxLength={120} /></label>
        <label className="field-label">Description <span className="optional">Optional</span><textarea value={form.description} onChange={e=>update('description',e.target.value)} placeholder="Add a little context…" rows={3} maxLength={1000}/></label>
        <div className="form-grid">
          <label className="field-label">Due date<input type="date" value={form.dueDate||''} onChange={e=>update('dueDate',e.target.value)}/></label>
          <label className="field-label">Priority<select value={form.priority} onChange={e=>update('priority',e.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label>
          <label className="field-label">Category<select value={form.category} onChange={e=>update('category',e.target.value)}>{['Personal','Work','Development','Learning','Career','Health','Planning','Other'].map(c=><option key={c}>{c}</option>)}</select></label>
          <label className="field-label">Repeat<select value={form.recurrence} onChange={e=>update('recurrence',e.target.value)}>{['None','Daily','Weekly','Monthly'].map(c=><option key={c}>{c}</option>)}</select></label>
        </div>
        <div className="subtask-editor"><div className="subtask-title-row"><span className="field-label">Subtasks</span><span className="optional">{form.subtasks.length} added</span></div>
          <div className="subtask-add"><input value={subtaskText} onChange={e=>setSubtaskText(e.target.value)} placeholder="Break it into a small step" onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),addSubtask())}/><button type="button" className="button button-soft" onClick={addSubtask} aria-label="Add subtask"><Plus size={16}/> Add</button></div>
          {form.subtasks.map(s=><div className="subtask-edit-row" key={s.id}><span>{s.title}</span><button type="button" className="icon-button tiny danger-text" aria-label={`Remove ${s.title}`} onClick={()=>update('subtasks',form.subtasks.filter(x=>x.id!==s.id))}><Trash2 size={15}/></button></div>)}
        </div>
        {error&&<p className="form-error" role="alert">{error}</p>}
        <div className="form-actions"><button type="button" className="button button-quiet" onClick={onClose}>Cancel</button><button type="submit" className="button button-primary">{task?'Save changes':'Create task'}</button></div>
      </form>
    </section>
  </div>;
}
