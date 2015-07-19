var util = require('util');
var convict = require('convict');

var config = module.exports = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV'
  },
  ipaddress: {
    doc: 'The server ip address to bind.',
    default: "0.0.0.0",
    env: 'IP'
  },
  port: {
    doc: 'The server port to bind',
    format: 'port',
    default: "3000",
    env: 'PORT'
  },
  parse:{
    appKey:{
      doc: 'Parse application Key',
      default: '',
      env: 'PARSE_APP_KEY'
    },
    jsKey:{
      doc: 'Parse javascript Key',
      default: '',
      env: 'PARSE_JS_KEY'
    }
  },
  user: {
    name: {
      doc: 'Authentication username.',
      default: "admin",
      env: 'AUTH_USERNAME'
    },
    password: {
      doc: 'Authentication password',
      default: "admin",
      env: 'AUTH_PASSWORD'
    },
  }
});

config.validate();
