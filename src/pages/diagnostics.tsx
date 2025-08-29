import { useEffect, useState } from 'react';

export default function Diagnostics() {
  const [info, setInfo] = useState<{ok:boolean; status:number; body:string}>({
    ok: false, status: 0, body: ''
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/health');
        const text = await res.text();
        setInfo({ ok: res.ok, status: res.status, body: text });
      } catch (e:any) {
        setInfo({ ok: false, status: -1, body: String(e) });
      }
    })();
  }, []);

  return <pre>{JSON.stringify(info, null, 2)}</pre>;
}
