import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const appHtml = readFileSync(new URL("../src/app.html", import.meta.url), "utf8");
const svelteConfig = readFileSync(new URL("../svelte.config.js", import.meta.url), "utf8");
const deployWorkflow = readFileSync(new URL("../.github/workflows/deploy.yml", import.meta.url), "utf8");

test("configures SvelteKit for a project GitHub Pages base path", () => {
  assert.match(svelteConfig, /GITHUB_REPOSITORY/);
  assert.match(svelteConfig, /app-scrollytell/);
  assert.match(svelteConfig, /paths:\s*\{/);
  assert.match(svelteConfig, /base:/);
});

test("keeps app shell assets base-path aware", () => {
  assert.match(
    appHtml,
    /<link rel="icon" type="image\/png" href="%sveltekit\.assets%\/app-figures\/figure1\.png" \/>/
  );
});

test("deploys the static build through GitHub Pages Actions", () => {
  assert.match(deployWorkflow, /branches:\s*\n\s*-\s*main/);
  assert.match(deployWorkflow, /actions\/configure-pages@v\d+/);
  assert.match(deployWorkflow, /npm ci/);
  assert.match(deployWorkflow, /npm run check/);
  assert.match(deployWorkflow, /npm run build/);
  assert.match(deployWorkflow, /actions\/upload-pages-artifact@v\d+/);
  assert.match(deployWorkflow, /path:\s*build/);
  assert.match(deployWorkflow, /actions\/deploy-pages@v\d+/);
});

test("does not ship a stale custom domain", () => {
  assert.equal(existsSync(new URL("../static/CNAME", import.meta.url)), false);
});
