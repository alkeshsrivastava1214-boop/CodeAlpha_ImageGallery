const images = document.querySelectorAll(".gallery img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.getElementById("fullImage"); // id se target
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

lightbox.style.display = "none";

// Open lightbox on image click
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage(currentIndex);
    lightbox.style.display = "flex"; // show after setting src
  });
});

// Show selected image
function showImage(index) {
  lightboxImg.src = images[index].src;
  // CSS mein already size set hai, JS se repeat karne ki zarurat nahi
}

// Close lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Prev image
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

// Next image
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

// Close on background click
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// Close on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.style.display = "none";
  }
});
