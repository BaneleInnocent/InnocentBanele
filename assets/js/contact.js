// Contact form: try POST to contact.php, fall back to mailto:
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = form.querySelector('.status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'status';
    status.textContent = 'sending...';

    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.name || !data.email || !data.message) {
      status.className = 'status err';
      status.textContent = 'please fill all fields.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      status.className = 'status err';
      status.textContent = 'invalid email.';
      return;
    }

    try {
      const res = await fetch('contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
      if (!res.ok) throw new Error('php unavailable');
      status.className = 'status ok';
      status.textContent = 'message sent. thanks!';
      form.reset();
    } catch (err) {
      // Fallback: open mail client
      const subject = encodeURIComponent(`Portfolio contact — ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} <${data.email}>`);
      window.location.href = `mailto:banele@example.com?subject=${subject}&body=${body}`;
      status.className = 'status ok';
      status.textContent = 'opening your mail client...';
    }
  });
});
