# Teklehaymanot — Personal Portfolio

Personal developer portfolio for **Teklehaymanot**, a Software Engineering student at
Addis Ababa Science and Technology University (AASTU).

> I'm a Software Engineering student at AASTU who enjoys building useful web
> applications and thoughtful digital experiences.

A single-page site built around a realtime WebGL hero: a thin-film iridescent
sphere floating over procedurally generated terrain, with editorial typography
overlaid on top.

- **Role:** Software Engineering Student & Developer
- **Focus:** Full-stack web development
- **Location:** Addis Ababa, Ethiopia (`Africa/Addis_Ababa`, UTC+03:00)
- **Availability:** Open to internships, remote roles & freelance

---

## Projects

Both projects below are verified against their public repositories.

### SmartClinic Pro

A healthcare web application with patient, doctor, and administrator workflows,
appointment booking, and dashboards.

- **Category:** Personal project
- **Repository:** https://github.com/sep-tek/smartclinic-pro
- **Stack:** React 19, React Router 7, Vite 8, Express 5, PostgreSQL (`pg`),
  Three.js, `motion`
- **Live demo:** none published yet

### Academic Profile Tracker

A menu-driven console application for registering student records, tracking
programming, mathematics and discrete mathematics marks, and reporting class
statistics.

- **Category:** Personal project
- **Repository:** https://github.com/sep-tek/academic-profile-tracker
- **Stack:** C++
- **Live demo:** not applicable (console application)

---

## Skills

| Category | Technologies |
| --- | --- |
| Frontend | HTML, CSS, JavaScript, React |
| Backend | Node.js, Express |
| Databases | PostgreSQL, SQL |
| Programming | C++, Python |
| Tools | Git, GitHub |

---

## Contact

| Channel | Link |
| --- | --- |
| GitHub | https://github.com/sep-tek |
| LinkedIn | https://linkedin.com/in/teklehaymanot-gashaw-677b87358 |
| Email | [teklehaymanotgashaw@gmail.com](mailto:teklehaymanotgashaw@gmail.com) |
| Phone | [+251 904 919 905](tel:+251904919905) |
| Telegram | https://t.me/sep_tek |

---

## Tech stack

The portfolio itself is a Vite + React single-page app.

| Purpose | Library |
| --- | --- |
| Build tool | Vite 8 |
| UI runtime | React 19 |
| 3D rendering | Three.js via `@react-three/fiber` |
| 3D helpers | `@react-three/drei` |
| Animation | `motion` (Motion for React) |
| Icons | `lucide-react` |
| Linting | `oxlint` |

### Notable implementation details

- **The sphere is real 3D.** It uses `MeshPhysicalMaterial` with three.js'
  built-in thin-film interference, fed by a procedurally generated film
  thickness map. Nothing is a still image.
- **All assets are procedural.** The iridescent texture, the rocky terrain and
  the studio lighting environment are generated at runtime from a seeded
  simplex-noise implementation. There are no external images or HDRIs.
- **The terrain uses `MeshReflectorMaterial`** for the wet reflection beneath
  the sphere, and it degrades automatically on lower-power devices.
- **Five themes** — Midnight, Pearl, Ocean, Forest and Violet — each retuning
  the CSS tokens *and* the WebGL lighting, fog and exposure. The choice is
  persisted to `localStorage`.
- **Accessibility:** `prefers-reduced-motion` is respected throughout, there
  is a skip link, the canvas is `aria-hidden`, and the theme switcher implements
  the full listbox keyboard contract.

---

## Getting started

### Prerequisites

- **Node.js `^20.19.0` or `>=22.12.0`** (required by Vite 8)
- npm 10 or newer

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot module reload)
npm run dev
```

Vite prints the local URL on start, by default <http://localhost:5173>.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build a production bundle into `dist/` |
| `npm run preview` | Serve the built `dist/` locally to check the result |
| `npm run lint` | Run `oxlint` over the source |

> On Windows, if PowerShell blocks `npm` with an execution-policy error, use
> `npm.cmd` instead — for example `npm.cmd run build`.

### Production build

```bash
npm run lint
npm run build
npm run preview
```

The build output lands in `dist/`, which is git-ignored. `node_modules/` and
`dist/` are never committed.

---

## Editing content

Every piece of copy on the site lives in one file:

```
src/data/content.js
```

That is the single source of truth for your name, role, contact details, links,
skills and project entries — no search across components required.

Visual options live alongside it:

```
src/theme/themes.js    theme palettes and the matching WebGL scene settings
```

### Adding a project

Append an entry to `work.items` in `src/data/content.js`:

```js
{
  index: '03',
  title: 'Project name',
  category: 'Personal project',
  summary: 'One accurate sentence about what it does.',
  tech: ['React', 'Express'],
  links: [{ label: 'Source', href: 'https://github.com/sep-tek/your-repo' }],
}
```

Only add `links` entries for URLs you have verified. The section renders
whatever is present and omits it otherwise, so a project without a live demo
never shows a dead "Live demo" button.

---

## Project structure

```
src/
├─ components/
│  ├─ layout/      Header and footer
│  ├─ sections/    Hero, About, Work, Contact
│  ├─ three/       The WebGL scene (sphere, terrain, environment)
│  └─ ui/          Shared primitives (links, reveals, icons, switcher)
├─ data/           content.js — all site copy
├─ hooks/          Reduced motion, capability detection, scroll spy
├─ lib/            Noise, math and device-capability helpers
└─ theme/          Theme definitions, provider and tokens
```

---

## License

No license has been specified for this repository yet.
