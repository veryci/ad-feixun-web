const router = require('koa-router')({ prefix: '/api' });
const moment = require('moment');
const DeviceModel = require('../models/DeviceModel');

require('moment-timezone');

moment.tz.setDefault('Asia/Shanghai');

router.get('/', async (ctx) => {
  ctx.body = {
    api: 'api with koa2',
  };
});

/**
 * 获取首页数据
 * GET
 * query
 * startTime: string (YYYY-MM-DD)
 * endTime: string
 */
router.get('/overview', async (ctx) => {
  const { startTime, endTime } = ctx.query;
  if (!moment(endTime).isValid() || !moment(startTime).isValid()) {
    ctx.status = 400;
    ctx.body = {
      msg: 'inValid params',
    };
    return;
  }
  const end = moment(endTime).endOf('day').toDate();
  const start = startTime ?
    moment(startTime).startOf('day').toDate() :
    moment(end).subtract(10, 'day').startOf('day').toDate();

  console.log(start, end);
  // const data = await DeviceModel.search(start, end);

  // data
  ctx.body = { };
});


module.exports = router;
