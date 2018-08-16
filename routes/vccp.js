/* eslint-disable linebreak-style */
const vccp = require('../models/VCCPModel');

const router = require('koa-router')({
  prefix: '/api/vccp',
});

/**
 * 获取 cpId 和 vcMac 对应列表
 */

router.get('/', async (ctx) => {
  try {
    const result = await vccp.allVccp();
    ctx.body = result;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = '';
  }
});

/**
 * 新增 cpId 与 vcMac 对应
 */
router.post('/', async (ctx) => {
  const {
    isDel,
    vcMac,
    cpId,
    valuable,
  } = ctx.request.body;
  try {
    if (vcMac && cpId) {
      const result = await vccp.create({
        isDel,
        vcMac,
        cpId,
        valuable,
      });
      ctx.body = result;
    } else {
      ctx.status = 500;
      ctx.body = 'vcMac和cpId值不存在';
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = '';
  }
});

/**
 * 修改 cpId 与 vcMac 的对应
 */
router.put('/', async (ctx) => {
  const {
    _id,
    isDel = false,
    valuable = 1,
    vcMac,
    cpId,
  } = ctx.request.body;
  try {
    const result = await vccp.updateById(_id, {
      isDel,
      vcMac,
      cpId,
      valuable,
    });
    ctx.body = result;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = '';
  }
});

module.exports = router;
