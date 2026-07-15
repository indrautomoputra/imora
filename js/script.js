function typeIcon(type) {
  const icons = {
    infografis:  { icon: 'fas fa-chart-pie',              bg: 'bg-green-500/20 text-green-400' },
    peta:        { icon: 'fas fa-map',                    bg: 'bg-blue-500/20 text-blue-400' },
    laporan:     { icon: 'fas fa-file-alt',               bg: 'bg-yellow-500/20 text-yellow-400' },
    dashboard:   { icon: 'fas fa-tachometer-alt',         bg: 'bg-purple-500/20 text-purple-400' },
    desain:      { icon: 'fas fa-paint-brush',            bg: 'bg-pink-500/20 text-pink-400' },
    aplikasi:    { icon: 'fas fa-code',                   bg: 'bg-cyan-500/20 text-cyan-400' }
  };
  return icons[type] || { icon: 'fas fa-file', bg: 'bg-gray-500/20 text-gray-400' };
}

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
    return `<div data-aos="fade-up">
      <div class="text-4xl md:text-5xl font-extrabold text-accent mb-2">${s.value}</div>
      <div class="text-gray-400 text-sm uppercase tracking-wider">${label}</div>
    </div>`;
  }).join("");
  AOS.refresh();
}

function renderSkillTags() {
  const el = document.querySelector("#skills-tags-container > div");
  if (!el) return;
  const all = Object.values(profile.skills).flat();
  el.innerHTML = all.map(s =>
    `<span class="bg-[var(--tag-bg)] text-text px-4 py-1 rounded-full text-sm border border-gray-700">${s.name}</span>`
  ).join("");
}

function renderSkills() {
  const el = document.getElementById("skills-groups");
  if (!el) return;
  const groups = Object.entries(profile.skills);
  el.innerHTML = groups.map(([groupName, items], gi) => {
    const label = tr(`skillGroups.${groupName}`) || groupName;
    return `<div data-aos="fade-up" data-aos-delay="${gi * 100}">
      <h3 class="text-2xl font-bold text-accent mb-6 text-center">${label}</h3>
      <div class="flex flex-wrap justify-center gap-6">
        ${items.map((s, i) => `
           <div class="group bg-[var(--card-bg)] border border-gray-700 rounded-xl p-6 shadow-md transition-all duration-300 transform hover:scale-105 hover:border-accent hover:shadow-[0_0_20px_#e11d4844] w-44 text-center"
                data-aos="zoom-in" data-aos-delay="${i * 80}">
            <i class="fas ${s.icon} text-3xl text-accent mb-3 transition-transform group-hover:scale-110 inline-block"></i>
            <p class="font-semibold text-text text-sm">${s.name}</p>
          </div>
        `).join('')}
      </div>
    </div>`;
  }).join('');
  AOS.refresh();
}

function renderCerts() {
  const el = document.getElementById("cert-badges");
  if (!el) return;
  const items = currentLang === "en" ? (en.certs || certs) : certs;
  el.innerHTML = items.map(c =>
    `<span class="bg-[var(--card-bg)] border border-gray-700 text-gray-300 px-5 py-2.5 rounded-full text-sm hover:border-accent transition-all">${c}</span>`
  ).join("");
}

function renderProducts() {
  const el = document.getElementById("products-container");
  if (!el) return;
  el.innerHTML = products.map((p, i) => {
    const name = tr(`products.${i}.name`) || p.name;
    const desc = tr(`products.${i}.desc`) || p.desc;
    const ic = typeIcon(p.type);
    return `<a href="${p.url}" target="_blank" rel="noopener noreferrer"
        class="group bg-[var(--card-bg)] border border-gray-700 rounded-xl p-6 transition-all hover:border-accent hover:shadow-xl hover:-translate-y-1"
        data-aos="zoom-in-up" data-aos-delay="${i * 80}">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg ${ic.bg}">
            <i class="${ic.icon}"></i>
          </div>
          <span class="text-xs text-gray-500 font-mono">${p.year}</span>
        </div>
        <h3 class="text-base font-semibold mb-1 group-hover:text-accent transition-colors">${name}</h3>
        <p class="text-xs text-gray-400 mb-3 leading-relaxed">${desc}</p>
        <div class="flex items-center justify-between">
          <span class="text-xs uppercase tracking-wider text-gray-500">${p.type}</span>
          <span class="text-accent text-sm group-hover:translate-x-1 transition-transform"><i class="fas fa-arrow-right"></i></span>
        </div>
      </a>`;
  }).join('');
  AOS.refresh();
}

