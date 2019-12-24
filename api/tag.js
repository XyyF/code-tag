import request from './index'

export default {
    addTag,
    getTagListByPage,
}

/**
 * 获取博客详情
 * @param params 参数
 */
export function getTagListByPage(params) {
    return request.get('/tag/list/paged', params)
}
/**
 * 获取博客列表
 * @param params 参数
 */
export function addTag(params) {
    return request.post('/tag/add', params)
}
