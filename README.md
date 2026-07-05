# App Scrollytell

Static SvelteKit scrollytelling draft for the app-usage paper.

## Local Development

```sh
npm ci
npm run dev
```

## Verification

```sh
node --test tests/*.test.js
npm run check
npm run build
```

## Deployment

Pushes to `main` deploy the static `build/` output to GitHub Pages through `.github/workflows/deploy.yml`.
