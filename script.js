const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

const copyButtons = document.querySelectorAll("[data-copy]");

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-copy");
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      button.textContent = "Copied";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 1500);
    } catch (error) {
      button.textContent = "Copy failed";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 1500);
    }
  });
});

const membershipForm = document.querySelector(".membership-form");
const modal = document.querySelector("[data-modal]");
const modalBackdrop = document.querySelector("[data-modal-backdrop]");
const modalClose = document.querySelector("[data-modal-close]");
const modalCancel = document.querySelector("[data-modal-cancel]");
const modalConfirm = document.querySelector("[data-modal-confirm]");
const termsCheckbox = document.querySelector("[data-terms-checkbox]");

const openModal = () => {
  if (!modal || !modalBackdrop || !modalConfirm || !termsCheckbox) {
    return;
  }
  modal.classList.add("open");
  modalBackdrop.classList.add("open");
  modalConfirm.disabled = !termsCheckbox.checked;
};

const closeModal = () => {
  if (!modal || !modalBackdrop || !termsCheckbox) {
    return;
  }
  modal.classList.remove("open");
  modalBackdrop.classList.remove("open");
  termsCheckbox.checked = false;
  if (modalConfirm) {
    modalConfirm.disabled = true;
  }
};

if (membershipForm) {
  membershipForm.addEventListener("submit", (event) => {
    if (!modal || !modalBackdrop || !termsCheckbox) {
      return;
    }
    event.preventDefault();
    openModal();
  });
}

if (termsCheckbox && modalConfirm) {
  termsCheckbox.addEventListener("change", () => {
    modalConfirm.disabled = !termsCheckbox.checked;
  });

  modalConfirm.addEventListener("click", () => {
    if (!termsCheckbox.checked || !membershipForm) {
      return;
    }
    closeModal();
    membershipForm.submit();
  });
}

[modalClose, modalCancel, modalBackdrop].forEach((element) => {
  if (!element) {
    return;
  }
  element.addEventListener("click", closeModal);
});

const partnersCarousel = document.querySelector("[data-carousel]");
let carouselTimer;

const startCarouselAutoplay = () => {
  if (!partnersCarousel) {
    return;
  }
  const card = partnersCarousel.querySelector(".partner-card");
  const cardWidth = card ? card.offsetWidth : 240;
  const gap = 22;
  const step = cardWidth + gap;

  carouselTimer = window.setInterval(() => {
    const maxScroll =
      partnersCarousel.scrollWidth - partnersCarousel.clientWidth;
    const nextScroll = partnersCarousel.scrollLeft + step;

    if (nextScroll >= maxScroll - 5) {
      partnersCarousel.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      partnersCarousel.scrollBy({ left: step, behavior: "smooth" });
    }
  }, 2800);
};

const stopCarouselAutoplay = () => {
  if (carouselTimer) {
    window.clearInterval(carouselTimer);
  }
};

if (partnersCarousel) {
  startCarouselAutoplay();
  partnersCarousel.addEventListener("mouseenter", stopCarouselAutoplay);
  partnersCarousel.addEventListener("mouseleave", startCarouselAutoplay);
}
