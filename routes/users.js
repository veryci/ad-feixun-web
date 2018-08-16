/* eslint-disable linebreak-style,linebreak-style */
const router = require('koa-router')({ prefix: '/api/users' });

// const { checkUser } = require('../models/UserModel');

/**
 * @func 用户登录
 * @method  /api/users/login 用户登录
 * @param {string} mobile   电话号
 * @param {string} password  密码
 */
router.post('/login', async (ctx) => {
  const { body = {} } = ctx.request;
  const { mobile = '', password = '' } = body;

  if (mobile === '11111111111' && password === '111111') {
    const result = {
      username: '管理员',
      mobile,
      password,
      userRole: 'admin',
      accountType: 128,
      cpId: 8096,
    };
    ctx.session.user = result;
    ctx.body = result;
  } else {
    ctx.status = 406;
    ctx.body = { message: '账户:11111111111，密码：111111' };
  }
});

router.post('/logout', async (ctx) => {
  ctx.session.user = '';
  ctx.body = '';
});

router.get('/auth', (ctx) => {
  const { user } = ctx.session;
  if (user) {
    ctx.body = user;
  } else {
    ctx.body = {};
  }
});

module.exports = router;
