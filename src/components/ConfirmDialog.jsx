import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
export default function ConfirmDialog({title, message, confirmText='Confirm', onConfirm, onCancel, danger=false}) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={e=>e.target===e.currentTarget&&onCancel()}>
    <section className="dialog-card" role="alertdialog" aria-modal="true" aria-labelledby="dialog-title">
      <button className="icon-button dialog-close" onClick={onCancel} aria-label="Close dialog"><X size={18}/></button>
      <div className={`dialog-symbol ${danger?'danger':''}`}><AlertTriangle size={22}/></div>
      <h2 id="dialog-title">{title}</h2><p>{message}</p>
      <div className="dialog-actions"><button className="button button-quiet" onClick={onCancel}>Cancel</button><button className={`button ${danger?'button-danger':'button-primary'}`} onClick={onConfirm}>{confirmText}</button></div>
    </section>
  </div>;
}
