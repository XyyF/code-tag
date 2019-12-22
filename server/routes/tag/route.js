const Koa = require('koa');
const route = require('koa-route');
const dbManager = require('../../utils/db-manager')

const app = new Koa();

const add = async (ctx) => {
  const tags = await dbManager.insert({
    tagId: 'test_id',
    tagCode: 'tag',
    tagName: '标签',
  }, 'tags')
  ctx.response.body = {tags}
};

const getListByPaged = (ctx) => {
  ctx.response.body = 'Hello World';
};

app.use(route.get('/api/tag/list/paged', getListByPaged));
app.use(route.get('/api/tag/add', add));
app.use(route.get('/api/tag/delete', add));
app.use(route.get('/api/tag/edit', add));
