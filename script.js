document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Ensure scroll positions are calculated correctly after load
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

  // Hero Animations - using .to() from CSS hidden state might be safer,
  // but .from() is fine if we ensure starting state is handled.
  // To fix invisibility issues, we can use set() or just ensure opacity is 1 if animation fails.
  // But idiomatic GSAP is .from(). The issue "not visible" usually means the .from()
  // set them to opacity:0 but the animation didn't play.

  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.from(".logo", { y: -50, opacity: 0, duration: 1 })
    .from(
      ".nav-links li",
      { y: -50, opacity: 0, duration: 0.8, stagger: 0.1 },
      "-=0.5",
    )
    .from(
      ".hero-title",
      { scale: 0.9, opacity: 0, duration: 1, ease: "back.out(1.7)" },
      "-=0.6",
    )
    .from(".hero-role", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
    .from(".hero-description", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
    .fromTo(
      ".hero-buttons a",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
      "-=0.6",
    );

  // General Section Animations
  const animateFrom = (elem, direction = 1) => {
    direction = direction || 1;
    let x = 0,
      y = direction * 50; // default slide up

    gsap.fromTo(
      elem,
      { x: x, y: y, opacity: 0 },
      {
        duration: 1,
        x: 0,
        y: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 90%", // Trigger earlier so it's more likely to be seen
          toggleActions: "play none none reverse",
        },
      },
    );
  };

  // Apply to Section Titles
  gsap.utils.toArray(".section-title").forEach((title) => {
    animateFrom(title);
  });

  // Skill Chips (Staggered)
  gsap.utils.toArray(".skills-category").forEach((category) => {
    gsap.fromTo(
      category.querySelectorAll(".chip"),
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        scrollTrigger: {
          trigger: category,
          start: "top 90%",
        },
      },
    );
  });

  // Project Cards (Staggered)
  gsap.utils.toArray(".projects-grid").forEach((grid) => {
    gsap.fromTo(
      grid.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: grid,
          start: "top 90%",
        },
      },
    );
  });

  // Contact Cards
  gsap.fromTo(
    ".contact-card",
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: ".contact-grid",
        start: "top 90%",
      },
    },
  );

  /* Slideshow Logic */
  function initSlideshows() {
    const sliders = document.querySelectorAll(".card-image-slider");

    sliders.forEach((slider) => {
      const slides = slider.querySelectorAll(".slide");
      if (slides.length <= 1) return; // No need to loop if single image

      let currentIndex = 0;

      setInterval(() => {
        // Remove active class from current
        slides[currentIndex].classList.remove("active");

        // Calculate next index
        currentIndex = (currentIndex + 1) % slides.length;

        // Add active class to next
        slides[currentIndex].classList.add("active");
      }, 3000); // Change every 3 seconds
    });
  }

  initSlideshows();

  /* Hamburger Menu Logic */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links li a");
  const closeBtn = document.querySelector(".nav-close-btn");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      // Toggle hamburger icon (bars to X)
      const icon = hamburger.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = hamburger.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      });
    }

    // Close menu when a link is clicked
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.querySelector("i").classList.remove("fa-times");
        hamburger.querySelector("i").classList.add("fa-bars");
      });
    });
  }

  /* Scroll To Top Button Logic */
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
