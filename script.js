const allImageWrappers = document.querySelectorAll(".image");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.getElementById("fullImage");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const filterButtons = document.querySelectorAll(".filter-btn");

let activeImages = []; 
let currentIndex = 0;

// Filter Buttons
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");
    filterImages(category);
  });
});

document.querySelector(".filter-btn[data-category='all']").click();

// Open lightbox on image click
function attachImageClick() {
  activeImages.forEach((imgWrapper, index) => {
    const img = imgWrapper.querySelector("img");
    img.onclick = () => {
      currentIndex = index;
      showImage(currentIndex);
      lightbox.style.display = "flex";
    };
  });
}

// Show selected image
function showImage(index) {
  const img = activeImages[index].querySelector("img");
  lightboxImg.src = img.src;
}

// Close lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Prev image
function prevImage() {
  if (activeImages.length > 0) {
    currentIndex = (currentIndex - 1 + activeImages.length) % activeImages.length;
    showImage(currentIndex);
  }
}

// Next image
function nextImage() {
  if (activeImages.length > 0) {
    currentIndex = (currentIndex + 1) % activeImages.length;
    showImage(currentIndex);
  }
}

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

// Close on background click
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// Keyboard control (ESC, ArrowLeft, ArrowRight)
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "Escape") {
      lightbox.style.display = "none";
    }
    if (e.key === "ArrowLeft") {
      prevImage();
    }
    if (e.key === "ArrowRight") {
      nextImage();
    }
  }
});

// Image Filter Function
function filterImages(category) {
  activeImages = [];
  allImageWrappers.forEach(imgWrapper => {
    if (category === "all" || imgWrapper.classList.contains(category)) {
      imgWrapper.classList.add("show");
      imgWrapper.classList.remove("hide");
      activeImages.push(imgWrapper);
    } else {
      imgWrapper.classList.remove("show");
      imgWrapper.classList.add("hide");
    }
  });

  attachImageClick();
}
