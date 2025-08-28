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
