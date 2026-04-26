import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://sake-jazz.artistmerge.jp",
  output: "static",
  integrations: [sitemap()],
});
