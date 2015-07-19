var config = require('./config');
var setup = require('./setup');

var app = setup.createApp(config);
setup.createRoutes(app, config);
setup.startApp(app);
