import React from 'react';
export default function Modal({ open, title, onClose, children }:{ open:boolean; title:string; onClose:()=>void; children:React.ReactNode }){
  if(!open) return null;
  return (<div role="dialog" aria-modal="true" style={{position:'fixed',inset:0,background:'rgba(0,0,0,.4)',display:'grid',placeItems:'center',zIndex:10000}}>
    <div style={{background:'#fff',borderRadius:'1rem',boxShadow:'0 10px 24px rgba(0,0,0,.15)',width:'min(720px,92vw)',maxHeight:'86vh',overflow:'auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem 1.25rem',borderBottom:'1px solid #eee'}}>
        <h3 style={{margin:0}}>{title}</h3>
        <button onClick={onClose} aria-label="Cerrar" className="btn secondary">Cerrar</button>
      </div>
      <div style={{padding:'1rem 1.25rem'}}>{children}</div>
    </div>
  </div>);
}
