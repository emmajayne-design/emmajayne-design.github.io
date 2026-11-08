/* =========================
   PROJECT VIDEOS
   ========================= */

document.querySelectorAll(".project-bump").forEach(bump => {

  const video = bump.querySelector("video");
  const button = bump.querySelector(".project-bump-label");

  if (!video || !button) return;

  button.addEventListener("click", () => {
    video.play();
  });

  video.addEventListener("play", () => {
    button.hidden = true;
  });

  video.addEventListener("pause", () => {
    button.hidden = false;
  });

  video.addEventListener("ended", () => {
    button.hidden = false;
  });

});



/* =========================
   PAIRED IMAGES
   ========================= */

function fitImageRows() {

  /* Mobile handles images with CSS */
  if (window.innerWidth <= 767) return;

  document.querySelectorAll(".project-image-row").forEach(row => {

    const images = row.querySelectorAll("img");

    if (images.length !== 2) return;

    const gap = parseFloat(getComputedStyle(row).gap) || 0;

    const ratio1 =
      images[0].naturalWidth / images[0].naturalHeight;

    const ratio2 =
      images[1].naturalWidth / images[1].naturalHeight;

    const height =
      (row.clientWidth - gap) / (ratio1 + ratio2);

    images.forEach(image => {
      image.style.height = height + "px";
      image.style.width = "auto";
    });

  });

}


window.addEventListener("load", fitImageRows);
window.addEventListener("resize", fitImageRows);