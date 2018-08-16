const path = require('path');
const config = require('config');

// 日志根目录
const baseLogPath = path.resolve(__dirname, '../logs');

// 错误日志目录
const errorPath = path.resolve(__dirname, config.get('server.log.errorLogFilePath'));
// 错误日志文件名
// const errorFileName = 'error';
// 错误日志输出完整路径
const errorLogPath = path.resolve(__dirname, config.get('server.log.errorLogFile'));
// var errorLogPath = path.resolve(__dirname, "../logs/error/error");

// 响应日志目录
// const responsePath = path.resolve(__dirname, config.get('server.log.infoLogFilePath'));
// 响应日志文件名
// const responseFileName = 'response';
// 响应日志输出完整路径
// const responseLogPath = path.resolve(__dirname, config.get('server.log.infoLogFile'));
// var responseLogPath = path.resolve(__dirname, "../logs/response/response");
module.exports = {
  // 日志格式等设置
  appenders:
        {
          'rule-console': { type: 'console' },
          errorLogger: {
            type: 'dateFile',
            filename: errorLogPath,
            pattern: '-yyyy-MM-dd-hh.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            maxLogSize: 1000,
            numBackups: 3,
            path: errorPath,
          },
        },
  // 供外部调用的名称和对应设置定义
  categories: {
    default: { appenders: ['rule-console'], level: 'all' },
    errorLogger: { appenders: ['errorLogger'], level: 'error' },
  },
  baseLogPath,
};
