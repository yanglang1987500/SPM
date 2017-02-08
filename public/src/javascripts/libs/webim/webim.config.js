/**
 * git do not control webim.config.js
 * everyone should copy webim.config.js.demo to webim.config.js
 * and have their own configs.
 * In this way , others won't be influenced by this config while git pull.
 *
 */
var config = require('../../../../../framework/webim.config'),appConfig = require('../../../../../configs/appConfig');

var WebIM = window.WebIM = {};
WebIM.config = config[appConfig.WEBIM];
module.exports = WebIM.config;
