// EDITA ESTE ARCHIVO PARA AÑADIR LAS URL REALES.
// Cada colección y categoría de producto puede tener una URL diferente por país.
window.HUB_DATA = {
  countries: {
    ES:"España", PT:"Portugal", IT:"Italia", FR:"France", PL:"Polska", RO:"România", CZ:"Česko",
    GR:"Ελλάδα", TR:"Türkiye", MX:"México", CL:"Chile", CO:"Colombia", PE:"Perú"
  },
  collections: [
    {id:"back-to-school", name:"Back to School", season:"", status:"active", countries:"global", urls:{}},
    {id:"colours", name:"Colours", season:"", status:"active", countries:"global", urls:{}},
    {id:"gem-it", name:"GEM IT!", season:"", status:"active", countries:"global", urls:{}},
    {id:"squishy-viral", name:"Squishy Viral", season:"", status:"active", countries:"global", urls:{}},
    {id:"click-bar", name:"Click Bar", season:"", status:"coming", countries:"global", urls:{}},
    {id:"velvet", name:"Velvet", season:"", status:"coming", countries:"global", urls:{}},
    {id:"atelier", name:"Atelier", season:"", status:"coming", countries:"global", urls:{}},
    {id:"animals", name:"Animals", season:"", status:"coming", countries:"global", urls:{}},
    // SS26: retirada en Europa. LATAM queda visible en histórico hasta definir su situación exacta.
    {id:"ss26", name:"SS26", season:"SS26", status:"historic", countries:["ES","PT","IT","FR","PL","RO","CZ","GR","TR","MX","CL","CO","PE"], urls:{}, noteByRegion:{EU:"Retirada en Europa", LATAM:"Histórico"}}
  ],
  products: [
    {id:"cases", name:"Carcasas", description:"Manual y guía de carcasas", urls:{}},
    {id:"glass", name:"Cristales", description:"Tipos, compatibilidades e información", urls:{}},
    {id:"tablets", name:"Tablet", description:"Información y manual de producto", urls:{}},
    {id:"accessories", name:"Accesorios", description:"Categorías e información de producto", urls:{}},
    {id:"squishy", name:"Squishy", description:"Catálogo y manual Squishy", urls:{}}
  ]
};
