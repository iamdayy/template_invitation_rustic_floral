/* ============================================================
   Rustic Floral Wedding Invitation - Main JavaScript
   ============================================================ */

/* ---- Config: edit these values to customize the invitation ---- */
const CONFIG = {
  groomName: "Budi Santoso",
  brideName: "Sari Dewi",
  weddingDate: "2025-08-17T08:00:00", // ISO date-time of the ceremony
  akad: {
    date: "17 Agustus 2025",
    time: "08.00 – 10.00 WIB",
    venue: "Masjid Al-Hikmah",
    address: "Jl. Mawar No. 12, Jakarta Selatan",
    mapsUrl: "https://maps.google.com/?q=Masjid+Al-Hikmah+Jakarta+Selatan",
  },
  resepsi: {
    date: "17 Agustus 2025",
    time: "11.00 – 15.00 WIB",
    venue: "Taman Bunga Garden Hall",
    address: "Jl. Kenanga No. 45, Jakarta Selatan",
    mapsUrl: "https://maps.google.com/?q=Taman+Bunga+Garden+Hall+Jakarta",
  },
  youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ", // replace with actual video ID
  gallery: [
    // Replace src values with actual image URLs or paths (assets/images/photo1.jpg, etc.)
    { src: "", caption: "Momen Pertama" },
    { src: "", caption: "Bersama Keluarga" },
    { src: "", caption: "Lokasi Favorit" },
    { src: "", caption: "Sesi Outdoor" },
    { src: "", caption: "Golden Hour" },
    { src: "", caption: "Candid Moment" },
    { src: "", caption: "Taman Bunga" },
    { src: "", caption: "Sunset Session" },
    { src: "", caption: "Ekspresi Jujur" },
    { src: "", caption: "Happy Ending" },
  ],
  gift: [
    {
      type: "bank",
      bank: "BCA",
      account: "1234567890",
      name: "Budi Santoso",
    },
    {
      type: "bank",
      bank: "Mandiri",
      account: "0987654321",
      name: "Sari Dewi",
    },
    {
      type: "ewallet",
      provider: "GoPay / OVO",
      account: "0812-3456-7890",
      name: "Budi & Sari",
      qr: "", // path to QR code image, e.g. "assets/images/qr-gopay.png"
    },
  ],
};

/* =================== OPENING COVER =================== */
function openInvitation() {
  const cover = document.getElementById("opening-cover");
  if (cover) {
    cover.classList.add("hide");
    setTimeout(() => {
      cover.style.display = "none";
      document.body.style.overflow = "";
      startPetals();
    }, 900);
  }
}

/* =================== NAVBAR =================== */
function initNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 120) {
      nav.classList.add("visible");
    } else {
      nav.classList.remove("visible");
    }
  });
}

/* =================== FALLING PETALS =================== */
const PETAL_COLORS = [
  "#e8b4a0",
  "#d4876a",
  "#c89070",
  "#f2cfc0",
  "#dba090",
  "#b5d4b0",
  "#c8e0c0",
];

function createPetal() {
  const container = document.getElementById("petals-container");
  if (!container) return;
  const petal = document.createElement("div");
  petal.classList.add("petal");

  const size = Math.random() * 10 + 8;
  petal.style.width = size + "px";
  petal.style.height = size + "px";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = Math.random() * 6 + 6 + "s";
  petal.style.animationDelay = Math.random() * 4 + "s";
  petal.style.backgroundColor =
    PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
  petal.style.borderRadius = Math.random() > 0.5 ? "50% 0 50% 0" : "50%";
  petal.style.opacity = "0";

  container.appendChild(petal);

  // remove after animation cycle
  const duration =
    (parseFloat(petal.style.animationDuration) +
      parseFloat(petal.style.animationDelay)) *
    1000;
  setTimeout(() => petal.remove(), duration + 500);
}

let petalInterval = null;

function startPetals() {
  if (petalInterval) return;
  // create initial batch
  for (let i = 0; i < 8; i++) setTimeout(createPetal, i * 400);
  // keep spawning
  petalInterval = setInterval(() => {
    for (let i = 0; i < 2; i++) createPetal();
  }, 1200);
}

/* =================== COUNTDOWN =================== */
function updateCountdown() {
  const target = new Date(CONFIG.weddingDate).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("cd-days").textContent = "00";
    document.getElementById("cd-hours").textContent = "00";
    document.getElementById("cd-minutes").textContent = "00";
    document.getElementById("cd-seconds").textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n) => String(n).padStart(2, "0");
  document.getElementById("cd-days").textContent = pad(days);
  document.getElementById("cd-hours").textContent = pad(hours);
  document.getElementById("cd-minutes").textContent = pad(minutes);
  document.getElementById("cd-seconds").textContent = pad(seconds);
}

function initCountdown() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* =================== GALLERY =================== */
let currentSlide = 0;
const GALLERY = CONFIG.gallery;

