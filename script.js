document.addEventListener("DOMContentLoaded", () => {
  const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const leer = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };

  // ---------- CAMBIAR COLOR ----------
  const temas = [
    { id: "",         es: "Bosque",    it: "Bosco" },
    { id: "oceano",   es: "Océano",    it: "Oceano" },
    { id: "humo",     es: "Humo",      it: "Fumo" },
    { id: "atardecer", es: "Atardecer", it: "Tramonto" }
  ];
  let t = parseInt(leer("tema")) || 0;
  let idioma = leer("idioma") || "es";

  const btnColor = document.getElementById("btnColor");
  const btnIdioma = document.getElementById("btnIdioma");

  function aplicarTema() {
    if (temas[t].id) document.documentElement.setAttribute("data-tema", temas[t].id);
    else document.documentElement.removeAttribute("data-tema");
    btnColor.textContent = "🎨 " + temas[t][idioma];
  }
  btnColor.addEventListener("click", () => {
    t = (t + 1) % temas.length;
    guardar("tema", t);
    aplicarTema();
  });

  // ---------- CAMBIAR IDIOMA ----------
  const textos = document.querySelectorAll("[data-it]");
  textos.forEach(el => { el.dataset.es = el.textContent; });

  function aplicarIdioma() {
    textos.forEach(el => { el.textContent = el.dataset[idioma]; });
    document.documentElement.lang = idioma;
    document.title = idioma === "es" ? "Contaminación global" : "Inquinamento globale";
    btnIdioma.textContent = idioma === "es" ? "🇮🇹 Italiano" : "🇪🇸 Español";
    aplicarTema();
  }
  btnIdioma.addEventListener("click", () => {
    idioma = idioma === "es" ? "it" : "es";
    guardar("idioma", idioma);
    aplicarIdioma();
  });

  // ---------- PESTAÑAS ----------
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(x => x.classList.remove("activa"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("activo"));
    tab.classList.add("activa");
    document.getElementById(tab.dataset.tab).classList.add("activo");
  }));

  // ---------- CONTADORES ANIMADOS ----------
  const obs = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, fin = parseFloat(el.dataset.n), d = parseInt(el.dataset.d);
      const inicio = performance.now();
      (function paso(ahora) {
        const p = Math.min((ahora - inicio) / 1500, 1);
        el.textContent = (fin * p).toFixed(d);
        if (p < 1) requestAnimationFrame(paso);
      })(inicio);
      obs.unobserve(el);
    });
  });
  document.querySelectorAll(".num").forEach(n => obs.observe(n));

  // ---------- COMPROMISO ----------
  const checks = document.querySelectorAll(".checks input");
  checks.forEach(c => c.addEventListener("change", () => {
    const n = [...checks].filter(x => x.checked).length;
    document.getElementById("conteo").textContent = n;
    document.getElementById("progreso").style.width = (n / checks.length * 100) + "%";
  }));

  aplicarIdioma(); // inicia con lo guardado
});
