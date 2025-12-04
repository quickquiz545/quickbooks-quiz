// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Form validation and submission handling
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clearErrors(form) {
  form.querySelectorAll('.error').forEach((error) => {
    error.textContent = '';
  });
}

function validateForm(form) {
  clearErrors(form);
  let isValid = true;
  const requiredFields = ['name', 'email', 'source', 'target', 'message'];

  requiredFields.forEach((fieldName) => {
    const field = form.querySelector(`[name="${fieldName}"]`);
    const errorEl = form.querySelector(`.error[data-for="${fieldName}"]`);
    if (!field || !errorEl) return;

    if (!field.value.trim()) {
      errorEl.textContent = 'This field is required.';
      isValid = false;
      return;
    }

    if (fieldName === 'email' && !emailPattern.test(field.value.trim())) {
      errorEl.textContent = 'Please enter a valid business email.';
      isValid = false;
    }
  });

  return isValid;
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;

  if (!validateForm(form)) {
    return;
  }

  alert('Thank you! Our migration experts will contact you shortly.');
  form.reset();
  clearErrors(form);
}

function initForms() {
  document.querySelectorAll('.consultation-form').forEach((form) => {
    form.addEventListener('submit', handleFormSubmit);
  });
}

// FAQ accordion
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.accordion-item').forEach((i) => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initForms();
  initAccordion();
});
