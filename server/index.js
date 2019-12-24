const Koa = require('koa');
const consola = require('consola');
const {Nuxt, Builder} = require('nuxt');
// 解析request的body的功能(post请求)
const bodyParser = require('koa-bodyparser');

// 数据存储
require('./db/index')
// API路由
const registerRouter  = require('./routes/index')

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)

    const {
        host = process.env.HOST || '127.0.0.1',
        port = process.env.PORT || 3000
    } = nuxt.options.server

    // Build in development
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }
    // 解析参数
    app.use(bodyParser())
    app.use(registerRouter())

    app.use((ctx) => {
        ctx.status = 200
        ctx.respond = false // Bypass Koa's built-in response handling
        ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
        nuxt.render(ctx.req, ctx.res)
    })

    app.listen(port, host);
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}

start()
