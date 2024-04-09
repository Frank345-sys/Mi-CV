import "./styles/index.css";
import html2pdf from "html2pdf.js";

const cv_dark = new URL(
  "./pdf/Web_Developer_Jr._Francisco_Gonzalez_dark.pdf",
  import.meta.url
);
const cv_light = new URL(
  "./pdf/Web_Developer_Jr._Francisco_Gonzalez_light.pdf",
  import.meta.url
);

const areaCv = document.querySelector("#area-cv");

// Función para mostrar / ocultar el menú de navegación
const toggleMenu = () => {
  const toggle = document.querySelector("#nav-toggle");
  const nav = document.querySelector("#nav-menu");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("nav__menu_active");
    });
  }
};

// Función para cerrar el menú de navegación al hacer clic en un enlace
const closeMenuOnClick = () => {
  const navLinks = document.querySelectorAll(".nav__link");
  const closeMenu = () => {
    const navMenu = document.querySelector("#nav-menu");
    navMenu.classList.remove("nav__menu_active");
  };
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
};

// Función para cambiar el tema (claro / oscuro)
const toggleTheme = () => {
  const themeButton = document.querySelector("#theme-button");
  const darkTheme = "dark-theme";
  const iconTheme = "bx-sun";

  const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
  const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

  const applyTheme = () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  };

  themeButton.addEventListener("click", applyTheme);

  const selectedTheme = localStorage.getItem("selected-theme");
  const selectedIcon = localStorage.getItem("selected-icon");
  if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
      darkTheme
    );
    themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
      iconTheme
    );
  }
};

// Función para escalar el CV antes de la generación del PDF
const scaleCv = () => {
  removeAnimations();
  document.body.classList.add("scale-cv");
};

const removeAnimations = () => {
  const links = document.querySelectorAll(".link");
  links.forEach((link) => {
    link.classList.toggle("link-animation");
  });
  areaCv.classList.remove("resume-animation");
};

const removeScaleCv = () => {
  removeAnimations();
  document.body.classList.remove("scale-cv");
};

// Función para generar el CV en formato PDF
const generateResume = () => {
  const opt = {
    margin: 0,
    filename: "Web_Developer_Jr._Francisco_Gonzalez.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: {
      format: "letter",
      orientation: "portrait",
    },
  };

  html2pdf().set(opt).from(areaCv).save();
};

// Event listener para generar el PDF del CV
const resumeButton = document.querySelector("#resume-button");
resumeButton.addEventListener("click", () => {
  scaleCv();
  generateResume();
  setTimeout(removeScaleCv, 1000);
});

//event Listener para generar CV PDF versión movil

const resumeButtonMovil = document.querySelector(".home__button-movil");

resumeButtonMovil.addEventListener("click", (e) => {
  if (document.body.classList.value === "dark-theme") {
    e.target.setAttribute("href", "" + cv_dark);
  } else if (document.body.classList.value === "") {
    e.target.setAttribute("href", "" + cv_light);
  }
});

// Inicialización de funciones al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  toggleMenu();
  closeMenuOnClick();
  toggleTheme();
});
