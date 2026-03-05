const maskContainer = document.getElementById("mask-container");
const maskLayer = document.getElementById("mask-layer");

if (maskContainer && maskLayer) {
  // Variabler for posisjon og fysikk
  let mouseX = 300,
    mouseY = 300; // Mål-posisjon (der musen er)
  let currentX = 300,
    currentY = 300; // Nåværende posisjon for sirkelen
  let isHovering = false;

  // Oppdater mål-posisjonen når musen beveger seg
  maskContainer.addEventListener("mousemove", (e) => {
    const rect = maskContainer.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  maskContainer.addEventListener("mouseenter", () => {
    isHovering = true;
  });
  maskContainer.addEventListener("mouseleave", () => {
    isHovering = false;
  });

  // Animasjons-loopen (kjører ca. 60 ganger i sekundet)
  function animate() {
    if (isHovering) {
      // 1. Beregn avstanden (hastigheten) mellom sirkelen og musen
      let velX = mouseX - currentX;
      let velY = mouseY - currentY;

      // 2. Legg til "easing" (mykhet) - sirkelen henger litt etter musen
      currentX += velX * 0.15; // Tallet (0.15) styrer hvor seig den føles
      currentY += velY * 0.15;

      // 3. Beregn "Squish"-effekten basert på hastigheten
      // Jo raskere du drar (høy velX/velY), jo mer strekkes den
      let stretchX = Math.min(Math.abs(velX) * 1.5, 100); // Maks 100px strekk
      let stretchY = Math.min(Math.abs(velY) * 1.5, 100);

      // 4. For at det skal se ut som gelé, må vi klemme den inn på motsatt akse
      let rx = 150 + stretchX - stretchY * 0.3; // Basisstørrelse 150px
      let ry = 150 + stretchY - stretchX * 0.3;

      // Pass på at den aldri klapper helt sammen
      rx = Math.max(rx, 80);
      ry = Math.max(ry, 80);

      // Oppdater CSS-variablene live
      maskLayer.style.setProperty("--x", `${currentX}px`);
      maskLayer.style.setProperty("--y", `${currentY}px`);
      maskLayer.style.setProperty("--rx", `${rx}px`);
      maskLayer.style.setProperty("--ry", `${ry}px`);
    }

    // Få nettleseren til å kjøre funksjonen på nytt i neste frame
    requestAnimationFrame(animate);
  }

  // Start fysikk-motoren vår
  animate();
}
