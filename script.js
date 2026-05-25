document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const data = new FormData(form);
      const name = data.get('name');
      status.textContent = `Thanks ${name}! Your message has been received.`;
      form.reset();
    });
  }
});
