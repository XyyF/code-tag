const Datastore = require('nedb')
const path = require('path')

const users = createDatastore('user')
const tags = createDatastore('tag')

function createDatastore (name) {
  return new Datastore({
    autoload: true,
    filename: path.join(__dirname, `../../data/${name}.db`)
  })
}

module.exports = {
  users,
  tags,
}