function renderAbout() {
  const ps = document.querySelectorAll("#tentang .max-w-3xl.mx-auto");
  if (ps.length >= 2) {
    ps[0].textContent = tr("about.0") || profile.about[0];
    ps[1].textContent = tr("about.1") || profile.about[1];
  }
}

function applyLang() {
  document.documentElement.lang = currentLang;

  // Update data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach(el => {
    if (!el.dataset.i18nId) el.dataset.i18nId = el.textContent;
    if (currentLang === "en") {
      const val = tr(el.dataset.i18n);
      if (val) el.textContent = val;
    } else {
      el.textContent = el.dataset.i18nId;
    }
  });

  // Toggle buttons
  document.querySelector("#lang-toggle span").textContent = currentLang === "id" ? "EN" : "ID";
  updateThemeLabel();

  // Re-render dynamic sections
  renderStats();
  renderSkillTags();
  renderSkills();
  renderCerts();
  renderProducts();
  renderAbout();
}

function switchLang() {
  currentLang = currentLang === "id" ? "en" : "id";
  localStorage.setItem("lang", currentLang);
  applyLang();
}

function toggleTheme() {
  const theme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const icon = document.querySelector("#theme-toggle i");
  icon.className = theme === "light" ? "fas fa-sun" : "fas fa-moon";
  updateThemeLabel();
}

function updateThemeLabel() {
  const theme = document.documentElement.getAttribute("data-theme") || "dark";
  const label = document.getElementById("theme-label");
  if (currentLang === "id") label.textContent = theme === "light" ? "Terang" : "Gelap";
  else label.textContent = theme === "light" ? "Light" : "Dark";
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const ham = document.getElementById("hamburger-icon");
  const close = document.getElementById("close-icon");
  menu.classList.toggle("hidden");
  ham.classList.toggle("hidden");
  close.classList.toggle("hidden");
}

function closeMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const ham = document.getElementById("hamburger-icon");
  const close = document.getElementById("close-icon");
  menu.classList.add("hidden");
  ham.classList.remove("hidden");
  close.classList.add("hidden");
}

function applyTheme() {
  const theme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", theme);
  const icon = document.querySelector("#theme-toggle i");
  if (icon) icon.className = theme === "light" ? "fas fa-sun" : "fas fa-moon";
  updateThemeLabel();
}

document.addEventListener("DOMContentLoaded", function () {
  // --- Typing ---
  const nameEl = document.getElementById("typed-name");
  const cursorEl = document.getElementById("cursor");
  const fullName = "Indra";
  let idx = 0;
  function type() {
    cursorEl.classList.remove("cursor-hidden");
    cursorEl.style.animation = "blink 1s step-end infinite";
    if (idx < fullName.length) {
      nameEl.textContent += fullName.charAt(idx);
      idx++;
      setTimeout(type, 120);
    } else {
      cursorEl.classList.add("cursor-hidden");
      cursorEl.style.animation = "none";
    }
  }
  setTimeout(type, 800);

  // --- Profile photo ---
  const img = new Image();
  img.onload = function () {
    document.getElementById("profile-photo").style.backgroundImage = "url(assets/images/profile.jpg)";
    document.getElementById("profile-photo").style.backgroundSize = "cover";
    document.getElementById("profile-photo").style.backgroundPosition = "50% 15%";
    document.getElementById("profile-initials").style.display = "none";
  };
  img.src = "assets/images/profile.jpg";

  // --- AOS ---
  AOS.init({ duration: 800, once: true });

  // --- Apply saved language & theme ---
  applyLang();
  applyTheme();
});
