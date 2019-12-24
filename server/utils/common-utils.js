const pattern = /[\[\]\\{}()+*?.$^|]/g;

/**
 * 修正正则查询字段
 * @param {string} originalRegStr 字符串
 */
function repairRegStr(originalRegStr) {
    return originalRegStr.replace(pattern, function (match) {
        return '\\' + match;
    });
}

/**
 * 获取数据库正则查询语句
 * @param value 查询值
 * @param MATCH_FIELDS 匹配字段数据集
 */
function getRegexpQuery(value, MATCH_FIELDS) {
    let transValue = repairRegStr(value);
    const ORFindExpression = [];
    MATCH_FIELDS.forEach((field) => {
        const expression = {};
        expression[field] = new RegExp(transValue, 'i');
        ORFindExpression.push(expression);
    });
    return {
        $and: [
            {$or: ORFindExpression},
        ],
    };
}

/**
 * 请求处理结束时用的方法，将数据封装成标准对象，并下发到浏览器
 * @param {object} ctx
 * @param {function} next
 * @return {*}
 */
function thenSend(ctx, next) {
    return this.then((result) => {
        ctx.response.body = {data: result, status: {code: 200}};
    }).catch((error) => {
        const message = `回包异常：${ctx.method} url: ${ctx.url}, 错误信息：${JSON.stringify(error)}`
        console.error(message);
        ctx.response.body = {data: null, status: {code: 500, message}};
    });
}

module.exports = {
    thenSend,
    getRegexpQuery,
}
