const dbManager = require('../../db/db-manager');

module.exports = {
    addTag,
    getListByPaged,
};

async function addTag(params) {
    return dbManager.insert('tags', params);
}

async function getListByPaged(query, options) {
    return dbManager.findByPaged('tags', query, options);
}
