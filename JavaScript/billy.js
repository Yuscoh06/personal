document.addEventListener("DOMContentLoaded", function () {
  const responsiveMenu = document.getElementById("navlinks");
  const responsiveMenuLinks = responsiveMenu
    ? Array.from(responsiveMenu.querySelectorAll("li"))
    : [];
  const menuToggle = document.getElementById("menuToggle");

  function openMenu() {
    responsiveMenu.classList.add("open");
    if (window.gsap) {
      gsap.to(responsiveMenu, {
        duration: 0.28,
        css: { height: "auto", opacity: 1 },
      });
      gsap.fromTo(
        responsiveMenuLinks,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.22 }
      );
    } else {
      responsiveMenu.style.display = "flex";
      responsiveMenu.style.opacity = 1;
    }
  }

  function closeMenu() {
    responsiveMenu.classList.remove("open");
    if (window.gsap) {
      gsap.to(responsiveMenu, {
        duration: 0.22,
        css: { height: 0, opacity: 0 },
      });
    } else {
      responsiveMenu.style.display = "none";
      responsiveMenu.style.opacity = 0;
    }
  }

  if (menuToggle && responsiveMenu) {
    menuToggle.addEventListener("click", function () {
      const isOpen = responsiveMenu.classList.toggle("open");
      if (isOpen) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    // Ensure the menu state matches viewport on load / resize
    function syncMenuForWidth() {
      if (window.innerWidth <= 600) {
        closeMenu();
      } else {
        responsiveMenu.classList.remove("open");
        responsiveMenu.style.opacity = 1;
        responsiveMenu.style.maxHeight = "none";
      }
    }

    window.addEventListener("resize", syncMenuForWidth);
    syncMenuForWidth();
  }
});
