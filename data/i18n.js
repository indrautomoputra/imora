const en = {
  nav: ["Home", "About", "Skills", "Portfolio", "Contact"],
  greeting: "Hello, I'm",
  heroTag: "Data & Information Management · GIS · Emergency Response",
  heroSub: "Information Management & GIS for humanitarian data and emergency response.",
  heroCta: ["See Portfolio", "Contact Me"],
  downloadCv: "Download CV (PDF, Indonesian)",
  sections: {
    keahlian: "Skills",
    sertifikat: "Certifications",
    portofolio: "Portfolio",
    kontak: "Get in Touch"
  },
  keahlianSub: "Tools and platforms I use for humanitarian data management and GIS.",
  sertifikatSub: "National & international trainings and certifications.",
  portofolioSub: "6+ products - dashboards, infographics, mapping, web apps, and e-learning.",
  kontakSub: "For collaboration, further information, or humanitarian data needs.",
  stats: ["Years Experience", "Assignments", "Trainings", "Products"],
  tentangTitle: "About Me",
  about: [
    "Joined PMI (Indonesian Red Cross) in 2015, experienced in Information Management (IM), disaster emergency response, and humanitarian data management.",
    "Focused on Information Management in every operation: managing, presenting, and distributing accurate, timely humanitarian data to support decision-making."
  ],
  facts: [
    { title: "Response Experience", items: ["Earthquake", "Tsunami", "Flood", "Drought", "Pandemic"] },
    { title: "Field Roles", items: ["Post Coordinator", "Relief Distribution", "IT Officer"] },
    { title: "Supporting Skills", items: ["GIS", "Dashboards", "Data Visualization"] }
  ],
  skillGroups: {
    "GIS & Pemetaan": "GIS & Mapping",
    "Data & Analisis": "Data & Analysis",
    "Manajemen Informasi": "Information Management",
    "Web Development": "Web Development"
  },
  certs: [
    "GIS Training - PMI Pusat",
    "Emergency Areas & Camp Management - Italian Red Cross",
    "CEA Orientation - PMI Pusat",
    "Disaster Impact Prediction - Pacmann.io",
    "OSM Training - OpenStreetMap Indonesia",
    "Information Management Training - PMI Pusat",
    "ICRC - COVID-19 Corpse Management",
    "12x Microsoft Learn - Power BI & Data Analytics"
  ],
  products: [
    { name: "PMI Drought Operation Dashboard 2026", desc: "Interactive dashboard for PMI's drought emergency response: 8,000+ activities, 43+ million liters of clean water, and 2.5+ million beneficiaries across 126 districts/cities." },
    { name: "PMI South Sulawesi Training Dashboard", desc: "Google Sites-based dashboard monitoring KSR PMI training across South Sulawesi." },
    { name: "South Sulawesi Drought Service Infographic", desc: "Infographic of South Sulawesi drought operation - coverage, personnel, and aid." },
    { name: "PMI Branch Mapping Across Indonesia", desc: "OpenStreetMap contribution mapping PMI branches throughout Indonesia." },
    { name: "E-Learning IM Cell PMI", desc: "Information Management learning platform for PMI IM Cell team. Practical, field-ready materials." },
    { name: "Simple Score", desc: "Web-based scoring & loan management app (React, Node.js, PostgreSQL)." }
  ],
  types: {
    infografis: "infographic",
    aplikasi: "app"
  },
  trainingSites: "Training sites",
  lihat: "View project"
};

let currentLang = "id";
try { currentLang = localStorage.getItem("lang") || "id"; } catch (e) {} // throws when site storage is blocked
