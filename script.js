const carousel = document.querySelector(".carousel");

const nextButton = document.querySelector(".next-button");

const previousButton = document.querySelector(
  ".previous-button"
);


nextButton.addEventListener("click", function () {
  carousel.classList.add("show-second-page");
});


previousButton.addEventListener("click", function () {
  carousel.classList.remove("show-second-page");
});


document.addEventListener("keydown", function (event) {

  const desktopMode = window.matchMedia(
    "(min-width: 901px)"
  ).matches;

  if (!desktopMode) {
    return;
  }


  if (event.key === "ArrowRight") {
    carousel.classList.add("show-second-page");
  }


  if (event.key === "ArrowLeft") {
    carousel.classList.remove("show-second-page");
  }

});