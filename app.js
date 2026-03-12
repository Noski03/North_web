// 1. GLOBE REVEAL LOGIKK
const maskContainer = document.querySelector(".reveal-container");
const maskLayer = document.querySelector(".mask-layer");

if (maskContainer && maskLayer) {
  let mouseX = 300,
    mouseY = 300,
    currentX = 300,
    currentY = 300;
  let isHovering = false;

  const handleMove = (e) => {
    const rect = maskContainer.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    mouseX = clientX - rect.left;
    mouseY = clientY - rect.top;
  };

  maskContainer.addEventListener("mousemove", handleMove);
  maskContainer.addEventListener("mouseenter", () => (isHovering = true));
  maskContainer.addEventListener("mouseleave", () => (isHovering = false));
  maskContainer.addEventListener(
    "touchstart",
    (e) => {
      isHovering = true;
      handleMove(e);
    },
    { passive: false },
  );
  maskContainer.addEventListener("touchmove", handleMove, { passive: false });
  maskContainer.addEventListener("touchend", () => (isHovering = false));

  function animateGlobe() {
    if (isHovering) {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      let rx = 150 + Math.abs(mouseX - currentX) * 0.5;
      let ry = 150 + Math.abs(mouseY - currentY) * 0.5;
      maskLayer.style.setProperty("--x", `${currentX}px`);
      maskLayer.style.setProperty("--y", `${currentY}px`);
      maskLayer.style.setProperty("--rx", `${Math.max(rx, 100)}px`);
      maskLayer.style.setProperty("--ry", `${Math.max(ry, 100)}px`);
    }
    requestAnimationFrame(animateGlobe);
  }
  animateGlobe();
}

// 2. HAMBURGERMENY
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// 3. PARTICLES.JS KONFIGURASJON (LYS MODUS)
particlesJS("particles-js", {
  particles: {
    number: { value: 85, density: { enable: true, value_area: 800 } },
    color: { value: "#0ea5e9" },
    shape: { type: "circle" },
    opacity: { value: 0.6 },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#0ea5e9",
      opacity: 0.4,
      width: 1,
    },
    move: { enable: true, speed: 1.5, out_mode: "bounce" },
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 1 } },
    },
  },
  retina_detect: true,
});
