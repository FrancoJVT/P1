// AOS (animaciones)
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

// BOTÓN RESERVA
const btn = document.querySelector("#alertBtn");

if (btn) {
  btn.addEventListener("click", () => {
    alert("Reserva disponible próximamente 🍣");
  });
}

// MENÚ HAMBURGUESA
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");

    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
  });
}

// LIGHTBOX GALERÍA CON FLECHAS Y TÍTULO
const images = document.querySelectorAll(".gallery img");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxTitle = document.querySelector(".lightbox-title");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

if (images.length && lightbox && lightboxImg && lightboxTitle) {

  // Abrir lightbox al hacer click en una imagen
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      updateLightbox();
      lightbox.classList.add("active");
    });
  });

  // Función para actualizar imagen, alt y título
  function updateLightbox() {
    const img = images[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = img.dataset.title || img.alt;
  }

  // Cerrar con botón, donde ponemos un X
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  }

  // Navegar a imagen anterior
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightbox();
    });
  }

  // Navegar a imagen siguiente
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % images.length;
      updateLightbox();
    });
  }

  // Cerrar haciendo click fuera de la imagen
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox.classList.remove("active");
    }
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightbox();
    }
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightbox();
    }
  });
}