(function () {

  const DEFAULT_COUNTRY = "ES";

  const params = new URLSearchParams(window.location.search);

  let currentCountry =
    (params.get("country") || DEFAULT_COUNTRY).toUpperCase();


  if (!HUB_DATA.countries[currentCountry]) {
    currentCountry = DEFAULT_COUNTRY;
  }


  const countrySelect =
    document.getElementById("countrySelect");

  const heroCountry =
    document.getElementById("heroCountry");

  const footerCountry =
    document.getElementById("footerCountry");

  const activeContainer =
    document.getElementById("activeCollections");

  const upcomingContainer =
    document.getElementById("upcomingCollections");

  const historicContainer =
    document.getElementById("historicCollections");

  const productGrid =
    document.getElementById("productGrid");


  /* ==============================
     SELECTOR DE PAÍS
  ============================== */

  function buildCountrySelector() {

    countrySelect.innerHTML = "";

    Object.entries(HUB_DATA.countries)
      .forEach(([code, country]) => {

        const option =
          document.createElement("option");

        option.value = code;

        option.textContent =
          `${country.flag} ${country.name}`;

        if (code === currentCountry) {
          option.selected = true;
        }

        countrySelect.appendChild(option);

      });

  }


  /* ==============================
     CAMBIAR PAÍS
  ============================== */

  countrySelect.addEventListener(
    "change",
    function () {

      const country = this.value;

      const url =
        new URL(window.location.href);

      url.searchParams.set(
        "country",
        country
      );

      window.location.href =
        url.toString();

    }
  );


  /* ==============================
     INFORMACIÓN DE PAÍS
  ============================== */

  function renderCountry() {

    const country =
      HUB_DATA.countries[currentCountry];

    heroCountry.textContent =
      country.name;

    footerCountry.textContent =
      `${country.flag} ${country.name}`;

    document.documentElement.lang =
      currentCountry.toLowerCase();

  }


  /* ==============================
     TARJETAS COLECCIONES
  ============================== */

  function createCollectionCard(collection) {

    const card =
      document.createElement("article");

    card.className =
      "collection-card";


    if (collection.status === "active") {
      card.classList.add("active-card");
    }


    const statusNames = {

      active: "ACTIVA",
      upcoming: "PRÓXIMAMENTE",
      historic: "HISTÓRICO"

    };


    const url =
      collection.urls?.[currentCountry] || "";


    const hasLink =
      url.trim() !== "";


    if (!hasLink) {
      card.classList.add("disabled-card");
    }


    let action;


    if (
      collection.status === "upcoming"
    ) {

      action =
        `<span class="card-link">
          PRÓXIMAMENTE
        </span>`;

    }

    else if (hasLink) {

      action =
        `<a
          class="card-link"
          href="${url}"
          target="_blank"
          rel="noopener noreferrer"
        >
          VER COLECCIÓN →
        </a>`;

    }

    else {

      action =
        `<span class="card-link">
          ENLACE PENDIENTE
        </span>`;

    }


    card.innerHTML = `

      <span class="card-status">
        ${statusNames[collection.status]}
      </span>

      <h4>
        ${collection.name}
      </h4>

      <p>
        ${collection.subtitle || ""}
      </p>

      ${action}

    `;


    return card;

  }


  /* ==============================
     RENDER COLECCIONES
  ============================== */

  function renderCollections() {

    activeContainer.innerHTML = "";
    upcomingContainer.innerHTML = "";
    historicContainer.innerHTML = "";


    const availableCollections =
      HUB_DATA.collections.filter(
        collection =>
          collection.countries.includes(
            currentCountry
          )
      );


    availableCollections.forEach(
      collection => {

        const card =
          createCollectionCard(collection);


        if (
          collection.status === "active"
        ) {

          activeContainer.appendChild(card);

        }


        if (
          collection.status === "upcoming"
        ) {

          upcomingContainer.appendChild(card);

        }


        if (
          collection.status === "historic"
        ) {

          historicContainer.appendChild(card);

        }

      }
    );


    hideEmptyGroup(
      historicContainer
    );

  }


  /* ==============================
     OCULTAR GRUPO VACÍO
  ============================== */

  function hideEmptyGroup(container) {

    const block =
      container.closest(
        ".collection-block"
      );

    if (!block) return;

    block.style.display =
      container.children.length
        ? ""
        : "none";

  }


  /* ==============================
     PRODUCTOS
  ============================== */

  function renderProducts() {

    productGrid.innerHTML = "";


    HUB_DATA.products.forEach(
      (product, index) => {

        const card =
          document.createElement("article");

        card.className =
          "product-card";


        const url =
          product.urls?.[
            currentCountry
          ] || "";


        const hasLink =
          url.trim() !== "";


        const number =
          String(index + 1)
            .padStart(2, "0");


        card.innerHTML = `

          <span class="product-index">
            ${number}
          </span>

          <div>

            <h3>
              ${product.name}
            </h3>

            <p>
              ${product.description}
            </p>

          </div>

          ${
            hasLink

              ? `
                <a
                  class="product-link"
                  href="${url}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ABRIR GUÍA →
                </a>
              `

              : `
                <span class="product-link">
                  PRÓXIMAMENTE
                </span>
              `
          }

        `;


        productGrid.appendChild(card);

      }
    );

  }


  /* ==============================
     INICIO
  ============================== */

  function init() {

    buildCountrySelector();

    renderCountry();

    renderCollections();

    renderProducts();

  }


  init();

})();