function renderGallery() {
  const mainContainer = document.getElementById("gallery-main");
  const thumbContainer = document.getElementById("gallery-thumbs");
  if (!mainContainer || !thumbContainer) return;

  mainContainer.innerHTML = "";
  thumbContainer.innerHTML = "";

  GALLERY.forEach((item, i) => {
    // Main slide
    const slide = document.createElement("div");
    slide.classList.add("gallery-slide");
    if (i === 0) slide.classList.add("active");
    slide.dataset.index = i;

    if (item.src) {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.caption;
      img.className =
        "w-full rounded-2xl object-cover cursor-pointer shadow-lg";
      img.style.maxHeight = "480px";
      img.style.width = "100%";
      img.addEventListener("click", () => openLightbox(item.src, item.caption));
      slide.appendChild(img);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "photo-placeholder rounded-2xl shadow-lg";
      placeholder.style.height = "380px";
      placeholder.innerHTML = `<div class="text-center px-4">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto mb-2 opacity-60">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <span class="block text-sm opacity-70">Foto ${i + 1}</span>
        <span class="block text-xs opacity-50 mt-1">${item.caption}</span>
      </div>`;
      slide.appendChild(placeholder);
    }

    // Caption
    if (item.caption) {
      const cap = document.createElement("p");
      cap.className = "text-center mt-3 text-sm font-medium";
      cap.style.color = "var(--text-medium)";
      cap.textContent = item.caption;
      slide.appendChild(cap);
    }

    mainContainer.appendChild(slide);

    // Thumbnail
    const thumb = document.createElement("div");
    thumb.classList.add("gallery-thumb");
    if (i === 0) thumb.classList.add("active");
    thumb.dataset.index = i;
    thumb.style.width = "56px";
    thumb.style.height = "56px";
    thumb.style.flexShrink = "0";

    if (item.src) {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.caption;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      thumb.appendChild(img);
    } else {
      thumb.style.background =
        "linear-gradient(135deg, var(--cream-dark), var(--brown-light))";
      thumb.style.display = "flex";
      thumb.style.alignItems = "center";
      thumb.style.justifyContent = "center";
      thumb.innerHTML = `<span style="color:rgba(255,255,255,0.7);font-size:0.65rem;">${i + 1}</span>`;
    }

    thumb.addEventListener("click", () => goToSlide(i));
    thumbContainer.appendChild(thumb);
  });

  updateGalleryNav();
}

function goToSlide(index) {
  const slides = document.querySelectorAll(".gallery-slide");
  const thumbs = document.querySelectorAll(".gallery-thumb");
  if (!slides.length) return;

  slides[currentSlide].classList.remove("active");
  thumbs[currentSlide].classList.remove("active");

  currentSlide = (index + GALLERY.length) % GALLERY.length;

  slides[currentSlide].classList.add("active");
  thumbs[currentSlide].classList.add("active");

  // Scroll thumb into view
  thumbs[currentSlide].scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });

  updateGalleryNav();
}

function updateGalleryNav() {
  const counter = document.getElementById("gallery-counter");
  if (counter) counter.textContent = `${currentSlide + 1} / ${GALLERY.length}`;
}

function initGallery() {
  renderGallery();

  document.getElementById("gallery-prev")?.addEventListener("click", () => {
    goToSlide(currentSlide - 1);
  });

  document.getElementById("gallery-next")?.addEventListener("click", () => {
    goToSlide(currentSlide + 1);
  });

  // Auto-play every 4 seconds
  setInterval(() => goToSlide(currentSlide + 1), 4000);
}

/* =================== LIGHTBOX =================== */
function openLightbox(src, caption) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  if (!lb || !img) return;
  img.src = src;
  img.alt = caption || "";
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  if (!lb) return;
  lb.classList.remove("open");
  document.body.style.overflow = "";
}

function initLightbox() {
  const lb = document.getElementById("lightbox");
  if (!lb) return;
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

/* =================== COPY TO CLIPBOARD =================== */
function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast("Disalin! ✓"));
  } else {
    // Fallback
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    showToast("Disalin! ✓");
  }
}

/* =================== TOAST =================== */
let toastTimeout = null;

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2500);
}

/* =================== GIFT / ANGPAO =================== */
function renderGift() {
  const container = document.getElementById("gift-container");
  if (!container) return;

  container.innerHTML = "";

  CONFIG.gift.forEach((item) => {
    const card = document.createElement("div");
    card.className = "gift-card";

    if (item.type === "bank") {
      card.innerHTML = `
        <div class="flex items-center justify-center mb-3">
          <span class="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
            style="background:var(--cream-dark);color:var(--brown-dark);">${item.bank}</span>
        </div>
        <p class="text-2xl font-bold tracking-widest mb-1" style="color:var(--brown-dark);font-family:'Playfair Display',serif;">${item.account}</p>
        <p class="text-sm mb-4" style="color:var(--text-light);">a.n. ${item.name}</p>
        <button class="copy-btn" onclick="copyText('${item.account}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Salin Nomor
        </button>
      `;
    } else if (item.type === "ewallet") {
      card.innerHTML = `
        <div class="flex items-center justify-center mb-3">
          <span class="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
            style="background:var(--cream-dark);color:var(--green-dark);">${item.provider}</span>
        </div>
        ${
          item.qr
            ? `<img src="${item.qr}" alt="QR Code" class="mx-auto mb-3 rounded-lg" style="width:120px;height:120px;object-fit:contain;">`
            : `<div class="qr-placeholder mb-3"><span>QR Code<br>E-Wallet<br><small>(ganti dengan<br>gambar QR Anda)</small></span></div>`
        }
        <p class="text-xl font-bold tracking-wide mb-1" style="color:var(--brown-dark);">${item.account}</p>
        <p class="text-sm mb-4" style="color:var(--text-light);">a.n. ${item.name}</p>
        <button class="copy-btn" onclick="copyText('${item.account}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Salin Nomor
        </button>
      `;
    }

    container.appendChild(card);
  });
}

