/* =========================================================
   PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  const sidebarClose = document.getElementById("sidebarClose");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const scrollTop = document.getElementById("scrollTop");
  const year = document.getElementById("year");
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  // ==================== DYNAMIC YEAR ====================
  year.textContent = new Date().getFullYear();

  // ==================== MOBILE MENU ====================
  function closeMenu() {
    sidebar.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }

  menuToggle.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    menuToggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  sidebarClose.addEventListener("click", closeMenu);

  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) scrollTop.classList.add("show");
    else scrollTop.classList.remove("show");
  }, { passive: true });

  scrollTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ==================== ACTIVE MENU ON SCROLL ====================
  // const observer = new IntersectionObserver((entries) => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       navLinks.forEach(link => link.classList.remove("active"));
  //       const current = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
  //       if (current) current.classList.add("active");
  //     }
  //   });
  // }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

  // sections.forEach(section => observer.observe(section));




  // ==================== ACTIVE MENU ON SCROLL ====================

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            // Remove active from all menu links
            navLinks.forEach((link) => {
                link.classList.remove("active");
            });

            // Find current active menu
            const current = document.querySelector(
                `.nav-link[href="#${entry.target.id}"]`
            );

            if (current) {

                // Add active class
                current.classList.add("active");


                // ==================== AUTO SCROLL ACTIVE MENU ====================

                const sidebarNav = document.querySelector(".sidebar-nav");

                if (sidebarNav) {

                    const navTop = sidebarNav.getBoundingClientRect().top;
                    const navBottom = sidebarNav.getBoundingClientRect().bottom;

                    const currentTop = current.getBoundingClientRect().top;
                    const currentBottom = current.getBoundingClientRect().bottom;


                    // Active menu নিচের দিকে hidden হলে
                    if (currentBottom > navBottom) {

                        sidebarNav.scrollTop +=
                            currentBottom - navBottom + 15;
                    }


                    // Active menu উপরের দিকে hidden হলে
                    else if (currentTop < navTop) {

                        sidebarNav.scrollTop -=
                            navTop - currentTop + 15;
                    }

                }
            }
        }

    });

}, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
});

sections.forEach((section) => observer.observe(section));




  // ==================== REVEAL ANIMATION ====================
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // ==================== DEMO CONTACT FORM ====================
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent = "Thanks! Your message is ready. Connect this form to your email service/backend to receive submissions.";
    contactForm.reset();
  });

  // ==================== CLOSE MENU ON ESCAPE ====================
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
});
