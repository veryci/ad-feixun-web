const log4js = require('log4js');
const config = require('config');

log4js.configure(config.get('logs'));

// const errorLogger = log4js.getLogger('errorLogger');
const resLogger = log4js.getLogger('resLogger');

const logUtil = {};

// 日志打印
logUtil.log = (message) => {
  resLogger.info(message);
};

logUtil.err = (message) => {
  resLogger.error(message);
};

module.exports = logUtil;
