import type { NextApiRequest, NextApiResponse } from 'next'; import { google } from 'googleapis';
export default async function handler(req:NextApiRequest,res:NextApiResponse){
  const redirect = process.env.NEXT_PUBLIC_BASE_URL + '/api/google/callback';
  const o = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirect);
  const url = o.generateAuthUrl({ access_type:'offline', scope:['https://www.googleapis.com/auth/calendar.events'] });
  res.status(200).json({ url });
}
