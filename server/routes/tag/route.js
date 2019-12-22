const Router = require('koa-router');
const dbManager = require('../../db/db-manager');

const router = new Router();

const add = async (ctx) => {
  const tags = await dbManager.insert({
    tagId: 'test_id',
    tagCode: 'tag',
    tagName: '标签',
    createdTime: Date.now(),
  }, 'tags')
  ctx.response.body = {tags}
};

const getListByPaged = async (ctx) => {
  const {
    index = 0, limit = 0,
  } = ctx;
  const skipTags = index * limit;
  console.log('rengar log', ctx)
  const tags = await dbManager.find({}, 'tags').sort({createdTime: 1}).skip(skipTags).limit(limit);
  ctx.response.body = {tags}
};

router.get('/api/tag/list/paged', getListByPaged);
router.post('/api/tag/add', add);

module.exports = router
