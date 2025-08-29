import type { NextApiRequest, NextApiResponse } from 'next'; import { google } from 'googleapis';
export default async function handler(req:NextApiRequest,res:NextApiResponse){
  try{
    const redirect = process.env.NEXT_PUBLIC_BASE_URL + '/api/google/callback';
    const o = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirect);
    const { tokens } = await o.getToken(req.query.code as string);
    res.status(200).send('<script>window.close();</script> Conexión completada. Puedes volver a la app.');
  }catch(e:any){ res.status(500).json({ error:'Google callback error', hint:e?.message || String(e) }); }
}
