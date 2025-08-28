#!/usr/bin/env bash
set -euo pipefail
w(){ mkdir -p "$(dirname "$1")"; cat > "$1"; }

# ====== STYLES ======
w src/styles/design-tokens.css <<'EOF'
:root{ --space-2:.5rem; --space-4:1rem; --space-6:1.5rem; --radius-2xl:1.25rem; --shadow-md:0 2px 8px rgba(0,0,0,.08); --shadow-lg:0 10px 24px rgba(0,0,0,.12); --font-sans: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto; }
*{box-sizing:border-box} body{font-family:var(--font-sans); margin:0}
.table{width:100%; border-collapse:collapse}
.table th,.table td{border:1px solid #e5e7eb; padding:.5rem; text-align:left}
.container{max-width:960px; margin:0 auto; padding:1rem}
.card{background:#fff; border-radius:var(--radius-2xl); box-shadow:var(--shadow-md); padding:1rem; margin-bottom:1rem}
.btn{padding:.5rem 1rem; border-radius:.75rem; border:1px solid #d1d5db; background:#111827; color:#fff;}
.btn.secondary{background:#fff;color:#111827}
.input{padding:.5rem; border:1px solid #d1d5db; border-radius:.5rem; width:100%}
.install-banner{position:fixed; left:1rem; right:1rem; bottom:1rem; background:#111827; color:#fff; padding:.75rem 1rem; border-radius:1rem; box-shadow:var(--shadow-lg); z-index:9999}
.install-banner button{margin-left:.5rem}
EOF

w src/styles/globals.css <<'EOF'
@import './design-tokens.css';
html, body, #__next{height:100%}
main{min-height:100%; background:#f9fafb}
body{ padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom); }
EOF

# ====== LIBS ======
w src/lib/coach.ts <<'EOF'
export type WeekPlan = { numero:number; tema:string; meta:string; microtareas:string[]; tareas:string[]; afirmacion:string; disparadores?:string[]; };
export const weeks:WeekPlan[]=[
  {numero:1,tema:'Seguridad',meta:'Estabilizar hábito y silenciar al Censor',microtareas:['Ordena 1 cajón','Mapa mental 10 min','Paseo 10 fotos','Lista “malas ideas”','Inventario de materiales','Collage 10 min','Resumen 3 ideas'],tareas:['Preparar estación creativa','Carta al Censor + respuesta compasiva','Registrar 1 sincronía'],afirmacion:'Soy constante y me cuido creando'},
  {numero:2,tema:'Identidad',meta:'Reafirmar “soy artista” y límites',microtareas:['Lista influencias nutritivas','1 “no” a compromiso drenante','Mapa de vocación 10 min'],tareas:['Curar entorno creativo','Definir 1 límite claro'],afirmacion:'Actúo desde mi propio criterio'}
];
export function makePlan(week:number){
  const w=weeks.find(x=>x.numero===week)||weeks[0]; const days=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  return { meta:w.meta, tema:w.tema, rows:days.map((d,i)=>({dia:d,paginas:'3 págs a mano',cita:i===5?'Cita 2 h (a solas)':'—',microtarea:w.microtareas[i%w.microtareas.length],enfoque:w.tema,hecho:false})), tareas:[...w.tareas], afirmacion:w.afirmacion };
}
EOF

# ====== COMPONENTS ======
w src/components/Modal.tsx <<'EOF'
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
EOF

w src/components/WeeklyPlanTable.tsx <<'EOF'
import React from 'react';
export default function WeeklyPlanTable({ rows }:{ rows:{ dia:string; paginas:string; cita:string; microtarea:string; enfoque:string; hecho:boolean }[] }){
  return (<table className="table"><thead><tr><th>Día</th><th>Páginas Matutinas</th><th>Cita con el Artista</th><th>Microtarea (15 min)</th><th>Enfoque</th><th>Hecho</th></tr></thead>
  <tbody>{rows.map((r,i)=>(<tr key={i}><td>{r.dia}</td><td>{r.paginas}</td><td>{r.cita}</td><td>{r.microtarea}</td><td>{r.enfoque}</td><td>[ ]</td></tr>))}</tbody></table>);
}
EOF

# ====== PAGES ======
w src/pages/_app.tsx <<'EOF'
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
export default function App({ Component, pageProps }:AppProps){ return <Component {...pageProps} />; }
EOF

w src/pages/_document.tsx <<'EOF'
import { Html, Head, Main, NextScript } from 'next/document';
export default function Document(){ return (<Html lang="es"><Head /></Html>); }
EOF

w src/pages/index.tsx <<'EOF'
import React from 'react';
import Head from 'next/head';
import WeeklyPlanTable from '@/components/WeeklyPlanTable';
import { makePlan } from '@/lib/coach';
export default function Home(){
  const plan = makePlan(1);
  return (<>
    <Head><title>El Camino del Artista</title></Head>
    <main className="container">
      <div className="card"><h1>Semana 1 — {plan.tema}</h1><p>Meta: {plan.meta}</p></div>
      <div className="card"><h2>Plan semanal</h2><WeeklyPlanTable rows={plan.rows} /></div>
    </main>
  </>);
}
EOF
