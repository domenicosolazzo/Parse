var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var auth = require('basic-auth');

module.exports.createApp = function(config) {
  var app = express();

  app.use(function(req, res, next) {
    var user = auth(req);

    if (!user ||
        user.name !== config.get('user.name') ||
        user.pass !== config.get('user.password')
    ){
      res.writeHead(401, {
        'WWW-Authenticate': 'Basic realm="Parse Client Interface"'
      });
      res.end();
    } else {
      next();
    }
  });

  app.use(compression());
  app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.set('view engine', 'ejs');
  app.set('port', config.get('port'));

  return app;
}

module.exports.createRoutes = function(app, config) {
  var indexHandler = function(req, res, next) {
    //res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    res.render('pages/index', {
        parse_app_key: config.get('parse.appKey'),
        parse_js_key: config.get('parse.appKey')
    });
  }
  app.get('/', indexHandler);
}

module.exports.startApp = function(app) {
  app.listen(app.get('port'), function(){
    console.log('Server listening on port ', app.get('port'));
  });
}
