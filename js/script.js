// Product type -> icon + pop color (full class strings so Tailwind generates them)
const TYPES = {
  infografis: { icon: "fas fa-chart-pie", bg: "bg-pop-green" },
  peta: { icon: "fas fa-map", bg: "bg-pop-blue" },
  laporan: { icon: "fas fa-file-alt", bg: "bg-pop-yellow" },
  dashboard: { icon: "fas fa-tachometer-alt", bg: "bg-pop-purple" },
  desain: { icon: "fas fa-paint-brush", bg: "bg-pop-pink" },
  aplikasi: { icon: "fas fa-code", bg: "bg-pop-orange" }
};
const POPS = ["bg-pop-yellow", "bg-pop-blue", "bg-pop-green", "bg-pop-pink", "bg-pop-purple", "bg-pop-orange"];

// data icons are bare names ("fa-map") unless they carry their own style prefix ("fab fa-react")
const iconClass = icon => (icon.startsWith("fa-") ? "fas " : "") + icon;

function tr(key) {
  if (currentLang === "id") return null;
  const keys = key.split(".");
  let val = en;
  for (const k of keys) {
    if (val == null) return null;
    if (Array.isArray(val)) {
      const idx = parseInt(k);
      if (isNaN(idx) || idx >= val.length) return null;
      val = val[idx];
    } else {
      val = val[k];
    }
  }
  return val;
}

function renderStats() {
  const el = document.getElementById("stats-container");
  if (!el) return;
  el.innerHTML = profile.stats.map((s, i) => {
    const label = tr(`stats.${i}`) || s.label;
    const [, num, suffix] = s.value.match(/^(\d+)(.*)$/) || [];
    const value = num ? `<span data-count="${num}" data-suffix="${suffix}">${s.value}</span>` : s.value;
    return `<div class="nb-card ${POPS[i % POPS.length]} text-on-pop p-4 sm:p-6">
      <p class="font-display text-3xl sm:text-5xl leading-none mb-2">${value}</p>
      <p class="text-xs sm:text-sm font-bold uppercase tracking-wider">${label}</p>
    </div>`;
  }).join("");
}

function renderFacts() {
  const el = document.getElementById("facts");
  if (!el) return;
  el.innerHTML = profile.facts.map((f, i) => {
    const t = tr(`facts.${i}`) || f;
    return `<div class="nb-card p-5 sm:p-6">
      <h3 class="inline-block ${POPS[(i + 1) % POPS.length]} text-on-pop border-2 border-ink px-2 py-0.5 text-sm font-bold uppercase tracking-wider mb-4">${t.title}</h3>
      <ul class="flex flex-wrap gap-2">${t.items.map(x => `<li class="nb-tag">${x}</li>`).join("")}</ul>
    </div>`;
  }).join("");
}

function renderSkills() {
  const el = document.getElementById("skills-groups");
  if (!el) return;
  el.innerHTML = Object.entries(profile.skills).map(([groupName, items], gi) => {
    const label = tr(`skillGroups.${groupName}`) || groupName;
    return `<div class="nb-card flex flex-col h-full">
      <h3 class="${POPS[gi % POPS.length]} text-on-pop border-b-[3px] border-ink px-5 py-3 font-display text-lg">${label}</h3>
      <ul class="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${items.map(s => `<li class="flex items-center gap-3 font-semibold">
          <span class="w-9 h-9 shrink-0 flex items-center justify-center bg-accent text-white border-2 border-ink" aria-hidden="true"><i class="${iconClass(s.icon)} text-sm"></i></span>${s.name}</li>`).join("")}
      </ul>
    </div>`;
  }).join("");
}

function renderCerts() {
  const el = document.getElementById("cert-badges");
  if (!el) return;
  const items = currentLang === "en" ? (en.certs || certs) : certs;
  el.innerHTML = items.map(c =>
    `<li class="nb-card !shadow-[4px_4px_0_0_var(--ink)] flex items-start gap-3 px-4 py-3 font-medium">
      <i class="fas fa-award text-accent mt-1" aria-hidden="true"></i><span>${c}</span></li>`
  ).join("");
}

function renderProducts() {
  const el = document.getElementById("products-container");
  if (!el) return;
  el.innerHTML = products.map((p, i) => {
    const name = tr(`products.${i}.name`) || p.name;
    const desc = tr(`products.${i}.desc`) || p.desc;
    const type = tr(`types.${p.type}`) || p.type;
    const t = TYPES[p.type] || { icon: "fas fa-file", bg: "bg-pop-yellow" };
    const linksHtml = p.links
      ? `<p class="text-xs font-bold uppercase tracking-wider text-muted-fg mb-2">${tr("trainingSites") || "Situs pelatihan"}</p>
        <ul class="flex flex-wrap gap-2 mb-5">${p.links.map(l =>
          `<li><a href="${l.url}" target="_blank" rel="noopener noreferrer" class="nb-tag hover:bg-pop-yellow hover:text-on-pop">${l.name}</a></li>`
        ).join("")}</ul>`
      : "";
    const cta = p.url !== "#"
      ? `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="nb-btn bg-accent text-white text-sm px-4 py-2 mt-auto self-start">
          ${tr("lihat") || "Lihat proyek"} <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`
      : "";
    // wrapper div: Motion animates it, so its transform never fights the card's hover lift
    return `<div><article class="nb-card nb-hover h-full flex flex-col">
      <div class="${t.bg} text-on-pop border-b-[3px] border-ink px-5 py-3 flex items-center justify-between">
        <span class="flex items-center gap-2 font-bold text-sm uppercase tracking-wider"><i class="${t.icon}" aria-hidden="true"></i>${type}</span>
        <span class="font-display text-sm">${p.year}</span>
      </div>
      <div class="p-5 flex flex-col flex-1">
        <h3 class="font-display text-lg leading-snug mb-2">${name}</h3>
        <p class="text-muted-fg leading-relaxed mb-5">${desc}</p>
        ${linksHtml}
        ${cta}
      </div>
    </article></div>`;
  }).join("");
}

