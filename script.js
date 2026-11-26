const MY_EMAIL = "marionninochan@gmail.com";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Theme toggle // 
const root = document.documentElement;
const themeBtn = document.getElementById("theme");
function setTheme(t) {
  root.setAttribute("data-bs-theme", t);
  themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("theme", t); } catch (e) {}
}
let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
setTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeBtn.addEventListener("click", () => {
  setTheme(root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark");
});

