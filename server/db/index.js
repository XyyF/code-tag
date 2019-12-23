const Datastore = require('nedb');
const path = require('path');

const users = createDatastore('account', 'accountId');
const tags = createDatastore('tag', 'createdTime');

function createDatastore(name, fieldName) {
    const db = new Datastore({
        autoload: true,
        filename: path.join(__dirname, `../../data/${name}.db`)
    })
    db.ensureIndex({fieldName, unique: true})
    return db
}

module.exports = {
    users,
    tags,
}
