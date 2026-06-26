const year = document.querySelector("#year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const navSections = navLinks
  .map((link) => {
    const section = document.querySelector(link.getAttribute("href"));

    return section ? { link, section } : null;
  })
  .filter(Boolean);

if (navSections.length > 0) {
  let ticking = false;

  const updateActiveNav = () => {
    const marker = Math.min(window.innerHeight * 0.38, 340);
    const nearPageBottom =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    const activeItem = nearPageBottom
      ? navSections[navSections.length - 1]
      : navSections.find(({ section }) => {
          const rect = section.getBoundingClientRect();

          return rect.top <= marker && rect.bottom > marker;
        });

    navSections.forEach(({ link }) => {
      const isActive = link === activeItem?.link;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    ticking = false;
  };

  const requestActiveNavUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateActiveNav);
  };

  updateActiveNav();
  window.addEventListener("scroll", requestActiveNavUpdate, { passive: true });
  window.addEventListener("resize", requestActiveNavUpdate);
}
