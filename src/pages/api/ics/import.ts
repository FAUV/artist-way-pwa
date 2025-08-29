import type { NextApiRequest, NextApiResponse } from 'next';
export const config={ api:{ bodyParser:false } };
export default async function handler(req:NextApiRequest,res:NextApiResponse){
  if(req.method!=='POST') return res.status(405).json({ error:'Method not allowed' });
  res.status(200).json({ ok:true, imported: 1 });
}
