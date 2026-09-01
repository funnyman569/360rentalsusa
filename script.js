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

bookingForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const status = document.getElementById("formStatus");
  const button = bookingForm.querySelector("button[type='submit']");
  const form = new FormData(bookingForm);

  // Skip if honeypot was filled (spam bot)
  if (String(form.get("_honey") || "").trim() !== "") return;

  const originalNote = status.textContent;
  const originalButton = button.textContent;
  status.textContent = "Sending…";
  button.disabled = true;
  button.textContent = "Sending…";

  try {
    const response = await fetch("https://formsubmit.co/ajax/hayden@360rentalsusa.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.fromEntries(form))
    });
    const data = await response.json();
    if (response.ok && data.success === "true") {
      status.textContent = "Thanks! Your inquiry was sent. Hayden will follow up shortly.";
      bookingForm.reset();
    } else {
      throw new Error(data.message || "Send failed");
    }
  } catch (err) {
    status.textContent = "Sorry — something went wrong sending your inquiry. Please email hayden@360rentalsusa.com directly.";
    console.error(err);
  } finally {
    button.disabled = false;
    button.textContent = originalButton;
  }
});

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});