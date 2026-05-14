// Project filtering
document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('[data-project]');
  if (!chips.length) return;
  chips.forEach(c => c.addEventListener('click', () => {
    chips.forEach(x => x.classList.remove('active'));
    c.classList.add('active');
    const f = c.dataset.filter;
    cards.forEach(card => {
      const tags = (card.dataset.tags || '').split(',');
      card.style.display = (f === 'all' || tags.includes(f)) ? '' : 'none';
    });
  }));
});
