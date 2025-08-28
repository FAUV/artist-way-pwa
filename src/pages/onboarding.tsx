import React, { useState } from 'react';
export default function Onboarding(){
  const [msg,setMsg]=useState(''); const [props,setProps]=useState<string[]>([]);
  async function verify(){
    setMsg('Verificando Notion...'); const r=await fetch('/api/notion/verify'); const j=await r.json();
    if(j.ok){ setProps(j.properties); setMsg('Conexión OK.'); } else setMsg('Error: '+j.error);
  }
  async function createTest(){
    setMsg('Creando tarea de prueba...'); const r=await fetch('/api/notion/upsert',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({})});
    const j=await r.json(); setMsg(j.ok?('Tarea creada (id: '+j.id+')') : ('Error: '+(j.error||'desconocido')));
  }
  return (
    <main className="container">
      <div className="card"><h1>Onboarding — Conectar Notion</h1><p>Asegúrate de tener <code>NOTION_TOKEN</code> y <code>NOTION_DATABASE_ID</code> en <code>.env.local</code> y que la DB esté <strong>compartida</strong> con tu integración.</p></div>
      <div className="card">
        <button className="btn" onClick={verify}>Verificar conexión</button>
        <button className="btn secondary" onClick={createTest} style={{marginLeft:'.5rem'}}>Crear tarea de prueba</button>
        <p style={{marginTop:'.5rem'}}>{msg}</p>
        {props?.length>0 && (<><h3>Propiedades DB</h3><ul>{props.map((p:string)=><li key={p}>{p}</li>)}</ul></>)}
      </div>
    </main>
  );
}
