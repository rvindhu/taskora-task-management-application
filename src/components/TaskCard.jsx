import React from 'react';
import { CalendarDays, Check, Circle, Clock3, MoreHorizontal, Pencil, RefreshCw, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { formatDate, isOverdue } from '../utils/taskUtils.js';
export default function TaskCard({task,onToggle,onEdit,onDelete,onReschedule,onSubtaskToggle,compact=false}) {
  const [expanded,setExpanded]=useState(false); const overdue=isOverdue(task); const subtasks=task.subtasks||[];
  return <article className={`task-card ${task.completed?'task-completed':''} ${overdue?'task-overdue':''}`}>
    <button className={`task-check ${task.completed?'checked':''}`} onClick={()=>onToggle(task)} aria-label={task.completed?'Mark incomplete':'Mark complete'}>{task.completed?<Check size={15}/>:<Circle size={19}/>}</button>
    <div className="task-main">
      <div className="task-title-row"><h3>{task.title}</h3>{task.postponedCount>=2&&!task.completed&&<span className="pill pill-recovery"><RefreshCw size={11}/>{task.postponedCount} postponements</span>}</div>
      {task.description&&!compact&&<p className="task-description">{task.description}</p>}
      <div className="task-meta"><span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority} priority</span><span className="category-label">{task.category||'Personal'}</span><span className={`due-label ${overdue?'due-overdue':''}`}><CalendarDays size={13}/>{overdue?'Overdue · ':''}{formatDate(task.dueDate)}</span>{subtasks.length>0&&<button className="subtask-toggle" onClick={()=>setExpanded(!expanded)}>{subtasks.filter(s=>s.completed).length}/{subtasks.length} steps {expanded?<ChevronUp size={13}/>:<ChevronDown size={13}/>}</button>}</div>
      {expanded&&subtasks.length>0&&<div className="subtask-list">{subtasks.map(s=><label className="subtask-line" key={s.id}><input type="checkbox" checked={s.completed} onChange={()=>onSubtaskToggle(task,s)}/><span className={s.completed?'subtask-done':''}>{s.title}</span></label>)}</div>}
    </div>
    <div className="task-actions"><button className="icon-button" onClick={()=>onEdit(task)} aria-label={`Edit ${task.title}`} title="Edit"><Pencil size={15}/></button>{overdue&&<button className="icon-button reschedule-icon" onClick={()=>onReschedule(task)} aria-label={`Reschedule ${task.title}`} title="Reschedule"><Clock3 size={16}/></button>}<button className="icon-button danger-text" onClick={()=>onDelete(task)} aria-label={`Delete ${task.title}`} title="Delete"><Trash2 size={15}/></button></div>
  </article>;
}
