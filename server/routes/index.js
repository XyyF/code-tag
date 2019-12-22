const compose = require('koa-compose');
const glob = require('glob');
const {resolve} = require('path');

function registerRouter() {
    let routers = [];
    glob.sync(resolve(__dirname, './', '**/route.js'))
        .filter(value => value.indexOf('route.js'))
        .map(router => {
            const routerInstance = require(router);
            routers.push(routerInstance.routes());
            routers.push(routerInstance.allowedMethods())
        });
    return compose(routers)
}

module.exports = registerRouter;
