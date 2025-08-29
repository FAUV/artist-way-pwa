import { useState } from 'react';
type Log = { status:number; data:any } | null;

export default function Onboarding() {
  const [log, setLog] = useState<Log>(null);
  const call = async (path:string) => {
    const res  = await fetch(path);
    const text = await res.text();
    let data:any; try { data = JSON.parse(text); } catch { data = { raw: text } }
    setLog({ status: res.status, data });
  };
  return (
    <main style={{ padding:24, fontFamily:'ui-sans-serif' }}>
      <h1 style={{ fontSize:24, fontWeight:700 }}>Onboarding</h1>
      <div style={{ marginTop:12, display:'flex', gap:12 }}>
        <button onClick={()=>call('/api/notion/ping')}>Ping Notion</button>
        <button onClick={()=>call('/api/notion/bootstrap')}>Bootstrap DB</button>
      </div>
      <pre style={{ marginTop:16, whiteSpace:'pre-wrap' }}>{JSON.stringify(log, null, 2)}</pre>
    </main>
  );
}
