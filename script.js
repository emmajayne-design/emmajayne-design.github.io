/* =========================
   PROJECT CONTENT

   This is the only area you need
   to edit when changing projects.
   ========================= */

const projects = [
  {
    number: "01",
    title: "PROJECT ONE TITLE",
    category: "Key Art",
    year: "2026",
    image: "https://picsum.photos/id/1011/700/1050",
    link: "#project-01"
  },
  {
    number: "02",
    title: "PROJECT TWO TITLE",
    category: "Campaign",
    year: "2026",
    image: "https://picsum.photos/id/1015/700/1050",
    link: "#project-02"
  },
  {
    number: "03",
    title: "PROJECT THREE TITLE",
    category: "Branding",
    year: "2025",
    image: "https://picsum.photos/id/1025/700/1050",
    link: "#project-03"
  },
  {
    number: "04",
    title: "PROJECT FOUR TITLE",
    category: "Art Direction",
    year: "2025",
    image: "https://picsum.photos/id/1035/700/1050",
    link: "#project-04"
  },
  {
    number: "05",
    title: "PROJECT FIVE TITLE",
    category: "Campaign",
    year: "2025",
    image: "https://picsum.photos/id/1040/700/1050",
    link: "#project-05"
  },
  {
    number: "06",
    title: "PROJECT SIX TITLE",
    category: "Key Art",
    year: "2024",
    image: "https://picsum.photos/id/1043/700/1050",
    link: "#project-06"
  },
  {
    number: "07",
    title: "PROJECT SEVEN TITLE",
    category: "Campaign",
    year: "2024",
    image: "https://picsum.photos/id/1050/700/1050",
    link: "#project-07"
  },
  {
    number: "08",
    title: "PROJECT EIGHT TITLE",
    category: "Design",
    year: "2024",
    image: "https://picsum.photos/id/1060/700/1050",
    link: "#project-08"
  },
  {
    number: "09",
    title: "PROJECT NINE TITLE",
    category: "Key Art",
    year: "2023",
    image: "https://picsum.photos/id/1067/700/1050",
    link: "#project-09"
  },
  {
    number: "10",
    title: "PROJECT TEN TITLE",
    category: "Art Direction",
    year: "2023",
    image: "https://picsum.photos/id/1074/700/1050",
    link: "#project-10"
  },
  {
    number: "11",
    title: "PROJECT ELEVEN TITLE",
    category: "Branding",
    year: "2023",
    image: "https://picsum.photos/id/1080/700/1050",
    link: "#project-11"
  },
  {
    number: "12",
    title: "PROJECT TWELVE TITLE",
    category: "Campaign",
    year: "2023",
    image: "https://picsum.photos/id/1084/700/1050",
    link: "#project-12"
  }
];


/* =========================
   ELEMENTS
   ========================= */

const carousel =
  document.querySelector(".carousel");

const carouselTrack =
  document.querySelector("#carousel-track");

const mobileProjectList =
  document.querySelector("#mobile-project-list");


/* =========================
   PROJECT CARD
   ========================= */

function createProjectCard(project) {
  return `
    <a
      class="project-card"
      href="${project.link}"
    >

      <div class="project-frame">

        <div class="project-number">
          [${project.number}]
        </div>

        <div class="project-image-stage">

          <img
            src="${project.image}"
            alt="${project.title}"
          >

        </div>

        <div class="project-info">

          <strong>
            ${project.title}
          </strong>

          <span>
            ${project.category} | ${project.year}
          </span>

        </div>

      </div>

    </a>
  `;
}


/* =========================
   GHOST PROJECT TILE
   ========================= */

function createGhostTile(
  project,
  direction
) {
  const isNext =
    direction === "next";

  const arrow =
    isNext ? "&gt;" : "&lt;";

  const label =
    isNext
      ? "Show projects 7 to 12"
      : "Return to projects 1 to 6";

  const className =
    isNext
      ? "ghost-control-next"
      : "ghost-control-previous";

  return `
    <button
      class="ghost-control ${className}"
      type="button"
      aria-label="${label}"
    >

      <span
        class="ghost-image"
        aria-hidden="true"
      >

        <img
          src="${project.image}"
          alt=""
        >

      </span>

      <span
        class="ghost-arrow"
        aria-hidden="true"
      >
        ${arrow}
      </span>

    </button>
  `;
}


/* =========================
   DESKTOP CAROUSEL
   ========================= */

function renderCarousel() {
  const firstSet =
    projects.slice(0, 6);

  const secondSet =
    projects.slice(6, 12);

  /*
    First state:
    Projects 1–6
    Ghosted Project 7 on right.
  */

  const firstPage = `
    <div
      class="
        carousel-page
        carousel-page-first
      "
    >

      ${firstSet
        .map(createProjectCard)
        .join("")}

      ${createGhostTile(
        projects[6],
        "next"
      )}

    </div>
  `;


  /*
    Second state:
    Ghosted Project 6 on left.
    Projects 7–12.
  */

  const secondPage = `
    <div
      class="
        carousel-page
        carousel-page-second
      "
    >

      ${createGhostTile(
        projects[5],
        "previous"
      )}

      ${secondSet
        .map(createProjectCard)
        .join("")}

    </div>
  `;

  carouselTrack.innerHTML =
    firstPage + secondPage;
}


/* =========================
   MOBILE PROJECT LIST
   ========================= */

function renderMobileProjects() {
  mobileProjectList.innerHTML =
    projects
      .map((project) => {
        return `
          <a
            class="mobile-project"
            href="${project.link}"
          >

            <img
              src="${project.image}"
              alt="${project.title}"
            >

            <div class="mobile-project-info">

              <strong>
                ${project.title}
              </strong>

              <span>
                ${project.category} | ${project.year}
              </span>

            </div>

          </a>
        `;
      })
      .join("");
}


/* =========================
   CAROUSEL STATE
   ========================= */

let currentPage = 0;


function showPage(pageNumber) {
  currentPage = pageNumber;

  carousel.classList.toggle(
    "is-page-two",
    currentPage === 1
  );
}


/* =========================
   CLICKS
   ========================= */

carousel.addEventListener(
  "click",
  function (event) {
    const nextControl =
      event.target.closest(
        ".ghost-control-next"
      );

    const previousControl =
      event.target.closest(
        ".ghost-control-previous"
      );

    if (nextControl) {
      showPage(1);
    }

    if (previousControl) {
      showPage(0);
    }
  }
);


/* =========================
   KEYBOARD ARROWS
   ========================= */

document.addEventListener(
  "keydown",
  function (event) {
    const isDesktop =
      window.matchMedia(
        "(min-width: 901px)"
      ).matches;

    if (!isDesktop) {
      return;
    }

    if (
      event.key === "ArrowRight" &&
      currentPage === 0
    ) {
      showPage(1);
    }

    if (
      event.key === "ArrowLeft" &&
      currentPage === 1
    ) {
      showPage(0);
    }
  }
);


/* =========================
   INITIALISE
   ========================= */

renderCarousel();
renderMobileProjects();
showPage(0);