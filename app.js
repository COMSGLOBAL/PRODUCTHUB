/* =========================================================
   PRODUCT & RETAIL HUB
   GitHub Pages ↔ Google Sheets
========================================================= */

const API_URL =
  'https://script.google.com/macros/s/AKfycbxrQPNlxCdaMRDV6MWsXd1qXDYmNu-F4cori-DqJoabVQHl3PJjHx3Ag4cYWzdH5Pel/exec';


const ALLOWED_COUNTRIES = [
  "ES",
  "PT",
  "IT",
  "FR",
  "PL",
  "RO",
  "CZ",
  "GR",
  "TR",
  "MX",
  "CL",
  "CO",
  "PE"
];


const COUNTRY_INFO = {

  ES: {
    name: "ESPAÑA",
    lang: "es"
  },

  PT: {
    name: "PORTUGAL",
    lang: "pt"
  },

  IT: {
    name: "ITALIA",
    lang: "it"
  },

  FR: {
    name: "FRANCE",
    lang: "fr"
  },

  PL: {
    name: "POLSKA",
    lang: "pl"
  },

  RO: {
    name: "ROMÂNIA",
    lang: "ro"
  },

  CZ: {
    name: "ČESKO",
    lang: "cs"
  },

  GR: {
    name: "ΕΛΛΑΔΑ",
    lang: "el"
  },

  TR: {
    name: "TÜRKİYE",
    lang: "tr"
  },

  MX: {
    name: "MÉXICO",
    lang: "es-MX"
  },

  CL: {
    name: "CHILE",
    lang: "es-CL"
  },

  CO: {
    name: "COLOMBIA",
    lang: "es-CO"
  },

  PE: {
    name: "PERÚ",
    lang: "es-PE"
  }

};


/* =========================================================
   START
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initHub
);


async function initHub() {

  const country = getCountryFromURL();

  /*
    No utilizamos España como fallback.

    Si no existe ?country=XX
    o el país no es válido,
    bloqueamos la vista.
  */

  if (
    !country ||
    !ALLOWED_COUNTRIES.includes(country)
  ) {

    showMarketError();

    return;

  }


  configureMarket(country);


  try {

    const data =
      await fetchMarketData(country);


    if (!data || data.ok !== true) {

      throw new Error(
        data?.error ||
        "API_ERROR"
      );

    }


    applyTranslations(
      data.translations || {}
    );


    renderCollections(
      data.collections || [],
      data.translations || {}
    );


    renderProducts(
      data.products || [],
      data.translations || {}
    );


    hideLoader();

  }

  catch (error) {

    console.error(
      "PRODUCT HUB ERROR:",
      error
    );


    showDataError();

  }

}


/* =========================================================
   COUNTRY
========================================================= */

function getCountryFromURL() {

  const params =
    new URLSearchParams(
      window.location.search
    );


  const country =
    params.get("country");


  if (!country) {
    return null;
  }


  return country
    .toUpperCase()
    .trim();

}


function configureMarket(country) {

  const info =
    COUNTRY_INFO[country];


  if (!info) return;


  document.documentElement.lang =
    info.lang;


  document.title =
    `Product & Retail Hub · ${info.name}`;


  setText(
    "heroCountry",
    info.name
  );


  setText(
    "headerCountry",
    info.name
  );


  setText(
    "footerCountry",
    info.name
  );

}


/* =========================================================
   API
========================================================= */

async function fetchMarketData(country) {

  const url =
    `${API_URL}?country=${encodeURIComponent(country)}`;


  const response =
    await fetch(
      url,
      {
        method: "GET",
        cache: "no-store"
      }
    );


  if (!response.ok) {

    throw new Error(
      `HTTP_${response.status}`
    );

  }


  return await response.json();

}


/* =========================================================
   TRANSLATIONS
========================================================= */

function applyTranslations(
  translations
) {

  const elements =
    document.querySelectorAll(
      "[data-i18n]"
    );


  elements.forEach(
    element => {

      const key =
        element.dataset.i18n;


      const value =
        translations[key];


      /*
        Si una traducción está vacía,
        dejamos el texto que existe
        en index.html como fallback.
      */

      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {

        element.textContent =
          value;

      }

    }
  );

}


