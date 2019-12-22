const Koa = require('koa')
const route = require('koa-route');

const app = new Koa()

const about = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = '<a href="/">Index Page</a>';
};

const main = ctx => {
  ctx.response.body = 'Hello World';
};

app.use(route.get('/api/tag/login', main));
app.use(route.get('/api/tag/logout', about));
