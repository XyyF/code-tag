const Router = require('koa-router');
const manager = require('./manager');
const helper = require('../../utils/common-utils');

// 搜索匹配字段
const MATCH_FIELDS = ['tagName', 'description', 'tagCode'];

const router = new Router();

const addTag = (ctx) => {
    const body = ctx.request.body || {};
    const params = {
        tagId: 'test_id',
        tagCode: body.code,
        tagName: body.name,
        description: body.description,
        createdTime: Date.now(),
    };
    return manager.addTag(params).thenSend(ctx, next);
};

const getListByPaged = (ctx, next) => {
    const {
        index = 0, limit = 0, matchText,
    } = ctx.query;
    const query = {};
    if (matchText) {
        Object.assign(query, helper.getRegexpQuery(matchText, MATCH_FIELDS))
    }
    const options = {
        createdTime: 1, index, limit,
    };
    return manager.getListByPaged(query, options).thenSend(ctx, next);
}

router.get('/api/tag/list/paged', getListByPaged);
router.post('/api/tag/add', addTag);

module.exports = router;
