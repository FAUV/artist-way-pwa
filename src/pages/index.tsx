import React from 'react';
import Head from 'next/head';
import WeeklyPlanTable from '@/components/WeeklyPlanTable';
import { makePlan } from '@/lib/coach';
export default function Home(){
  const plan = makePlan(1);
  return (<>
    <Head><title>El Camino del Artista</title></Head>
    <main className="container">
      <div className="card"><h1>Semana 1 — {plan.tema}</h1><p>Meta: {plan.meta}</p></div>
      <div className="card"><h2>Plan semanal</h2><WeeklyPlanTable rows={plan.rows} /></div>
    </main>
  </>);
}
