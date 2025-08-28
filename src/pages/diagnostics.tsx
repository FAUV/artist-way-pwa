import { useEffect, useState } from 'react';
export default function Diagnostics() {
  const [ok, setOk] = useState<null | boolean>(null);
  useEffect(() => { fetch('/api/health').then(r => setOk(r.ok)).catch(() => setOk(false)); }, []);
  return <pre>HEALTH: {String(ok)}</pre>;
}
