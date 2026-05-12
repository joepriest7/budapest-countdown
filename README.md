# 🇭🇺 Budapest Stag Do Countdown

Live countdown to the Budapest stag do — **May 14–17, 2026**.

## Quick Start

```bash
npm install
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

## Deploy to GitHub Pages

```bash
npm install gh-pages --save-dev
```

Add to `package.json`:
```json
{
  "homepage": "https://<username>.github.io/budapest-stag-countdown",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

Then:
```bash
npm run deploy
```

## Features

- Live countdown to departure (5:45 AM UK time, May 14th)
- Hungarian flag theming throughout
- Animated particles in red, white & green
- Mobile-first responsive design
- Staggered load animations

---

*Ruin Bars · Boat Parties · Clubs · No Excuses*
