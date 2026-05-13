# Dani Portfolio 🚀

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwind-css)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4?logo=framer)](https://www.framer.com/motion)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock)](https://greensock.com/gsap)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy to Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

A stunning, fully-featured personal portfolio website for a Hungarian IT student. Built with Next.js, Tailwind CSS, Framer Motion, and GSAP.

## ✨ Features

- **Dark/Light mode** toggle with persistence
- **Custom animated cursor** that reacts to hoverable elements
- **Loading screen** — terminal-style boot sequence
- **Particle background** via tsParticles
- **Smooth scroll** via Lenis
- **Konami code easter egg** — press ↑↑↓↓←→←→BA for retro mode
- **Logo confetti** — click the `<DK />` logo 5 times
- **Debug Rush minigame** — squash bugs, local leaderboard

### Sections
1. **Hero** — animated name with glitch effect, typing animation, particle bg
2. **About** — geometric avatar, stat counters, flip cards
3. **Skills** — animated progress bars with devicons, grouped by category
4. **Projects** — 3D tilt cards, custom SVG frames (dancing figures, bouncing kids)
5. **Minigame** — Debug Rush canvas game inside a retro terminal frame
6. **Experience** — animated alternating timeline
7. **Contact** — floating label form, success animation, social links
8. **Footer** — ASCII art, back-to-top

---

## 🗂️ Project Structure

```
/app                → Next.js App Router pages & layout
/components         → Reusable UI components
  /sections         → Page sections (Hero, About, Skills, etc.)
/data               → All content as JSON files
  bio.json          → Personal info, stats, fun facts, social links
  nav.json          → Navigation links
  skills.json       → Skills by category with levels
  projects.json     → Project showcase data
  experience.json   → Timeline entries
/public
  /assets           → Images (sample.png placeholder)
  /svg              → Hand-crafted SVG animations (dancers.svg, bouncers.svg)
  /cv.pdf           → Resume placeholder
/styles             → Global CSS
/hooks              → Custom React hooks
/lib                → Utility functions & animation helpers
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Dani_Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## 🎨 Customization

All content lives in `/data/` — no hardcoded text in components.

| File | Purpose |
|------|---------|
| `data/bio.json` | Name, bio, stats, fun facts, social links |
| `data/nav.json` | Navigation menu items |
| `data/skills.json` | Skills with category, icon, and level (0–100) |
| `data/projects.json` | Project cards with URLs, tech stack, SVG frame path |
| `data/experience.json` | Timeline entries (education, work, projects) |

### Replacing the placeholder image
Replace `public/assets/sample.png` with your actual photo.

### Adding your CV
Replace `public/cv.pdf` with your actual resume.

### Skill icons
Icons are loaded from the [devicons CDN](https://devicons.github.io/devicon/). Use the icon name matching the devicon identifier (e.g., `"react"`, `"typescript"`, `"nodejs"`).

---

## 🎮 Easter Eggs

- **Konami Code**: Type ↑↑↓↓←→←→BA to activate retro mode
- **Logo confetti**: Click `<DK />` in the navbar 5 times for a confetti explosion
- **Debug Rush**: Play the minigame in the Minigame section

---

## 📦 Tech Stack

| Package | Purpose |
|---------|---------|
| `next` 16 | App Router, SSR, image optimization |
| `tailwindcss` | Utility-first CSS |
| `framer-motion` | Hover & transition animations |
| `gsap` + `@gsap/react` | Scroll-triggered animations |
| `lenis` | Smooth scroll |
| `@tsparticles/react` | Particle background |
| `canvas-confetti` | Logo confetti easter egg |
| `@tabler/icons-react` | Icon set |
| `clsx` + `tailwind-merge` | Class name utilities |

---

## 🌐 Deployment

Deploy to [Vercel](https://vercel.com) with zero config — just push to GitHub and import.

```bash
npm install -g vercel
vercel
```

---

## 📝 License

MIT — feel free to use as a template for your own portfolio!

---

*Built with ❤️ and too much coffee — Kovács Dániel, Hungary 🇭🇺*
