import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const dev = process.env.NODE_ENV === "development";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "app-scrollytell";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build"
    }),
    paths: {
      base: dev ? "" : `/${repositoryName}`
    }
  }
};

export default config;
