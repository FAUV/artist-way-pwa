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
