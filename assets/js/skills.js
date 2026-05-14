// Animate skill bars when visible
document.addEventListener('DOMContentLoaded', () => {
  const bars = document.querySelectorAll('.bar .fill');
  if (!bars.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const v = e.target.dataset.value || '0';
        e.target.style.width = v + '%';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => io.observe(b));
});
