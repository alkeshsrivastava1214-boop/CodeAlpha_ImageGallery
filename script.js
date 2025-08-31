const images = document.querySelectorAll(".gallery img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.getElementById("fullImage");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentIndex = 0;

lightbox.style.display = "none";

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");

    images.forEach((img) => {
      img.style.display = "none";
      if (category === "all" || img.getAttribute("data-category") === category) {
        img.style.display = "inline-block";
      }
    });
  });
});

document.querySelector(".filter-btn[data-category='all']").click();

// Open lightbox on image click
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage(currentIndex);
    lightbox.style.display = "flex";
  });
});

// Show selected image
function showImage(index) {
  lightboxImg.src = images[index].src;
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

//IMAGE FILTER FUNCTION
function filterImages(category) {
  const images = document.querySelectorAll(".gallery .image");

  images.forEach(img => {
    if (category === "all" || img.classList.contains(category)) {
      img.classList.remove("hide");  
    } else {
      img.classList.add("hide");      
    }
  });
}
