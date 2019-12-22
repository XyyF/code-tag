const db = require('./index')

module.exports = {
  /**
   * 插入文档数据。
   * @param {string} dataStore 表名字
   * @param {object} doc 要插入的文档
   */
  async insert (doc, dataStore) {
    return new Promise((resolve, reject) => {
      db[dataStore].insert(doc, function (err, newDoc) {
        if (err) {
          reject(err)
        } else {
          resolve(newDoc)
        }
      })
    })
  },
  /**
   * 根据update参数的规则，更新匹配到query的结果集。
   * @param {object} query 查询条件
   * @param {object} update 更新文档
   * @param {object} options 修改类型
   * @param {string} dataStore 表名字
   */
  async update (query, update, options, dataStore) {
    return new Promise((resolve, reject) => {
      db[dataStore].update(query, update, options, function (err, affectedNum, affectedDocs) {
        if (err) {
          reject(err)
        } else {
          resolve(affectedDocs)
        }
      })
    })
  },
  /**
   * 根据query参数查询数据
   * @param {object} query 查询条件
   * @param {string} dataStore 表名字
   */
  async find (query, dataStore) {
    return new Promise((resolve, reject) => {
      db[dataStore].find(query, function (err, docs) {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })
  },
  /**
   * 根据query参数查询数据
   * @param {object} query 查询条件
   * @param {string} dataStore 表名字
   */
  async findOne (query, dataStore) {
    return new Promise((resolve, reject) => {
      db[dataStore].findOne(query, function (err, docs) {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })
  }
}