/* =================== ADD TO CALENDAR =================== */
function buildCalendarLinks() {
  const start = new Date(CONFIG.weddingDate);
  const end = new Date(start.getTime() + 7 * 60 * 60 * 1000); // +7 hours

  const pad = (n) => String(n).padStart(2, "0");
  const fmt = (d) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

  const title = encodeURIComponent(
    `Pernikahan ${CONFIG.groomName} & ${CONFIG.brideName}`
  );
  const details = encodeURIComponent(
    `Pernikahan ${CONFIG.groomName} & ${CONFIG.brideName}\n\nAkad: ${CONFIG.akad.venue}, ${CONFIG.akad.address}\nResepsi: ${CONFIG.resepsi.venue}, ${CONFIG.resepsi.address}`
  );
  const location = encodeURIComponent(CONFIG.resepsi.address);

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(start)}/${fmt(end)}&details=${details}&location=${location}`;

  // ICS for Apple Calendar
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Rustic Floral//Wedding//EN",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Pernikahan ${CONFIG.groomName} & ${CONFIG.brideName}`,
    `DESCRIPTION:Akad: ${CONFIG.akad.venue}\\nResepsi: ${CONFIG.resepsi.venue}`,
    `LOCATION:${CONFIG.resepsi.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const icsBlob = new Blob([icsContent], { type: "text/calendar" });
  const icsUrl = URL.createObjectURL(icsBlob);

  const googleBtn = document.getElementById("btn-google-cal");
  const appleBtn = document.getElementById("btn-apple-cal");

  if (googleBtn) googleBtn.href = googleUrl;
  if (appleBtn) {
    appleBtn.href = icsUrl;
    appleBtn.download = "wedding-invitation.ics";
  }
}

/* =================== RSVP FORM =================== */
function initRsvp() {
  const form = document.getElementById("rsvp-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="rsvp-name"]').value.trim();
    const attend = form.querySelector('[name="rsvp-attend"]:checked')?.value;
    const guests = form.querySelector('[name="rsvp-guests"]').value;

    if (!name) {
      showToast("Silakan masukkan nama Anda 😊");
      return;
    }

    // Here you would normally send to a backend / Google Sheets via fetch()
    showToast(
      attend === "yes"
        ? `Terima kasih, ${name}! Kami tunggu kedatangannya 🌸`
        : `Terima kasih ${name}, semoga selalu sehat 🌿`
    );
    form.reset();
  });
}

/* =================== REVEAL ON SCROLL =================== */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* =================== SMOOTH SCROLL NAV =================== */
function initSmoothScroll() {
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/* =================== INJECT DYNAMIC CONTENT =================== */
function injectDynamicContent() {
  // Couple names
  document.querySelectorAll("[data-groom]").forEach((el) => {
    el.textContent = CONFIG.groomName;
  });
  document.querySelectorAll("[data-bride]").forEach((el) => {
    el.textContent = CONFIG.brideName;
  });
  document.querySelectorAll("[data-couple]").forEach((el) => {
    el.textContent = `${CONFIG.groomName} & ${CONFIG.brideName}`;
  });

  // Event details
  const fields = {
    "[data-akad-date]": CONFIG.akad.date,
    "[data-akad-time]": CONFIG.akad.time,
    "[data-akad-venue]": CONFIG.akad.venue,
    "[data-akad-address]": CONFIG.akad.address,
    "[data-resepsi-date]": CONFIG.resepsi.date,
    "[data-resepsi-time]": CONFIG.resepsi.time,
    "[data-resepsi-venue]": CONFIG.resepsi.venue,
    "[data-resepsi-address]": CONFIG.resepsi.address,
  };

  Object.entries(fields).forEach(([selector, value]) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  });

  // Maps links
  document.querySelectorAll("[data-akad-maps]").forEach((el) => {
    el.href = CONFIG.akad.mapsUrl;
  });
  document.querySelectorAll("[data-resepsi-maps]").forEach((el) => {
    el.href = CONFIG.resepsi.mapsUrl;
  });

  // YouTube embed
  const iframe = document.getElementById("video-embed");
  if (iframe) iframe.src = CONFIG.youtube + "?rel=0&modestbranding=1";
}

/* =================== INIT =================== */
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.overflow = "hidden"; // locked until cover opens

  injectDynamicContent();
  initNav();
  initCountdown();
  initGallery();
  initLightbox();
  renderGift();
  buildCalendarLinks();
  initRsvp();
  initReveal();
  initSmoothScroll();
});
