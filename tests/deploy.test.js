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

test("publishes the static build to a gh-pages branch", () => {
  assert.match(deployWorkflow, /branches:\s*\n\s*-\s*main/);
  assert.match(deployWorkflow, /contents:\s*write/);
  assert.match(deployWorkflow, /npm ci/);
  assert.match(deployWorkflow, /npm run check/);
  assert.match(deployWorkflow, /npm run build/);
  assert.match(deployWorkflow, /cp -R build\/\. "\$DEPLOY_DIR\/"/);
  assert.match(deployWorkflow, /touch "\$DEPLOY_DIR\/\.nojekyll"/);
  assert.match(deployWorkflow, /push --force origin gh-pages/);
  assert.doesNotMatch(deployWorkflow, /actions\/deploy-pages/);
  assert.doesNotMatch(deployWorkflow, /actions\/upload-pages-artifact/);
});

test("does not ship a stale custom domain", () => {
  assert.equal(existsSync(new URL("../static/CNAME", import.meta.url)), false);
});
