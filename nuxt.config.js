module.exports = {
    mode: 'universal',
    server: {
        port: 3000, // default: 3000
        host: '0.0.0.0', // default: localhost,
        timing: false
    },
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global CSS
    */
    css: [
        'element-ui/lib/theme-chalk/index.css',
        '~assets/styles/basic.scss'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '@/plugins/element-ui',
        '@/plugins/axios',
        {src: '@/plugins/dialog-controller', ssr: false}
    ],
    /*
    ** Nuxt.js dev-modules
    */
    // buildModules: [
    //   // Doc: https://github.com/nuxt-community/eslint-module
    //   '@nuxtjs/eslint-module'
    // ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios'
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {},
    /*
    ** Build configuration
    */
    build: {
        babel: {
            presets({isServer}) {
                const targets = isServer ? {node: '10'} : {ie: '11'}
                return [
                    [require.resolve('@nuxt/babel-preset-app'), {targets}],
                    '@elfin-fe/elfin'
                ]
            },
        },
        transpile: [/^element-ui/],
        postcss: {
            plugins: {
                'postcss-px2rem-exclude': {
                    remUnit: 16, // 转换基本单位
                    'exclude': '/node_modules/element-ui'
                },
            },
        },
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    }
}
