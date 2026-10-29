import React from 'react';
import { ListTodo } from 'lucide-react';
export default function EmptyState({title='Nothing here just yet',description='When tasks show up here, you’ll find them ready to manage.',action,actionLabel='Create a task'}) {return <div className="empty-state"><div className="empty-icon"><ListTodo size={27}/></div><h3>{title}</h3><p>{description}</p>{action&&<button className="button button-primary" onClick={action}>{actionLabel}</button>}</div>;}
