const carousel =
  document.querySelector(".carousel");

const viewport =
  document.querySelector(".carousel-viewport");

const track =
  document.querySelector(".carousel-track");

const cards =
  Array.from(
    document.querySelectorAll(".project-card")
  );

const previousButton =
  document.querySelector(
    ".carousel-arrow-previous"
  );

const nextButton =
  document.querySelector(
    ".carousel-arrow-next"
  );


let currentIndex = 0;


/* =========================
   RESPONSIVE PAGE SIZE
   ========================= */

function getPageSize() {

  if (window.innerWidth >= 1400) {
    return 6;
  }

  if (window.innerWidth >= 1100) {
    return 5;
  }

  if (window.innerWidth >= 768) {
    return 4;
  }

  return 0;
}


/* =========================
   READ A CSS PIXEL VALUE
   ========================= */

function getCSSPixels(variableName) {

  const styles =
    getComputedStyle(document.documentElement);

  const value =
    styles.getPropertyValue(variableName);

  return parseFloat(value) || 0;
}


/* =========================
   CALCULATE TRACK POSITION
   ========================= */

function moveTrack() {

  const pageSize = getPageSize();

  /*
    Mobile uses the vertical layout.
  */

  if (pageSize === 0) {

    track.style.transform = "none";

    previousButton.hidden = true;
    nextButton.hidden = true;

    cards.forEach((card) => {
      card.classList.remove("is-partial");
    });

    return;
  }


  const maximumStart =
    Math.max(0, cards.length - pageSize);

  currentIndex =
    Math.min(currentIndex, maximumStart);


  /*
    At the beginning, preserve the normal
    page margin.

    On later pages, position the current
    full card immediately after the visible
    previous-card slice and normal gap.
  */

  let translateX = 0;

  if (currentIndex > 0) {

    const currentCard =
      cards[currentIndex];

    const partialWidth =
      getCSSPixels("--partial-width");

    const gap =
      getCSSPixels("--card-gap");

    translateX =
      currentCard.offsetLeft
      - partialWidth
      - gap;
  }


  track.style.transform =
    `translateX(-${translateX}px)`;


  /*
    Wait until the browser has applied
    the transform before measuring cards.
  */

  requestAnimationFrame(() => {
    updatePartialCards();
    updateButtons();
  });
}


/* =========================
   DETECT PARTIAL VISIBILITY
   ========================= */

function updatePartialCards() {

  const viewportRect =
    viewport.getBoundingClientRect();


  cards.forEach((card) => {

    const cardRect =
      card.getBoundingClientRect();


    const visibleLeft =
      Math.max(
        cardRect.left,
        viewportRect.left
      );


    const visibleRight =
      Math.min(
        cardRect.right,
        viewportRect.right
      );


    const visibleWidth =
      Math.max(
        0,
        visibleRight - visibleLeft
      );


    const visibleRatio =
      visibleWidth / cardRect.width;


    /*
      Treat a card as partial when some,
      but not nearly all, is visible.
    */

    const isPartial =
      visibleRatio > 0.01
      && visibleRatio < 0.99;


    card.classList.toggle(
      "is-partial",
      isPartial
    );

  });

}


/* =========================
   ARROW VISIBILITY
   ========================= */

function updateButtons() {

  const pageSize = getPageSize();

  const maximumStart =
    Math.max(0, cards.length - pageSize);


  previousButton.hidden =
    currentIndex === 0;


  nextButton.hidden =
    currentIndex >= maximumStart;

}


/* =========================
   MOVE FORWARD
   ========================= */

function moveForward() {

  const pageSize = getPageSize();

  if (pageSize === 0) {
    return;
  }


  const maximumStart =
    Math.max(0, cards.length - pageSize);


  currentIndex =
    Math.min(
      currentIndex + pageSize,
      maximumStart
    );


  moveTrack();

}


/* =========================
   MOVE BACKWARD
   ========================= */

function moveBackward() {

  const pageSize = getPageSize();

  if (pageSize === 0) {
    return;
  }


  currentIndex =
    Math.max(
      currentIndex - pageSize,
      0
    );


  moveTrack();

}


/* =========================
   BUTTON CLICKS
   ========================= */

nextButton.addEventListener(
  "click",
  moveForward
);


previousButton.addEventListener(
  "click",
  moveBackward
);


/* =========================
   PARTIAL CARD CLICKS

   Clicking a partial card moves
   in the appropriate direction.
   ========================= */

cards.forEach((card) => {

  card.addEventListener(
    "click",
    function (event) {

      if (
        !card.classList.contains(
          "is-partial"
        )
      ) {
        return;
      }


      event.preventDefault();


      const cardRect =
        card.getBoundingClientRect();

      const viewportRect =
        viewport.getBoundingClientRect();


      if (
        cardRect.left
        < viewportRect.left
      ) {
        moveBackward();
      } else {
        moveForward();
      }

    }
  );

});


/* =========================
   KEYBOARD ARROWS
   ========================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "ArrowRight") {
      moveForward();
    }


    if (event.key === "ArrowLeft") {
      moveBackward();
    }

  }
);


/* =========================
   RESIZING

   Recalculate both page size
   and card position.
   ========================= */

let resizeTimer;


window.addEventListener(
  "resize",
  function () {

    clearTimeout(resizeTimer);


    resizeTimer =
      setTimeout(function () {

        const pageSize =
          getPageSize();


        if (pageSize > 0) {

          currentIndex =
            Math.floor(
              currentIndex / pageSize
            )
            * pageSize;

        } else {

          currentIndex = 0;

        }


        moveTrack();

      }, 120);

  }
);


/* =========================
   INITIALISE
   ========================= */

moveTrack();