const images = document.querySelectorAll(".gallery img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.getElementById("fullImage");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentIndex = 0;

lightbox.style.display = "none";

// FILTER BUTTONS
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");
      filterImages(category);
  });
});

// Default: show all
document.querySelector(".filter-btn[data-category='all']").click();

// Open lightbox on image click
images.forEach((imgWrapper, index) => {
  const img = imgWrapper.querySelector("img");
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage(currentIndex);
    lightbox.style.display = "flex";
  });
});

// Show selected image
function showImage(index) {
  const img = images[index].querySelector("img");
  lightboxImg.src = img.src;}

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

//IMAGE FILTER FUNCTION
function filterImages(category) {
  images.forEach(imgWrapper => {
    if (category === "all" || imgWrapper.classList.contains(category)) {
      imgWrapper.classList.add("show");
      imgWrapper.classList.remove("hide");
    } else {
      imgWrapper.classList.remove("show");
      imgWrapper.classList.add("hide");
    }
  });
}