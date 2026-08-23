import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
//@ts-ignore
import { useTUI } from "vitepress-theme-tui";

import "vitepress-theme-tui/style.css";

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    useTUI({
      theme: "plain",
    });
  },
} satisfies Theme;
