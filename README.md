# Banele Monamudi — Cybersecurity Portfolio

Static HTML/CSS/JS portfolio. No build step required.

## Run locally
Because pages load shared header/footer via `fetch()`, you need a local server (not `file://`):

```bash
# any of these works
python3 -m http.server 8080
# or
npx serve .
```
Then open http://localhost:8080/

## Deploy
Drop the folder onto any static host:
- **GitHub Pages** — push to a repo, enable Pages on the branch
- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder
- **Hostinger / cPanel / Apache** — upload via FTP. PHP contact form will work here.

## Replace these placeholders
- `assets/cv/banele-monamudi-cv.pdf` — your real CV PDF
- `partials/footer.html` and `contact.html` — your real Email / LinkedIn / GitHub
- `contact.php` — set `$TO` to your real email
- Project screenshots — drop images into `assets/img/` and add `<img>` tags in the project cards on `projects.html`

## Features
- Dark / light theme toggle (persists in localStorage)
- Terminal-style typing intro
- Hacker boot loader animation (first visit per session)
- Animated skill progress bars
- Project filtering (Networking / Security / Analysis)
- Responsive (mobile hamburger nav under 820px)
- SEO: per-page titles/meta, Open Graph, sitemap, robots, JSON-LD Person schema
- Optional PHP contact handler with mailto fallback
