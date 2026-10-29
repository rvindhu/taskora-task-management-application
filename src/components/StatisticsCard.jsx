import React from 'react';
export default function StatisticsCard({label,value,detail,icon:Icon,tone='lavender'}) { return <article className={`stat-card tone-${tone}`}><div className="stat-top"><span>{label}</span><span className="stat-icon"><Icon size={19}/></span></div><div className="stat-value">{value}</div><div className="stat-detail">{detail}</div></article>; }
