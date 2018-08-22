const router = require('koa-router')({ prefix: '/api' });
const moment = require('moment');
const config = require('config');

const DeviceModel = require('../models/DeviceModel');

const during = config.get('during') || 10;

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
  let { startTime, endTime } = ctx.query;
  startTime = startTime === '0' ? new Date() : startTime;
  endTime = endTime === '0' ? new Date() : endTime;
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
    moment(end).subtract(during, 'day').startOf('day').toDate();

  let range = Math.floor(Math.abs(start - end) / 1000 / 60 / 60 / 24);
  // console.log(range);
  range = range < during ? during : range;
  // console.log(start, end);
  // const data = await DeviceModel.search(start, end);
  const today = moment().startOf('day');
  const flow = {
    today: 32,
    totalNum: 3432,
    chart: [],
  };
  const active = {
    today: 32,
    totalNum: 3432,
    chart: [],
  };
  const online = {
    today: 32,
    totalNum: 3432,
    chart: [],
  };
  for (let index = range; index > 0; index -= 1) {
    const date = today.clone().subtract(index, 'day').toDate();
    const flowChartItem = {
      date,
      num: Math.floor(Math.random() * 100),
    };
    flow.chart.push(flowChartItem);
    const activeChartItem = {
      date,
      num: Math.floor(Math.random() * 100),
    };
    active.chart.push(activeChartItem);
    const onlineChartItem = {
      date,
      num: Math.floor(Math.random() * 100),
    };
    online.chart.push(onlineChartItem);
  }
  // data
  ctx.body = {
    flow,
    active,
    online,
  };
});


module.exports = router;
