import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid({
    base: '/docs',
    title: 'Vue.js 從零開始',
    description: 'Vue.js 從零開始',
    themeConfig: {
        nav: [],

        sidebar: [],
    },
    markdown: {
        lineNumbers: true,
        theme: {
            light: 'solarized-light',
            dark: 'solarized-dark',
        },
    },
    head: [['link', { rel: 'shortcut icon', href: '/favicon.ico' }]],
    mermaid: {},
})
