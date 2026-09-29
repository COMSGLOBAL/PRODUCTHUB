# Product & Retail Hub

Base multipaís para GitHub Pages.

## 1. Subir a GitHub
Crea un repositorio y sube todos estos archivos manteniendo las carpetas.

## 2. Activar GitHub Pages
En GitHub: Settings > Pages > Deploy from a branch > main / root.

## 3. Enlaces por país
Sustituye `TU-USUARIO` y `TU-REPO` por los tuyos:

- ES: https://TU-USUARIO.github.io/TU-REPO/?country=ES
- PT: https://TU-USUARIO.github.io/TU-REPO/?country=PT
- IT: https://TU-USUARIO.github.io/TU-REPO/?country=IT
- FR: https://TU-USUARIO.github.io/TU-REPO/?country=FR
- PL: https://TU-USUARIO.github.io/TU-REPO/?country=PL
- RO: https://TU-USUARIO.github.io/TU-REPO/?country=RO
- CZ: https://TU-USUARIO.github.io/TU-REPO/?country=CZ
- GR: https://TU-USUARIO.github.io/TU-REPO/?country=GR
- TR: https://TU-USUARIO.github.io/TU-REPO/?country=TR
- MX: https://TU-USUARIO.github.io/TU-REPO/?country=MX
- CL: https://TU-USUARIO.github.io/TU-REPO/?country=CL
- CO: https://TU-USUARIO.github.io/TU-REPO/?country=CO
- PE: https://TU-USUARIO.github.io/TU-REPO/?country=PE

## 4. Dónde poner los enlaces reales
Edita únicamente `data/content.js`.

Ejemplo de una colección:

    {id:"animals", name:"Animals", status:"coming", countries:"global", urls:{
      ES:"https://...",
      PT:"https://...",
      FR:"https://..."
    }}

Ejemplo de Producto:

    {id:"cases", name:"Carcasas", description:"Manual y guía de carcasas", urls:{
      ES:"https://drive.google.com/...",
      FR:"https://..."
    }}

Puede ser una URL de PDF, Drive o una web independiente.

## Estado inicial incluido
ACTIVAS GLOBALES: Back to School, Colours, GEM IT!, Squishy Viral.
PRÓXIMAMENTE: Click Bar, Velvet, Atelier, Animals.
HISTÓRICO: SS26, marcado como retirada en Europa.
PRODUCTO: Carcasas, Cristales, Tablet, Accesorios y Squishy.

## Importante
Los enlaces de colección y producto se resuelven según `?country=XX`. Así cada tienda recibe su enlace de país, pero solo se mantiene un portal.
