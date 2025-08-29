import type { NextApiRequest, NextApiResponse } from 'next'; import { Client } from '@notionhq/client';
const notion = new Client({ auth: process.env.NOTION_TOKEN });
export default async function handler(req:NextApiRequest,res:NextApiResponse){ if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
const parent=process.env.NOTION_PARENT_PAGE_ID; if(!parent) return res.status(400).json({ ok:false, error:'Falta NOTION_PARENT_PAGE_ID' });
try{ const db=await (notion as any).databases.create({ parent:{type:'page_id',page_id:parent}, title:[{type:'text',text:{content:'Tasks'}}],
  properties:{ Name:{title:{}}, Date:{date:{}}, Theme:{select:{options:[
    {name:'Seguridad'},{name:'Identidad'},{name:'Poder'},{name:'Integridad'},{name:'Posibilidad'},{name:'Abundancia'},{name:'Conexión'},{name:'Fortaleza'},{name:'Compasión'},{name:'Autoprotección'},{name:'Autonomía'},{name:'Fe'}]}},
    Type:{select:{options:[{name:'ArtistDate'},{name:'Microtask'}]}}, Done:{checkbox:{}}
}}); res.status(200).json({ ok:true, database_id: db.id });
}catch(e:any){ res.status(500).json({ ok:false, error:e?.body || e?.message || String(e) }); } }
