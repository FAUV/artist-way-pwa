export type WeekPlan = { numero:number; tema:string; meta:string; microtareas:string[]; tareas:string[]; afirmacion:string; disparadores?:string[]; };
export const weeks:WeekPlan[]=[
  {numero:1,tema:'Seguridad',meta:'Estabilizar hábito y silenciar al Censor',microtareas:['Ordena 1 cajón','Mapa mental 10 min','Paseo 10 fotos','Lista “malas ideas”','Inventario de materiales','Collage 10 min','Resumen 3 ideas'],tareas:['Preparar estación creativa','Carta al Censor + respuesta compasiva','Registrar 1 sincronía'],afirmacion:'Soy constante y me cuido creando'},
  {numero:2,tema:'Identidad',meta:'Reafirmar “soy artista” y límites',microtareas:['Lista influencias nutritivas','1 “no” a compromiso drenante','Mapa de vocación 10 min'],tareas:['Curar entorno creativo','Definir 1 límite claro'],afirmacion:'Actúo desde mi propio criterio'}
];
export function makePlan(week:number){
  const w=weeks.find(x=>x.numero===week)||weeks[0]; const days=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  return { meta:w.meta, tema:w.tema, rows:days.map((d,i)=>({dia:d,paginas:'3 págs a mano',cita:i===5?'Cita 2 h (a solas)':'—',microtarea:w.microtareas[i%w.microtareas.length],enfoque:w.tema,hecho:false})), tareas:[...w.tareas], afirmacion:w.afirmacion };
}
