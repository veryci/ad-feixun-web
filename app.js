const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const config = require('config');
const session = require('koa-session');
const logger = require('koa-logger');
const compress = require('koa-compress');
const { Z_SYNC_FLUSH } = require('zlib');

const index = require('./routes/index');
const { name, version } = require('./package.json');

require('./models/database');
require('./utils/task');
require('./utils/routerLiveTask');
require('./utils/flowTask');

const PORT = config.get('server.port');

const app = new Koa();

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'veryci:feixun-web', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false,
  renew: false,
};
app.use(session(CONFIG, app));

// logger
app.use(async (ctx, next) => {
  const { path } = ctx;
  if (path === '/version') {
    ctx.body = `${name}: ${version}`;
    return;
  }
  try {
    await next();
  } catch (error) {
    ctx.throw(error);
  }
});

// middlewares
if (process.env.NODE_ENV === 'dev') {
  app.use(logger());
}

app.use(compress({
  filter: contentType => /text|javascript/i.test(contentType),
  threshold: 2048,
  flush: Z_SYNC_FLUSH,
}));
app.use(bodyparser());

// api
app.use(index.routes(), index.allowedMethods());

// static
app.use(require('koa-static')(`${__dirname}/build`));

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(PORT, () => {
  console.log(`[${process.env.NODE_ENV}] Server ${name}: ${version} startat ${PORT}`);
});
