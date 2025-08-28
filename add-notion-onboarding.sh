#!/usr/bin/env bash
set -euo pipefail
w(){ mkdir -p "$(dirname "$1")"; cat > "$1"; }

# API: verificar DB
w src/pages/api/notion/verify.ts <<'EOF'
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
const notion = new Client({ auth: process.env.NOTION_TOKEN });
export default async function handler(req:NextApiRequest,res:NextApiResponse){
  try{
    const dbId = process.env.NOTION_DATABASE_ID!;
    if(!dbId) return res.status(400).json({ ok:false, error:'Falta NOTION_DATABASE_ID' });
    const db:any = await (notion as any).databases.retrieve({ database_id: dbId });
    const props = Object.keys(db.properties||{});
    res.status(200).json({ ok:true, properties: props });
  }catch(e:any){ res.status(500).json({ ok:false, error: e.message}); }
}
EOF

# API: crear tarea de prueba
w src/pages/api/notion/upsert.ts <<'EOF'
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
const notion = new Client({ auth: process.env.NOTION_TOKEN });
export default async function handler(req:NextApiRequest,res:NextApiResponse){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  try{
    const dbId = process.env.NOTION_DATABASE_ID!;
    const r = await (notion as any).pages.create({
      parent: { database_id: dbId },
      properties: {
        Name: { title: [{ text: { content: req.body?.title || '[Microtask] Prueba de sincronización' } }] },
        Theme: { select: { name: req.body?.theme || 'Seguridad' } },
        Type:  { select: { name: req.body?.type  || 'Microtask' } },
        Done:  { checkbox: false }
      }
    });
    res.status(200).json({ ok:true, id:r.id });
  }catch(e:any){ res.status(500).json({ error:'Notion error', hint:e.message }); }
}
EOF

# Página Onboarding mínima para Notion
w src/pages/onboarding.tsx <<'EOF'
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
EOF
