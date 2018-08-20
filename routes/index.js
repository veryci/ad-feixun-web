const router = require('koa-router')({ prefix: '/api' });
const moment = require('moment');
const DeviceModel = require('../models/DeviceModel');
const OnlineModel = require('../models/onlineModel');

router.get('/', async (ctx) => {
  ctx.body = {
    api: 'api with koa2',
  };
});

router.post('/active', async (ctx) => {
  const startTime = moment().subtract(2, 'day').startOf('day').toDate();
  const endTime = moment().endOf('day').toDate();

  const data = await DeviceModel.search(startTime, endTime);

  ctx.body = { data };
});

router.get('/online', async (ctx) => {
  const time = moment(new Date()).format('YYYYMMDD');

  const data = await OnlineModel.getOnlineData(time);

  ctx.body = data;
});

module.exports = router;
