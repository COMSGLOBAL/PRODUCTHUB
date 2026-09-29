const EUROPE = new Set(["ES","PT","IT","FR","PL","RO","CZ","GR","TR"]);
const LATAM = new Set(["MX","CL","CO","PE"]);
const params = new URLSearchParams(location.search);
let country = (params.get("country") || "ES").toUpperCase();

function start(){
  const data = window.HUB_DATA;
  if(!data.countries[country]) country = "ES";
  const select = document.getElementById("countrySelect");
  Object.entries(data.countries).forEach(([code,name]) => select.add(new Option(`${code} · ${name}`,code)));
  select.value = country;
  select.onchange = () => { const u=new URL(location.href); u.searchParams.set("country",select.value); location.href=u; };
  document.documentElement.lang = country.toLowerCase();
  document.getElementById("countryName").textContent = data.countries[country].toUpperCase();
  document.getElementById("footerCountry").textContent = `${country} · ${data.countries[country]}`;
  renderCollections(data.collections);
  renderProducts(data.products);
}
function available(item){ return item.countries === "global" || item.countries.includes(country); }
function region(){ return EUROPE.has(country)?"EU":LATAM.has(country)?"LATAM":""; }
function statusLabel(s){ return s==="active"?"ACTIVA":s==="coming"?"PRÓXIMAMENTE":"HISTÓRICO"; }
function card(c){
  const url=c.urls[country];
  const note=c.noteByRegion?.[region()] || "";
  return `<article class="collection-card"><div class="visual visual-${c.id}"><span>${c.name}</span></div><div class="card-body"><div class="meta"><span class="status ${c.status}">${statusLabel(c.status)}</span><span>${country}</span></div><h4>${c.name}</h4>${note?`<p class="note">${note}</p>`:""}${url?`<a class="text-link" target="_blank" rel="noopener" href="${url}">VER COLECCIÓN →</a>`:`<span class="text-link disabled">ENLACE ${country} PENDIENTE</span>`}</div></article>`;
}
function renderCollections(items){
  const visible=items.filter(available);
  document.getElementById("activeCollections").innerHTML=visible.filter(x=>x.status==="active").map(card).join("");
  document.getElementById("comingCollections").innerHTML=visible.filter(x=>x.status==="coming").map(card).join("");
  document.getElementById("historicCollections").innerHTML=visible.filter(x=>x.status==="historic").map(card).join("");
}
function renderProducts(items){
  document.getElementById("productGrid").innerHTML=items.map(p=>{const url=p.urls[country];return `<article class="product-card"><span>PRODUCT GUIDE</span><h4>${p.name}</h4><p>${p.description}</p>${url?`<a target="_blank" rel="noopener" href="${url}">ABRIR →</a>`:`<span class="disabled">PDF / WEB ${country} PENDIENTE</span>`}</article>`}).join("");
}
const script=document.createElement("script"); script.src="data/content.js"; script.onload=start; document.head.appendChild(script);
