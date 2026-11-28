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

 // Sticky note //
const notes = [
  "Currently learning: CSS, Bootstrap & JavaScript 💡",
  "Fueled by: coffee & curiosity ☕",
  "Next goal: build a real app 🚀",
  "Bug count today: ask me later 🐛"
];
const sticky = document.getElementById("sticky");
let noteIndex = 0;
sticky.addEventListener("click", () => {
  noteIndex = (noteIndex + 1) % notes.length;
  sticky.textContent = notes[noteIndex];
});

  // Skill progress bars //
const bars = document.querySelectorAll(".progress-bar[data-value]");
const barObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.style.width = en.target.dataset.value + "%";
      obs.unobserve(en.target);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => {
  if (reduceMotion) b.style.width = b.dataset.value + "%";
  else barObserver.observe(b);
});

  // Navbar active link //  
const sectionIds = ["home", "about", "skills", "journey", "project", "contact"];
const sections = sectionIds.map(id => document.getElementById(id));
const navCollapse = document.getElementById("navMenu");
let pending = null;

function play(el) {
  el.classList.remove("arrive");
  void el.offsetWidth;
  el.classList.add("arrive");
}

  // Scroll to section on nav link click //
document.querySelectorAll('a[href^="#"]').forEach(a => {
  const id = a.getAttribute("href").slice(1);
  if (!sectionIds.includes(id)) return;
  a.addEventListener("click", e => {
    pending = id;

  // If the navbar is collapsed, wait for it to hide before scrolling //  
   if (navCollapse.classList.contains("show")) {
      e.preventDefault();
      navCollapse.addEventListener("hidden.bs.collapse", () => {
        document.getElementById(id).scrollIntoView();
        history.replaceState(null, "", "#" + id);
      }, { once: true });
      bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
    }
  });
});

  // Reset pending on user scroll or touch //
["wheel", "touchstart"].forEach(ev => window.addEventListener(ev, () => { pending = null; }, { passive: true }));

const arriveObserver = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting && pending === en.target.id) {
      play(en.target);
      pending = null;
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => s && arriveObserver.observe(s));

  // Contact form submission //
const form = document.getElementById("form");
form.addEventListener("submit", e => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("msg").value.trim();
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(msg + "\n\nFrom: " + name + " (" + email + ")");

  // Show toast and open mail client //  
  bootstrap.Toast.getOrCreateInstance(document.getElementById("toast")).show();
  window.location.href = "mailto:" + MY_EMAIL + "?subject=" + subject + "&body=" + body;
  form.reset();
  form.classList.remove("was-validated");
});

 // Scroll to top button //   
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 400);
}, { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

document.getElementById("year").textContent = new Date().getFullYear();