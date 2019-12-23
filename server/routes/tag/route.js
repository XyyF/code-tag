const Router = require('koa-router');
const dbManager = require('../../db/db-manager');
const helper = require('../../utils/common-utils')

// 搜索匹配字段
const MATCH_FIELDS = ['tagName', 'description', 'tagCode'];

const router = new Router();

const add = async (ctx) => {
    const body = ctx.body || {}
    const tag = {
        tagId: 'test_id',
        tagCode: body.code,
        tagName: body.name,
        description: body.description,
        createdTime: Date.now(),
    }
    const tags = await dbManager.insert('tags', tag)
    ctx.response.body = {tags}
};

const getListByPaged = async (ctx) => {
    const {
        index = 0, limit = 0, matchText,
    } = ctx.query;
    const query = {};
    if (matchText) {
        Object.assign(query, helper.getRegexpQuery(matchText, MATCH_FIELDS))
    }
    const tags = await dbManager.findByPaged('tags', query, {createdTime: 1}, index, limit);
    ctx.response.body = {tags}
};

router.get('/api/tag/list/paged', getListByPaged);
router.post('/api/tag/add', add);

module.exports = router;
