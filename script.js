const carousel = document.querySelector(".carousel");
const nextButton = document.querySelector(".carousel-control-next");
const previousButton = document.querySelector(
  ".carousel-control-previous"
);

let currentPage = 0;


function showPage(pageNumber) {
  currentPage = pageNumber;

  const isPageTwo = currentPage === 1;

  carousel.classList.toggle(
    "is-page-two",
    isPageTwo
  );
}


nextButton.addEventListener("click", function () {
  showPage(1);
});


previousButton.addEventListener("click", function () {
  showPage(0);
});


document.addEventListener("keydown", function (event) {

  const isDesktop =
    window.matchMedia("(min-width: 901px)").matches;

  if (!isDesktop) {
    return;
  }

  if (event.key === "ArrowRight" && currentPage === 0) {
    showPage(1);
  }

  if (event.key === "ArrowLeft" && currentPage === 1) {
    showPage(0);
  }

});