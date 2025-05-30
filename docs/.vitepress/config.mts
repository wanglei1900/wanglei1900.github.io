import { defineConfig } from 'vitepress'
import markdownItAnchor from 'markdown-it-anchor'
import timeline from "vitepress-markdown-timeline"; 
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "wanglei1900 Blog",
  description: "Blog",
  // head: [
  //   [
  //     'script',
  //     { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-GSYFDQ9B4V' }
  //   ],
  //   [
  //     'script',
  //     {},
  //     `window.dataLayer = window.dataLayer || [];
  //     function gtag(){dataLayer.push(arguments);}
  //     gtag('js', new Date());
  //     gtag('config', 'G-GSYFDQ9B4V');`
  //   ]
  // ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: '网站搭建', link: '/website/init' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: '网站搭建',
        items: [
          { text: '构建教程', link: '/website/init' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'local',
      options: {
        // 多语言
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        },
      }
    }
  },
  markdown: {
    lineNumbers: true, //行号显示
    image: {
      lazyLoading: true // 默认禁用；设置为 true 可为所有图片启用懒加载。
    },
    // markdown-it-anchor 的选项
    // https://github.com/valeriangalliat/markdown-it-anchor#usage
    anchor: {
      permalink: markdownItAnchor.permalink.headerLink()
    },
    config: (md) => {
      md.use(MermaidMarkdown)
        .use(timeline);
    }
  },
  vite: {
    plugins: [MermaidPlugin()],
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
    },
  },
})
