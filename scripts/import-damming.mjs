import fs from 'node:fs';
import path from 'node:path';

const origin = 'https://voorraad.autodatawheelerdelta.nl';
const listing = `${origin}/cgi/voertuigen.cgi?site=voorraadlijst&v=1ecdb88b`;
const headers = {};
const decode = s => s.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g, (_,n)=>String.fromCodePoint(+n)).replaceAll('&ndash;', '–').replaceAll('&mdash;', '—').replaceAll('&rsquo;', '’').replaceAll('&lsquo;', '‘').replaceAll('&rdquo;', '”').replaceAll('&ldquo;', '“').replace(/&(amp|quot|apos|nbsp|euro|eacute|euml|ouml|uuml|egrave|agrave|auml|lt|gt);/g,(_,n)=>({amp:'&',quot:'"',apos:"'",nbsp:' ',euro:'€',eacute:'é',euml:'ë',ouml:'ö',uuml:'ü',egrave:'è',agrave:'à',auml:'ä',lt:'<',gt:'>'}[n]));
const text = s => decode(s.replace(/<script\b[\s\S]*?<\/script>/gi,' ').replace(/<style\b[\s\S]*?<\/style>/gi,' ').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ')).trim();
const number = s => Number((s||'').replace(/[^\d]/g,''));
async function fetchText(url) { const r=await fetch(url,{headers}); if(!r.ok)throw Error(`${r.status}: ${url}`); return r.text(); }
async function pool(items, concurrency, fn) {let next=0; const result=new Array(items.length); await Promise.all(Array.from({length:concurrency},async()=>{while(next<items.length){const i=next++;result[i]=await fn(items[i],i);}}));return result;}
const html = await fetchText(listing);
const rows = [...html.matchAll(/<div id="(\d+)" class="resultaat[^\"]*">([\s\S]*?)(?=<div id="\d+" class="resultaat|$)/g)];
if(!rows.length)throw Error('Geen occasions gevonden; bestaande data behouden.');
const cars=await pool(rows,3,async ([,id,row],index)=>{
 const card=row.match(/<div class="car-header">\s*<a[^>]*href="([^\"]+)"[^>]*>([\s\S]*?)<\/a>/);
 if(!card)throw Error(`Geen titel voor ${id}`);
 const url=new URL(decode(card[1]),origin).href;
 const title=text(card[2]);
 const detail=await fetchText(url);
 const pairs=[...detail.matchAll(/<li class="label[^\"]*">([\s\S]*?)<\/li>\s*<li class="waarde[^\"]*">([\s\S]*?)<\/li>/g)].map(m=>[text(m[1]).replace(/:$/,''),text(m[2])]);
 const get=key=>pairs.find(([k])=>k.toLowerCase()===key.toLowerCase())?.[1]||'';
 const brand=get('Merk'), model=get('Model');
 const year=Number(get('Bouwjaar').match(/(?:19|20)\d{2}/)?.[0]);
 const mileage=number(get('Km. stand'));
 const price=number(row.match(/class="priceFont">\s*(?:&euro;|€)\s*([\d.,]+)/)?.[1]);
 const power=Number(get('Vermogen motor').match(/(\d+)\s*PK/i)?.[1]||0);
 if(!brand||!model||!year||!mileage||!price||!power)throw Error(`Ontbrekende kerndata ${title}: ${JSON.stringify({brand,model,year,mileage,price,power})}`);
 const variant=title.replace(`${brand} ${model}`,'').trim();
 const fuelText=get('Brandstof').toLowerCase();
 const fuel=/hybride|hybrid/.test(fuelText)?'hybride':/diesel/.test(fuelText)?'diesel':/elektr/.test(fuelText)?'elektrisch':/lpg/.test(fuelText)?'lpg':'benzine';
 const transmission=/automaat/i.test(get('Transmissie'))?'automaat':'handgeschakeld';
 const body=get('Inrichting').toLowerCase();
 const bodyType=/station/.test(body)?'stationwagen':/cabrio/.test(body)?'cabriolet':/cou[pé]/.test(body)?'coupe':/suv|terrein/.test(body)?'suv':/sedan/.test(body)?'sedan':/mpv/.test(body)?'mpv':/bestel/.test(body)?'bestelwagen':'hatchback';
 const slug=`damming-${id}-${brand}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,'');
 const photoPaths=[...new Set([...detail.matchAll(/href="(\/static-storage[^\"]+\.(?:jpg|jpeg|webp)(?:\?[^\"]*)?)"/gi)].map(m=>decode(m[1])))];
 if(!photoPaths.length)throw Error(`Geen foto's voor ${title}`);
 const images=await pool(photoPaths,4,async (photo,i)=>{
  const local=`/images/cars/${slug}/${String(i+1).padStart(2,'0')}.jpg`;
  const res=await fetch(new URL(photo,origin),{headers});
  if(!res.ok||!res.headers.get('content-type')?.startsWith('image/'))throw Error(`Foto mislukt: ${photo}`);
  const file=path.join('public',local);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,Buffer.from(await res.arrayBuffer()));return local;
 });
 const optionHtml=detail.split('id="detailsAccessoires"')[1]?.split('id="fotoblok"')[0]?.split('id="opmerkingenblok"')[0]||'';
 const groups=[...optionHtml.matchAll(/<strong>([^<]+):<\/strong>([\s\S]*?)(?=<strong>|$)/g)].map(m=>({title:text(m[1]),items:[...new Set([...m[2].matchAll(/<li>\s*([^<>]+?)\s*<\/li>/g)].map(n=>text(n[1])).filter(Boolean))]})).filter(g=>g.items.length);
 const options=[...new Set(groups.flatMap(g=>g.items))];
 const descriptionHtml=detail.match(/<span class="veld_opmerkingen">([\s\S]*?)<\/span>/)?.[1];
 // Listing price is authoritative; free-text descriptions sometimes contain an older asking price.
 const description=text((descriptionHtml||title).replace(/Vraagprijs:[\s\S]*?(?:<br>|$)/i,''));
 const specifications={licensePlate:get('Kenteken'),seats:number(get('Aantal zitplaatsen'))||undefined,doors:Number(body.match(/(\d)[ -]*(?:deurs|drs)/)?.[1])||undefined,engineSize:(number(get('Cilinderinhoud'))/1000).toFixed(1).replace('.',','),weight:get('Gewicht (leeg)'),consumption:get('Gemiddeld verbruik'),topSpeed:get('Topsnelheid'),apkUntil:get('APK').replace(/^tot /,''),vatOrMargin:get('BTW/Marge').split(' Indien')[0],cylinders:number(get('Aantal cilinders'))||undefined,powerKw:Number(get('Vermogen motor').match(/\((\d+)\s*kW/)?.[1])||undefined,keys:number(get('Aantal sleutels'))||undefined,remotes:number(get('Aantal handzenders'))||undefined};
 const specSections=[{title:'Voertuiggegevens',rows:pairs.filter(([k,v])=>v&&!/BTW\/Marge|Wegenbelasting|Toerental max. koppelkracht|VIN nummer/.test(k)).map(([label,value])=>({label,value}))}];
 console.log(`${index+1}/${rows.length}: ${title} | €${price} | ${images.length} foto's`);
 return {id:`damming-${id}`,slug,brand,model,variant,price,year,mileage,fuel,transmission,power,bodyType,color:get('Kleur'),images,featured:index<4,status:'available',labels:specifications.vatOrMargin==='BTW'?['btw-auto']:[],description,specifications,specSections,options,optionGroups:groups,createdAt:new Date().toISOString()};
});
if(new Set(cars.map(c=>c.id)).size!==cars.length)throw Error('Dubbele voertuigen');
fs.writeFileSync('src/data/vehicles.ts',`import type { Vehicle } from "@/types/vehicle";\n\n// Imported from the official inventory linked at https://www.dammingtechniek.nl/aanbod\n// Snapshot: ${new Date().toISOString()} — refresh with node scripts/import-damming.mjs\nexport const vehicles: Vehicle[] = ${JSON.stringify(cars,null,2)};\n`);
const config='src/config/garage.ts';fs.writeFileSync(config,fs.readFileSync(config,'utf8').replace(/\{ label: "occasions op voorraad", value: "[^\"]*" \}/,`{ label: "occasions op voorraad", value: "${cars.length}" }`));
console.log(`Voltooid: ${cars.length} occasions geïmporteerd.`);
