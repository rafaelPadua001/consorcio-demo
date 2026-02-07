document.body.classList.add("has-animations");

const heroButton = document.querySelector(".hero-form button");
const whatsappNumber = "5561991865680";

if (heroButton) {
  heroButton.addEventListener("click", (event) => {
    event.preventDefault();

    const heroForm = document.querySelector(".hero-form");
    const nameInput = heroForm?.querySelector("input[type=\"text\"]");
    const phoneInput = heroForm?.querySelector("input[type=\"tel\"]");
    const emailInput = heroForm?.querySelector("input[type=\"email\"]");
    const selectedRadio = heroForm?.querySelector("input[name=\"tipo\"]:checked");

    const name = nameInput?.value?.trim() || "N?o informado";
    const phone = phoneInput?.value?.trim() || "N?o informado";
    const email = emailInput?.value?.trim() || "N?o informado";
    const tipo =
      selectedRadio?.closest("label")?.textContent?.trim() || "N?o informado";

    const message = [
      "Ol?! Gostaria de fazer uma simula??o de cons?rcio.",
      "",
      `?? Nome: ${name}`,
      `?? Telefone: ${phone}`,
      `?? Email: ${email}`,
      `?? Tipo de cons?rcio: ${tipo}`,
    ].join("
");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
}

const phoneInput = document.querySelector(".hero-form input[type=\"tel\"]");

if (phoneInput) {
  phoneInput.setAttribute("inputmode", "numeric");
  phoneInput.setAttribute("autocomplete", "tel");
  phoneInput.maxLength = 19;

  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, "");
    if (digits.startsWith("55")) {
      digits = digits.slice(2);
    }
    if (!digits.length) {
      return "";
    }

    let formatted = "+55 ";
    const area = digits.slice(0, 2);
    if (area.length) {
      formatted += `(${area}`;
    }
    if (area.length === 2) {
      formatted += ") ";
    }

    const isMobile = digits.length > 10;
    const firstPart = isMobile ? digits.slice(2, 7) : digits.slice(2, 6);
    if (firstPart.length) {
      formatted += firstPart;
    }

    const secondPart = isMobile ? digits.slice(7, 11) : digits.slice(6, 10);
    if (secondPart.length) {
      formatted += `-${secondPart}`;
    }

    return formatted;
  };

  phoneInput.addEventListener("input", (event) => {
    const { value } = event.target;
    event.target.value = formatPhone(value);
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
