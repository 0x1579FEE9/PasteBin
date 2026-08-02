import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PasteBin",
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    outline: "deep",
    sidebar: [],
    socialLinks: [{ icon: "github", link: "https://github.com/0x1579FEE9" }],
  },
  rewrites: {
    "readme.md": "index.md",
  },
});
