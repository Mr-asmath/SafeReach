<div align="center">

  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=800&size=34&duration=2600&pause=700&color=0F62FE&center=true&vCenter=true&width=850&lines=SafeReach;Smart+Student+Safety+Dashboard;Role-Based+School+Safety+Frontend;Built+with+Next.js+and+Tailwind+CSS" alt="SafeReach animated title" />

  <p>
    <strong>SafeReach</strong> is a responsive school safety frontend for main admins, school admins, teachers, and parents.
    It focuses on calm monitoring screens, quick role navigation, emergency visibility, and polished motion.
  </p>

  <p>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-111111?style=for-the-badge&logo=nextdotjs&logoColor=white" />
    <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  </p>

  <p>
    <a href="#quick-start">Quick Start</a>
    <span> | </span>
    <a href="#visual-style">Visual Style</a>
    <span> | </span>
    <a href="#animations">Animations</a>
    <span> | </span>
    <a href="#route-map">Routes</a>
    <span> | </span>
    <a href="#console-notes">Console Notes</a>
  </p>

</div>

---

## Overview

SafeReach is currently a frontend application. It is designed as a high-fidelity prototype for school safety workflows before API, database, and production authentication services are connected.

| Area | Details |
| --- | --- |
| Framework | Next.js App Router |
| UI | React, TypeScript, Tailwind CSS |
| Roles | Main Admin, School Admin, Teacher, Parent |
| Data | Demo/static frontend state |
| Backend | Not connected in this frontend folder |
| Goal | Validate screens, layout, style, animation, and role journeys |

## Quick Start

Recommended Windows runtime method for this project:

```powershell
cd E:\Projects\Live\SafeReach\frontend
yarn runtime:install
yarn runtime:dev
```

Open the app:

```text
http://localhost:3000
```

Build for production:

```powershell
yarn runtime:build
yarn runtime:start
```

The runtime commands install dependencies in `%TEMP%\safereach_frontend_install` and sync only the frontend source files there before running Next.js. This avoids very slow Windows dependency extraction inside the project folder.

## Scripts

| Command | Purpose |
| --- | --- |
| `yarn runtime:install` | Install frontend dependencies into the fast runtime folder |
| `yarn runtime:dev` | Start the local Next.js development server on port 3000 |
| `yarn runtime:build` | Create the production build |
| `yarn runtime:start` | Run the production server after build |
| `yarn build:pages` | Build page output through the project helper script |

## Visual Style

SafeReach uses a clean safety-technology visual style:

- Trust colors: deep blue, bright cyan, fresh green, and alert amber.
- Backgrounds: soft gradients, bright panels, and high-contrast dashboard areas.
- Cards: rounded, layered, readable, and grouped by workflow.
- Typography: bold section titles, short labels, and scan-friendly data text.
- Layout: mobile-first grids that become dense dashboards on desktop.
- Status colors: green for safe, amber for attention, red for urgent, blue for information.

Recommended Tailwind color roles:

```text
Primary:   blue / indigo
Safe:      emerald / green
Alert:     amber / orange
Danger:    red / rose
Surface:   white / slate-50
Text:      slate-900 / slate-600
```

## Animations

The interface should feel responsive without becoming distracting:

- Hero entrance: smooth fade and upward slide.
- Dashboard cards: slight lift and shadow on hover.
- Buttons: scale, color, and shadow transitions.
- Navigation: active route highlight with soft movement.
- Alerts: pulse only for urgent or live-status elements.
- Tables and lists: staggered fade-in for first load.
- Modals or panels: quick scale/fade transition.

Example motion language:

```css
.safe-card {
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.safe-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14);
}

.live-alert {
  animation: safePulse 1.5s ease-in-out infinite;
}

@keyframes safePulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.72;
    transform: scale(1.03);
  }
}
```

Use `prefers-reduced-motion` for accessibility:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Route Map

Common routes in the frontend:

| Route | Screen |
| --- | --- |
| `/` | Landing / entry page |
| `/login` | Login screen |
| `/admin` | School admin dashboard |
| `/teacher` | Teacher dashboard |
| `/parent` | Parent dashboard |
| `/main-admin` | Platform-level main admin dashboard |
| `/school-registration` | School registration flow |

The exact route list can be checked in the `app/` directory.

## Role Experience

Main Admin:

- View platform-level school activity.
- Monitor school onboarding and safety status.
- Manage high-level application controls.

School Admin:

- Track students, teachers, attendance, and incidents.
- Review dashboard summaries.
- Coordinate safety workflows.

Teacher:

- View assigned students and class details.
- Monitor safety-relevant updates.
- Support school-level daily operations.

Parent:

- View student safety and school updates.
- Check child-related status screens.
- Receive a calmer, simpler experience than admin dashboards.

## Project Structure

```text
frontend/
  app/
    admin/
    login/
    main-admin/
    parent/
    teacher/
    school-registration/
  components/
  public/
  scripts/
  package.json
  tailwind.config.*
```

## Console Notes

These browser console messages are usually not SafeReach application errors:

- `contentscript.js MaxListenersExceededWarning`: caused by a browser extension content script.
- `Download the React DevTools`: normal React development message.
- `React Router Future Flag Warning`: a development warning from React Router; upgrade flags can be enabled when the app is ready for v7 behavior.
- `MetaMask extension not found`: caused by an injected wallet script or extension, not this app unless wallet features were intentionally added.

To confirm an actual app error, test in an incognito window with extensions disabled, then reload the local app.

## Deployment Notes

For Vercel:

```text
Framework Preset: Next.js
Root Directory: frontend
Install Command: yarn runtime:install
Build Command: yarn runtime:build
Output Directory: .next
```

For environment variables, add only real runtime values needed by the frontend. Do not commit secrets to this repository.

## Quality Checklist

- Run `yarn runtime:build` before deployment.
- Check desktop and mobile widths.
- Verify hover states, focus states, and active navigation.
- Keep urgent animations meaningful and limited.
- Disable browser extensions when debugging unrelated console noise.

---

<div align="center">
  <strong>SafeReach</strong><br />
  Calm dashboards for safer school operations.
</div>
