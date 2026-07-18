const en = {
  nav: ["Home", "About", "Skills", "Portfolio", "Contact"],
  greeting: "Hello, I'm",
  heroSub: "Information Management & GIS for humanitarian data and emergency response.",
  sections: {
    tentang: "ABOUT ME",
    keahlian: "SKILLS",
    sertifikat: "CERTIFICATIONS",
    portofolio: "PORTFOLIO",
    kontak: "CONTACT"
  },
  keahlianSub: "Tools, platforms, and competencies in humanitarian data management and GIS.",
  sertifikatSub: "National & international trainings and certifications.",
  portofolioSub: "5+ products - dashboard, infographics, mapping, web apps, and e-learning.",
  kontakSub: "For collaboration, further information, or humanitarian data needs.",
  stats: ["Years Experience", "Assignments", "Trainings", "Products"],
  tentangTitle: "About Me",
  kompetensiUtama: "Core Competencies",
  about: [
    "Joined PMI (Indonesian Red Cross) since 2015, experienced in Information Management (IM), disaster emergency response, and humanitarian data management.",
    "Involved in over 30 assignments - from earthquake, tsunami, flood, drought, to pandemic response - in roles such as Post Coordinator, Relief Distributor, and IT Officer. Focused on Information Management (IM) in every operation: managing, presenting, and distributing accurate and timely humanitarian data to support decision-making. Also skilled in GIS, dashboard development, and data visualization."
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
    { name: "PMI South Sulawesi Training Dashboard", desc: "Google Sites-based dashboard monitoring KSR PMI training across South Sulawesi." },
    { name: "South Sulawesi Drought Service Infographic", desc: "Infographic of South Sulawesi drought operation - coverage, personnel, and aid." },
    { name: "PMI Branch Mapping Across Indonesia", desc: "OpenStreetMap contribution mapping PMI branches throughout Indonesia." },
    { name: "E-Learning IM Cell PMI", desc: "Information Management learning platform for PMI IM Cell team. Practical, field-ready materials." },
    { name: "Simple Score", desc: "Web-based scoring & loan management app (React, Node.js, PostgreSQL)." }
  ],
  selengkapnya: "Learn More"
};

let currentLang = localStorage.getItem("lang") || "id";
