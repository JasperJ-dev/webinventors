const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const contactForm = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && header) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (contactForm && status) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = [...contactForm.querySelectorAll("input, textarea")];
    let hasErrors = false;

    fields.forEach((field) => {
      const isEmpty = !field.value.trim();
      const isEmail = field.type === "email";
      const isInvalidEmail = isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      const invalid = isEmpty || isInvalidEmail;

      field.classList.toggle("is-invalid", invalid);
      hasErrors = hasErrors || invalid;
    });

    status.className = "form-status";

    if (hasErrors) {
      status.textContent = "Vul alle velden correct in voordat je verstuurt.";
      status.classList.add("is-error");
      return;
    }

    const name = contactForm.elements.namedItem("name").value.trim();
    status.textContent = `Bedankt ${name}, je aanvraag staat klaar om verder opgepakt te worden.`;
    status.classList.add("is-success");
    contactForm.reset();
  });
}
