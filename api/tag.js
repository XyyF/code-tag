import request from './index'

export default {
    addTag,
    getTagListByPage,
}

/**
 * 获取tags
 * @param {Object} params 参数
 * @param {Number} params.index 下标
 * @param {Number} params.limit 限制数量
 * @param {String} params.matchText 搜索值
 */
export function getTagListByPage(params) {
    return request.get('/tag/list/paged', params)
}
/**
 * 新增tag
 * @param {Object} params 参数
 * @param {Number} params.name 展示值
 * @param {Number} params.code 单词
 * @param {String} params.description 使用场景描述
 */
export function addTag(params) {
    return request.post('/tag/add', params)
}
