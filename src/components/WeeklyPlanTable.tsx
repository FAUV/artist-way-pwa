import React from 'react';
export default function WeeklyPlanTable({ rows }:{ rows:{ dia:string; paginas:string; cita:string; microtarea:string; enfoque:string; hecho:boolean }[] }){
  return (<table className="table"><thead><tr><th>Día</th><th>Páginas Matutinas</th><th>Cita con el Artista</th><th>Microtarea (15 min)</th><th>Enfoque</th><th>Hecho</th></tr></thead>
  <tbody>{rows.map((r,i)=>(<tr key={i}><td>{r.dia}</td><td>{r.paginas}</td><td>{r.cita}</td><td>{r.microtarea}</td><td>{r.enfoque}</td><td>[ ]</td></tr>))}</tbody></table>);
}