/* =========================================================
   COLLECTIONS
========================================================= */

function renderCollections(
  collections,
  translations
) {

  const activeContainer =
    document.getElementById(
      "activeCollections"
    );


  const upcomingContainer =
    document.getElementById(
      "upcomingCollections"
    );


  const historicContainer =
    document.getElementById(
      "historicCollections"
    );


  clearElement(activeContainer);
  clearElement(upcomingContainer);
  clearElement(historicContainer);


  const groups = {

    active: [],

    upcoming: [],

    historic: []

  };


  collections.forEach(
    collection => {

      if (
        groups[
          collection.status
        ]
      ) {

        groups[
          collection.status
        ].push(
          collection
        );

      }

    }
  );


  groups.active.forEach(
    collection => {

      activeContainer.appendChild(
        createCollectionCard(
          collection,
          translations
        )
      );

    }
  );


  groups.upcoming.forEach(
    collection => {

      upcomingContainer.appendChild(
        createCollectionCard(
          collection,
          translations
        )
      );

    }
  );


  groups.historic.forEach(
    collection => {

      historicContainer.appendChild(
        createCollectionCard(
          collection,
          translations
        )
      );

    }
  );


  toggleGroup(
    "activeGroup",
    groups.active.length
  );


  toggleGroup(
    "upcomingGroup",
    groups.upcoming.length
  );


  toggleGroup(
    "historicGroup",
    groups.historic.length
  );

}


/* =========================================================
   COLLECTION CARD
========================================================= */

function createCollectionCard(
  collection,
  translations
) {

  const card =
    document.createElement(
      "article"
    );


  card.className =
    `collection-card ${collection.status}`;


  const top =
    document.createElement(
      "div"
    );


  top.className =
    "collection-card-top";


  const status =
    document.createElement(
      "span"
    );


  status.className =
    `collection-status ${collection.status}`;


  status.textContent =
    getStatusLabel(
      collection.status,
      translations
    );


  const number =
    document.createElement(
      "span"
    );


  number.className =
    "collection-number";


  number.textContent =
    String(
      collection.order || ""
    ).padStart(
      2,
      "0"
    );


  top.appendChild(
    status
  );


  top.appendChild(
    number
  );


  const content =
    document.createElement(
      "div"
    );


  content.className =
    "collection-card-content";


  const title =
    document.createElement(
      "h4"
    );


  title.textContent =
    collection.name;


  content.appendChild(
    title
  );


  if (
    collection.notes &&
    String(
      collection.notes
    ).trim() !== ""
  ) {

    const note =
      document.createElement(
        "p"
      );


    note.className =
      "collection-note";


    note.textContent =
      collection.notes;


    content.appendChild(
      note
    );

  }


  const footer =
    document.createElement(
      "div"
    );


  footer.className =
    "collection-card-footer";


  /*
    PRÓXIMAMENTE:
    No hacemos clic aunque tenga URL.
  */

  if (
    collection.status ===
    "upcoming"
  ) {

    const label =
      document.createElement(
        "span"
      );


    label.className =
      "collection-link disabled";


    label.textContent =
      translations.status_upcoming ||
      "PRÓXIMAMENTE";


    footer.appendChild(
      label
    );

  }


  /*
    ACTIVA / HISTÓRICO con URL
  */

  else if (
    collection.url &&
    String(
      collection.url
    ).trim() !== ""
  ) {

    const link =
      document.createElement(
        "a"
      );


    link.className =
      "collection-link";


    link.href =
      collection.url;


    link.target =
      "_blank";


    link.rel =
      "noopener noreferrer";


    link.textContent =
      translations.view_collection ||
      "VER COLECCIÓN →";


    footer.appendChild(
      link
    );

  }


  /*
    No existe URL para este mercado
  */

  else {

    const label =
      document.createElement(
        "span"
      );


    label.className =
      "collection-link disabled";


    label.textContent =
      translations.link_pending ||
      "ENLACE PENDIENTE";


    footer.appendChild(
      label
    );

  }


  card.appendChild(
    top
  );


  card.appendChild(
    content
  );


  card.appendChild(
    footer
  );


  return card;

}


