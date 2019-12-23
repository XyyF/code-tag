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

module.exports = {
    getRegexpQuery,
}
