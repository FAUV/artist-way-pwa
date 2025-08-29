import React,{useEffect,useState} from 'react';
export default function Diagnostico(){
  const [d,setD]=useState<any>(null);
  useEffect(()=>{ fetch('/api/health').then(r=>r.json()).then(setD); },[]);
  return (<main className="container"><div className="card"><h1>Diagnóstico</h1></div><div className="card"><pre>{JSON.stringify(d,null,2)}</pre></div></main>);
}
