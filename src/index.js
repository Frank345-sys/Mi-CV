import "./styles/index.css";
import html2pdf from "html2pdf.js";

const showMenu = (toggleId, navId) => {
  const toggle = document.querySelector("#" + toggleId);
  const nav = document.querySelector("#" + navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("nav__menu_active");
    });
  }
};

showMenu("nav-toggle", "nav-menu");

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.querySelector("#nav-menu");
  navMenu.classList.remove("nav__menu_active");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

function scrollTop() {
  const scrollTop = document.querySelector("#scroll-top");
  if (this.scrollY >= 200) scrollTop.classList.add("scrolltop_active");
  else scrollTop.classList.remove("scrolltop_active");
}

window.addEventListener("scroll", scrollTop);

const themeButton = document.querySelector("#theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

function scaleCv() {
  document.body.classList.add("scale-cv");
}

function removeScaleCv() {
  document.body.classList.remove("scale-cv");
}

function generateResume() {
  html2pdf(areaCv, opt);
}

let opt = {
  margin: 0,
  filename: "MI-CV-2023.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 4 },
  jsPDF: { format: "a4", orientation: "portrait" },
};

let areaCv = document.querySelector("#area-cv");

let resumeButton = document.querySelector("#resume-button");

resumeButton.addEventListener("click", () => {
  scaleCv();
  generateResume();
  setTimeout(removeScaleCv, 1000);
});
