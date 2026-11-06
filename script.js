const track =
  document.querySelector(".carousel-track");

const cards =
  [...document.querySelectorAll(".project-card")];

const next =
  document.querySelector(".carousel-arrow-next");

const previous =
  document.querySelector(".carousel-arrow-previous");

let currentIndex = 0;


function pageSize() {

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


function updateCarousel() {

  const size = pageSize();


  /* MOBILE */

  if (size === 0) {

    currentIndex = 0;

    track.style.transform = "none";

    previous.hidden = true;
    next.hidden = true;

    return;
  }


  /* KEEP WITHIN THE 12 PROJECTS */

  const maximumStart =
    Math.max(
      0,
      cards.length - size
    );


  currentIndex =
    Math.min(
      currentIndex,
      maximumStart
    );


  /*
    THE IMPORTANT BIT:

    Card 01 is the original left-margin anchor.

    Whatever card begins the current page
    gets moved to that exact same position.
  */

  const firstCard =
    cards[0];

  const targetCard =
    cards[currentIndex];


  const distance =
    targetCard.offsetLeft
    - firstCard.offsetLeft;


  track.style.transform =
    `translateX(-${distance}px)`;


  /* ARROWS */

  previous.hidden =
    currentIndex === 0;


  next.hidden =
    currentIndex >= maximumStart;

}


next.addEventListener(
  "click",
  function () {

    const size = pageSize();

    if (size === 0) {
      return;
    }


    const maximumStart =
      Math.max(
        0,
        cards.length - size
      );


    currentIndex =
      Math.min(
        currentIndex + size,
        maximumStart
      );


    updateCarousel();

  }
);


previous.addEventListener(
  "click",
  function () {

    const size = pageSize();

    if (size === 0) {
      return;
    }


    currentIndex =
      Math.max(
        0,
        currentIndex - size
      );


    updateCarousel();

  }
);


/* =========================
   RESIZE
   ========================= */

let resizeTimer;


window.addEventListener(
  "resize",
  function () {

    clearTimeout(resizeTimer);


    resizeTimer =
      setTimeout(function () {

        /*
          Reset to the first set when changing
          breakpoint. Keeps the behaviour
          predictable while we're designing.
        */

        currentIndex = 0;

        updateCarousel();

      }, 100);

  }
);


/* =========================
   INITIALISE
   ========================= */

updateCarousel();
