// ----- Cambiar color -----
const temas = ["", "humo", "oceano"]; // "" = tema original
let temaActual = 0;

function cambiarColor() {
  temaActual = (temaActual + 1) % temas.length;
  if (temas[temaActual]) {
    document.documentElement.setAttribute("data-tema", temas[temaActual]);
  } else {
    document.documentElement.removeAttribute("data-tema");
  }
}

// ----- Cambiar idioma (español <-> italiano) -----
const textos = document.querySelectorAll("[data-it]");
let idioma = "es";

// Guardamos el texto original en español
textos.forEach(el => { el.dataset.es = el.textContent; });

function cambiarIdioma() {
  idioma = idioma === "es" ? "it" : "es";
  textos.forEach(el => { el.textContent = el.dataset[idioma]; });

  document.documentElement.lang = idioma;
  document.title = idioma === "es" ? "Contaminación global" : "Inquinamento globale";
  document.getElementById("btnIdioma").textContent =
    idioma === "es" ? "Italiano 🇮🇹" : "Español 🇪🇸";
}
