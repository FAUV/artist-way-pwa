import type { NextApiRequest, NextApiResponse } from 'next';
import { notion } from '@/lib/notion';
export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const me = await notion.users.me({});
    res.status(200).json({ ok: true, bot: me.bot?.owner?.type ?? 'unknown' });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
