/* eslint-disable linebreak-style,linebreak-style */
const router = require('koa-router')({
  prefix: '/api/users',
});
const { Role } = require('@veryci/ad-flow-schema');
const {
  checkUser, findAllUser, editUser,
} = require('../models/UserModel');

const { aggregateViewCountWithCPID } = require('../models/ViewCountModel');

const { checkValueLogin } = require('../utils');

router.get('/view/:cpId', async (ctx) => {
  const { cpId = '-' } = ctx.params;
  if (cpId.length !== '8i9b1nrjbbv8ph8'.length) {
    ctx.status = 400;
    ctx.body = '';
    return;
  }
  const result = await aggregateViewCountWithCPID({ cpId });
  ctx.body = result;
});

router.get('/auth', (ctx) => {
  const { user } = ctx.session;
  if (user) {
    ctx.body = user;
  } else {
    ctx.body = {};
  }
});

/**
 * @func 用户登录
 * @method  /api/users/login 用户登录
 * @param {string} mobile   电话号
 * @param {string} password  密码
 */
router.post('/login', async (ctx) => {
  const { body = {} } = ctx.request;
  const { mobile = '', password = '' } = body;
  try {
    const result = await checkUser(mobile, password);
    if (typeof result === 'string') {
      ctx.status = 406;
      ctx.body = result;
      return;
    }
    ctx.session.user = result;
    ctx.body = result;
  } catch (err) {
    ctx.throw(err);
  }
});

router.post('/logout', async (ctx) => {
  ctx.session.user = '';
  ctx.body = '';
});

router.get('/all', checkValueLogin, async (ctx) => {
  const { user } = ctx.session;
  let users = [];
  try {
    if (user.accountType > 8) { // 运营以上
      users = await findAllUser();
    }
    ctx.body = users;
  } catch (err) {
    ctx.throw(err);
  }
});

router.post('/edit', checkValueLogin, async (ctx) => {
  const { body } = ctx.request;
  const user = body;
  const fromID = ctx.session.user._id;
  const { accountType } = ctx.session.user;
  const { userRole } = user;
  const { privilege = 1 } = Role[userRole] || {};
  if (privilege > accountType) {
    ctx.status = 409;
    ctx.body = '无法设置该权限';
  }

  try {
    const result = await editUser({ ...user, accountType: privilege, fromID });
    ctx.body = result;
  } catch (error) {
    ctx.throw(error);
  }
});
router.del('/edit', checkValueLogin, async (ctx) => {
  const { body } = ctx.request;
  const user = body;
  // const fromID = ctx.session.user._id;
  const { accountType } = ctx.session.user;
  const { userRole } = user;
  const { privilege = 1 } = Role[userRole] || {};
  const operatorPrivilege = Role.operator.privilege;
  if (accountType < operatorPrivilege) {
    ctx.status = 409;
    ctx.body = '无法进行该操作';
    return;
  }
  if (privilege > accountType) {
    ctx.status = 409;
    ctx.body = '无法设置该权限';
  }

  try {
    const result = await editUser({ ...user, del: true });
    ctx.body = result;
  } catch (error) {
    ctx.throw(error);
  }
});
module.exports = router;
