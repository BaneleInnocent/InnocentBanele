// Terminal typing effect for the homepage
(function () {
  const target = document.getElementById('terminalBody');
  if (!target) return;

  const lines = [
    { p: 'whoami', out: 'banele monamudi — cybersecurity & it support specialist' },
    { p: 'cat mission.txt', out: 'breaking things ethically. building networks securely.' },
    { p: 'ls ./skills', out: 'networking  ethical-hacking  nmap  wireshark  linux  cisco' },
    { p: './deploy --portfolio', out: 'status: online ✓' },
  ];

  let li = 0;
  const wrap = document.createElement('div');
  target.appendChild(wrap);

  function typeLine(line, cb) {
    const row = document.createElement('div');
    row.innerHTML = `<span class="prompt">$</span> <span class="cmd"></span>`;
    wrap.appendChild(row);
    const cmdEl = row.querySelector('.cmd');
    let i = 0;
    const t = setInterval(() => {
      cmdEl.textContent = line.p.slice(0, i++);
      if (i > line.p.length) {
        clearInterval(t);
        const out = document.createElement('div');
        out.style.color = 'var(--muted)';
        out.style.padding = '2px 0 8px 14px';
        out.textContent = line.out;
        wrap.appendChild(out);
        cb();
      }
    }, 45);
  }

  function next() {
    if (li >= lines.length) {
      const cur = document.createElement('div');
      cur.innerHTML = `<span class="prompt">$</span> <span class="cursor"></span>`;
      wrap.appendChild(cur);
      return;
    }
    typeLine(lines[li++], () => setTimeout(next, 350));
  }
  setTimeout(next, 600);
})();
