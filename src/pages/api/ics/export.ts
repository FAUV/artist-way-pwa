import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req:NextApiRequest,res:NextApiResponse){
  res.setHeader('Content-Type','text/calendar');
  res.send('BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Artist Date\nDTSTART:20250101T100000Z\nDTEND:20250101T120000Z\nEND:VEVENT\nEND:VCALENDAR');
}
