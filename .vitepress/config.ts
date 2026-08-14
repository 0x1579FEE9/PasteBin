import { defineConfig } from "vitepress";
import { pagefindPlugin, chineseSearchOptimize } from 'vitepress-plugin-pagefind'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-cn",
  title: "PasteBin",
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    outline: "deep",
    sidebar: [],
    socialLinks: [{ icon: "github", link: "https://github.com/0x1579FEE9" }],
    footer: {
      message: `<a href="https://beian.miit.gov.cn/" rel="noreferrer" target="_blank">粤ICP备2026007027号-2</a>`,
    },
  },
  rewrites: {
    "readme.md": "index.md",
  },
  vite: {
    plugins: [pagefindPlugin({
      customSearchQuery: chineseSearchOptimize
    })],
  }
});
