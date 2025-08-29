import { Client } from '@notionhq/client';
if (!process.env.NOTION_TOKEN) {
  throw new Error('Falta NOTION_TOKEN en .env.local');
}
export const notion = new Client({ auth: process.env.NOTION_TOKEN });