function applyLang() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    if (!el.dataset.i18nId) el.dataset.i18nId = el.textContent;
    if (currentLang === "en") {
      const val = tr(el.dataset.i18n);
      if (val) el.textContent = val;
    } else {
      el.textContent = el.dataset.i18nId;
    }
  });

  document.querySelector("#lang-toggle span").textContent = currentLang === "id" ? "EN" : "ID";
  updateThemeLabel();

  renderStats();
  renderFacts();
  renderSkills();
  renderCerts();
  renderProducts();
}

// localStorage throws when the browser blocks site storage; the toggle still works, it just isn't remembered
function save(key, value) {
  try { localStorage.setItem(key, value); } catch (e) {}
}

function switchLang() {
  currentLang = currentLang === "id" ? "en" : "id";
  save("lang", currentLang);
  applyLang();
}

function toggleTheme() {
  const theme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  save("theme", theme);
  applyTheme();
}

function updateThemeLabel() {
  const theme = document.documentElement.getAttribute("data-theme") || "light";
  const label = document.getElementById("theme-label");
  if (currentLang === "id") label.textContent = theme === "light" ? "Terang" : "Gelap";
  else label.textContent = theme === "light" ? "Light" : "Dark";
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
  document.getElementById("hamburger-icon").classList.toggle("hidden");
  document.getElementById("close-icon").classList.toggle("hidden");
  document.getElementById("menu-toggle").setAttribute("aria-expanded", !menu.classList.contains("hidden"));
}

function closeMobileMenu() {
  document.getElementById("mobile-menu").classList.add("hidden");
  document.getElementById("hamburger-icon").classList.remove("hidden");
  document.getElementById("close-icon").classList.add("hidden");
  document.getElementById("menu-toggle").setAttribute("aria-expanded", "false");
}

// data-theme itself is set by the inline script in <head>, before first paint
function applyTheme() {
  const theme = document.documentElement.getAttribute("data-theme") || "light";
  const icon = document.querySelector("#theme-toggle i");
  if (icon) icon.className = theme === "light" ? "fas fa-sun" : "fas fa-moon";
  updateThemeLabel();
}

// Wrap each word of the hero name in a mask so it can slide up into view
function splitWords(el) {
  el.innerHTML = el.textContent.trim().split(/\s+/).map(w =>
    `<span class="inline-block overflow-hidden align-bottom pb-[0.08em]"><span class="inline-block" data-word>${w}</span></span>`
  ).join(" ");
}

// All animation goes through Motion (vendor/motion). Skipped entirely under prefers-reduced-motion;
// the CSS only hides [data-reveal]/[data-stagger] when motion is allowed, so content is never stuck hidden.
// Timings are short and snappy to fit the neo-brutalist look.
function initMotion() {
  if (!window.Motion || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const { animate, inView, stagger } = Motion;
  const ease = [0.22, 1, 0.36, 1];
  const pop = [0.34, 1.56, 0.64, 1];

  const name = document.getElementById("hero-name");
  splitWords(name);
  animate(name, { opacity: [0, 1], scale: [0.9, 1] }, { duration: 0.4, delay: 0.1, ease: pop });
  animate(name.querySelectorAll("[data-word]"), { y: ["110%", "0%"] }, { duration: 0.6, delay: stagger(0.08, { startDelay: 0.2 }), ease });

  document.querySelectorAll("[data-reveal]").forEach(el => {
    const delay = el.closest("#beranda") ? 0.3 : 0;
    inView(el, () => { animate(el, { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, delay, ease }); }, { amount: 0.15 });
  });

  document.querySelectorAll("[data-stagger]").forEach(el => {
    inView(el, () => {
      animate(el.children, { opacity: [0, 1], y: [24, 0], scale: [0.96, 1] }, { duration: 0.45, delay: stagger(0.06), ease: pop })
        .then(() => el.classList.add("is-in"));
    }, { amount: 0.1 });
  });

  document.querySelectorAll("[data-count]").forEach(el => {
    inView(el, () => {
      const target = +el.dataset.count;
      animate(0, target, { duration: 1.2, ease, onUpdate: v => { el.textContent = Math.round(v) + el.dataset.suffix; } });
    }, { amount: 0.6 });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("year").textContent = new Date().getFullYear();

  applyLang();
  applyTheme();
  initMotion();

  // Navbar gets a hard shadow once the page scrolls
  const nav = document.getElementById("navbar");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
