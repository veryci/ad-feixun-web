const log4js = require('log4js');
const config = require('config');

const log_config = config.get('logs');

log4js.configure(log_config);

const errorLogger = log4js.getLogger('errorLogger');
const resLogger = log4js.getLogger('resLogger');

const logUtil = {};

// 格式化请求日志
const formatReqLog = (req, users) => {
  let logText = '';

  const { method } = req;
  let user = users;

  if (!user) {
    user = {};
  }

  const { name = '', cellphone = '' } = user;
  // 访问方法
  logText += `${method} ${req.originalUrl} ${name} ${cellphone}\n`;

  // 请求参数
  if (method === 'GET') {
    logText += `req-query:${JSON.stringify(req.query)}\n`;
  } else {
    logText += `req-body:${JSON.stringify(req.body)}\n`;
  }

  return logText;
};

// 格式化错误日志
const formatError = (ctx, err) => {
  let logText = '';

  const req = ctx.request;
  const { method } = req;
  const { user = {} } = ctx.session;

  const { name = '', cellphone = '' } = user;

  // 访问方法
  logText += `${method} ${req.originalUrl} ${name} ${cellphone}\n`;

  // 请求参数
  if (method === 'GET') {
    logText += `req-query:${JSON.stringify(req.query)}\n`;
  } else {
    logText += `req-body:${JSON.stringify(req.body)}\n`;
  }

  // 错误名称
  logText += `err: ${err}`;

  return logText;
};

// 格式化响应日志
const formatRes = (ctx, resTime) => {
  let logText = '';

  // 添加请求日志
  logText += formatReqLog(ctx.request, ctx.session, resTime);

  // 响应状态码
  logText += `res-status:${ctx.status}\n`;

  // 响应内容
  logText += `res-body:${JSON.stringify(ctx.body)}`;

  return logText;
};

// 封装错误日志
logUtil.logError = (ctx, error, resTime) => {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, resTime));
  }
};

// 封装响应日志
logUtil.logResponse = (ctx, resTime) => {
  if (ctx) {
    resLogger.info(formatRes(ctx, resTime));
  }
};

// 日志打印
logUtil.log = (message) => {
  resLogger.info(message);
};

module.exports = logUtil;
