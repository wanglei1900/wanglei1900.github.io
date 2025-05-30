// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// 引入时间线样式
import "vitepress-markdown-timeline/dist/theme/index.css";
// 引入谷歌分析网站访问量
import googleAnalytics from 'vitepress-plugin-google-analytics'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    googleAnalytics({
      id: 'G-GSYFDQ9B4V', //跟踪ID，在analytics.google.com注册即可
    })
  }
} satisfies Theme
