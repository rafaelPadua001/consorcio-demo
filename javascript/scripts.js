document.body.classList.add("has-animations");

const heroButton = document.querySelector(".hero-form button");

if (heroButton) {
  heroButton.addEventListener("click", () => {
    alert("Simula??o enviada! Em breve entraremos em contato.");
  });
}

const carousel = document.querySelector("[data-carousel]");

if (carousel) {
  const track = carousel.querySelector("[data-carousel-track]");
  const slides = Array.from(track.children);
  const previewButtons = Array.from(
    carousel.querySelectorAll("[data-carousel-thumb]")
  );
  let currentIndex = 0;

  const setActivePreview = (index) => {
    previewButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  const updateCarousel = () => {
    setActivePreview(currentIndex);
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentIndex);
    });
  };

  previewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.carouselThumb);
      if (Number.isNaN(index)) {
        return;
      }
      currentIndex = Math.max(0, Math.min(index, slides.length - 1));
      updateCarousel();
    });
  });

  updateCarousel();
}

const faqItems = Array.from(document.querySelectorAll(".faq-item"));

if (faqItems.length) {
  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const icon = item.querySelector(".faq-icon");

    if (!button || !icon) {
      return;
    }

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("is-open");
        const otherButton = otherItem.querySelector(".faq-question");
        const otherIcon = otherItem.querySelector(".faq-icon");

        if (otherButton) {
          otherButton.setAttribute("aria-expanded", "false");
        }
        if (otherIcon) {
          otherIcon.textContent = "+";
        }
      });

      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        icon.textContent = "-";
      }
    });
  });
}

const animatedSections = document.querySelectorAll("section, footer");

if (animatedSections.length) {
  const revealSection = (section) => {
    section.classList.add("is-visible");
  };

  animatedSections.forEach((section) => {
    section.classList.add("section-reveal");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealSection(entry.target);
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    animatedSections.forEach((section) => observer.observe(section));
  } else {
    animatedSections.forEach((section) => revealSection(section));
  }
}
