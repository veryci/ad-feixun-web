const Koa = require('koa');
const Router = require('koa-router');
const convert = require('koa-convert');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser')();
const config = require('config');
const session = require('koa-session');
const logger = require('koa-logger');
const compress = require('koa-compress');
const { Z_SYNC_FLUSH } = require('zlib');
require('./utils/task');
// require('./utils/onlineDataGet');


require('./models/database');
const index = require('./routes/index');
const users = require('./routes/users');

const { name, version } = require('./package.json');

const PORT = config.get('server.port');

// let indexHTML = '';
// const readFile = util.promisify(fs.readFile);

const app = new Koa();
const router = new Router();

// middlewares
if (process.env.NODE_ENV === 'dev') {
  app.use(logger());
}

app.use(compress({
  filter: contentType => /text|javascript/i.test(contentType),
  threshold: 2048,
  flush: Z_SYNC_FLUSH,
}));
app.use(convert(bodyparser));
app.use(convert(json()));


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
  // const start = new Date();
  try {
    await next();
    // const { status } = ctx;
    // if (status === 404) {
    //   if (!indexHTML) indexHTML = await readFile(`${__dirname}/build/index.html`, 'utf-8');
    //   ctx.body = indexHTML;
    // } else {
    //   ctx.body = indexHTML;
    // }
  } catch (error) {
    // 记录异常日志
    console.error(error);
    ctx.throw(error);
  }
});

router.get('/version', (ctx) => {
  ctx.body = `${name}: ${version}`;
});

// router.use('/docdoc.routes(), doc.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

// api
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// static
app.use(require('koa-static')(`${__dirname}/build`));

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(PORT, () => {
  console.log(`[${process.env.NODE_ENV}] Server ${name}: ${version} startat ${PORT}`);
});
