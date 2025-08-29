import type { NextApiRequest, NextApiResponse } from 'next';
import { notion } from '@/lib/notion';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const parent = process.env.NOTION_PARENT_PAGE_ID;
    const dbId   = process.env.NOTION_DATABASE_ID;

    if (!parent && !dbId) {
      return res.status(400).json({ ok:false, error:'Definir NOTION_PARENT_PAGE_ID o NOTION_DATABASE_ID en .env.local' });
    }

    if (dbId) {
      const db = await notion.databases.retrieve({ database_id: dbId });
      return res.status(200).json({ ok:true, mode:'validate', database:{ id: db.id, title: db.title }});
    }

    const created = await notion.databases.create({
      parent: { type: 'page_id', page_id: parent! },
      title: [{ type: 'text', text: { content: 'Action Steps' } }],
      properties: {
        Name: { title: {} },
        Status: { select: { options: [
          { name:'Inbox', color:'gray' },
          { name:'In Progress', color:'blue' },
          { name:'Blocked', color:'red' },
          { name:'Done', color:'green' }
        ]}},
        Priority: { select: { options: [
          { name:'P1', color:'red' }, { name:'P2', color:'yellow' }, { name:'P3', color:'blue' }
        ]}},
        Due: { date: {} },
        Project: { rich_text: {} }
      }
    });
    res.status(200).json({ ok:true, mode:'create', database_id: created.id });
  } catch (e:any) {
    res.status(500).json({ ok:false, error:e.message });
  }
}
