const homeRoute = require('./home.route');
const toolRoute = require('./tool.route');
module.exports = (app) => {
    app.use('/', homeRoute);
    app.use('/tool', toolRoute);
};