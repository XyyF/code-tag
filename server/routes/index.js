const compose = require('koa-compose');
const glob = require('glob');
const {resolve} = require('path');

function registerRouter() {
    let routers = [];
    glob.sync(resolve(__dirname, './', '**/route.js'))
        .filter(value => value.indexOf('route.js'))
        .map(router => {
            routers.push(require(router).routes())
            routers.push(require(router).allowedMethods())
        });
    return compose(routers)
}

module.exports = registerRouter;
