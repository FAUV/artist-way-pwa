import type { NextApiRequest, NextApiResponse } from 'next';
import ical from 'node-ical';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = (req.query.url as string) || process.env.ICS_URL;
    if (!url) return res.status(400).json({ ok:false, error:'Definir ?url= o ICS_URL' });

    const events = await ical.async.fromURL(url);
    const out = Object.values(events)
      .filter((e:any) => e.type === 'VEVENT')
      .map((e:any) => ({
        uid: e.uid, summary: e.summary, start: e.start, end: e.end, location: e.location ?? null
      }));
    res.status(200).json({ ok:true, count: out.length, events: out.slice(0, 50) });
  } catch (e:any) {
    res.status(500).json({ ok:false, error:e.message });
  }
}
