const bookingForm = document.querySelector("#bookingForm");
const menuButton = document.querySelector("[data-menu-button]");
const siteNav = document.querySelector("[data-site-nav]");
const siteHeader = document.querySelector("[data-site-header]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Hero video: play once, pause on last frame
const heroVideo = document.querySelector(".hero-video");
const heroFallback = document.querySelector(".hero-fallback");
if (heroVideo && !reducedMotion) {
  heroVideo.addEventListener("ended", () => {
    heroVideo.pause();
  });
  // Ensure it doesn't loop
  heroVideo.removeAttribute("loop");
} else if (heroVideo) {
  // Reduced motion: show fallback instead of video
  heroVideo.remove();
  if (heroFallback) heroFallback.style.display = "block";
}

const closeMenu = () => {
  if (!menuButton || !siteNav) return;
  menuButton.setAttribute("aria-expanded", "false");
  siteNav.removeAttribute("data-open");
  document.body.classList.remove("nav-open");
};

menuButton?.addEventListener("click", () => {
  const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(willOpen));
  siteNav?.toggleAttribute("data-open", willOpen);
  document.body.classList.toggle("nav-open", willOpen);
});

siteNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const updateHeader = () => siteHeader?.toggleAttribute("data-scrolled", window.scrollY > 24);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll("[data-reveal]");
if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.setAttribute("data-visible", ""));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-visible", "");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.14 }
  );
  revealItems.forEach((item) => observer.observe(item));
}

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(bookingForm);
  const name = String(form.get("name") || "");
  const email = String(form.get("email") || "");
  const phone = String(form.get("phone") || "");
  const date = String(form.get("date") || "");
  const eventType = String(form.get("eventType") || "");
  const packageInterest = String(form.get("package") || "");
  const details = String(form.get("details") || "");

  const subject = encodeURIComponent(`360 Rentals availability request from ${name || "website"}`);
  const body = encodeURIComponent(
    [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Event date: ${date || "Not provided"}`,
      `Event type: ${eventType}`,
      `Package interest: ${packageInterest}`,
      "",
      "Event details:",
      details || "Not provided"
    ].join("\n")
  );

  window.location.href = `mailto:hello@360rentalsusa.com?subject=${subject}&body=${body}`;
});

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});