/* =========================================================
   PRODUCT
========================================================= */

function renderProducts(
  products,
  translations
) {

  const container =
    document.getElementById(
      "productGrid"
    );


  clearElement(
    container
  );


  products.forEach(
    (product, index) => {

      const card =
        createProductCard(
          product,
          translations,
          index
        );


      container.appendChild(
        card
      );

    }
  );

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(
  product,
  translations,
  index
) {

  const card =
    document.createElement(
      "article"
    );


  card.className =
    "product-card";


  const number =
    document.createElement(
      "span"
    );


  number.className =
    "product-number";


  number.textContent =
    String(
      index + 1
    ).padStart(
      2,
      "0"
    );


  const title =
    document.createElement(
      "h3"
    );


  title.textContent =
    product.name;


  const description =
    document.createElement(
      "p"
    );


  description.textContent =
    product.description || "";


  card.appendChild(
    number
  );


  card.appendChild(
    title
  );


  card.appendChild(
    description
  );


  if (
    product.url &&
    String(
      product.url
    ).trim() !== ""
  ) {

    const link =
      document.createElement(
        "a"
      );


    link.href =
      product.url;


    link.target =
      "_blank";


    link.rel =
      "noopener noreferrer";


    link.className =
      "product-link";


    link.textContent =
      translations.open_guide ||
      "ABRIR GUÍA →";


    card.appendChild(
      link
    );

  }

  else {

    const label =
      document.createElement(
        "span"
      );


    label.className =
      "product-link disabled";


    label.textContent =
      translations.status_upcoming ||
      "PRÓXIMAMENTE";


    card.appendChild(
      label
    );

  }


  return card;

}


/* =========================================================
   STATUS
========================================================= */

function getStatusLabel(
  status,
  translations
) {

  if (status === "active") {

    return (
      translations.status_active ||
      "ACTIVA"
    );

  }


  if (status === "upcoming") {

    return (
      translations.status_upcoming ||
      "PRÓXIMAMENTE"
    );

  }


  if (status === "historic") {

    return (
      translations.status_historic ||
      "HISTÓRICO"
    );

  }


  return "";

}


/* =========================================================
   VISIBILITY
========================================================= */

function toggleGroup(
  id,
  count
) {

  const element =
    document.getElementById(
      id
    );


  if (!element) return;


  element.style.display =
    count > 0
      ? ""
      : "none";

}


/* =========================================================
   LOADER
========================================================= */

function hideLoader() {

  const loader =
    document.getElementById(
      "hubLoader"
    );


  if (!loader) return;


  loader.classList.add(
    "is-hidden"
  );


  setTimeout(
    () => {

      loader.style.display =
        "none";

    },
    450
  );

}


/* =========================================================
   INVALID MARKET
========================================================= */

function showMarketError() {

  const loader =
    document.getElementById(
      "hubLoader"
    );


  const error =
    document.getElementById(
      "marketError"
    );


  const main =
    document.querySelector(
      "main"
    );


  const header =
    document.querySelector(
      ".site-header"
    );


  const footer =
    document.querySelector(
      ".site-footer"
    );


  if (loader) {
    loader.style.display =
      "none";
  }


  if (main) {
    main.style.display =
      "none";
  }


  if (header) {
    header.style.display =
      "none";
  }


  if (footer) {
    footer.style.display =
      "none";
  }


  if (error) {
    error.hidden =
      false;
  }

}


/* =========================================================
   DATA ERROR
========================================================= */

function showDataError() {

  const loader =
    document.getElementById(
      "hubLoader"
    );


  if (!loader) return;


  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-mark">!</div>

      <strong>
        PRODUCT & RETAIL HUB
      </strong>

      <span>
        No se han podido cargar los datos.
      </span>
    </div>
  `;

}


/* =========================================================
   HELPERS
========================================================= */

function setText(
  id,
  value
) {

  const element =
    document.getElementById(
      id
    );


  if (element) {

    element.textContent =
      value;

  }

}


function clearElement(
  element
) {

  if (element) {

    element.innerHTML =
      "";

  }

}
