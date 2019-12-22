const Router = require('koa-router');

const router = new Router();

const about = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = '<a href="/">Index Page</a>';
};

const main = ctx => {
  ctx.response.body = 'Hello World';
};

router.get('/api/account/login', main);
router.get('/api/account/logout', about);

module.exports = router
