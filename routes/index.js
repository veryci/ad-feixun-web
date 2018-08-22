const router = require('koa-router')({ prefix: '/api' });
const moment = require('moment');
const config = require('config');
// const XLSX = require('xlsx');
const xlsx = require('node-xlsx');
const nanoid = require('nanoid');
const fs = require('fs');

const DeviceModel = require('../models/DeviceModel');

const during = config.get('during') || 10;

require('moment-timezone');

moment.tz.setDefault('Asia/Shanghai');

router.get('/', async (ctx) => {
  ctx.body = {
    api: 'api with koa2',
  };
});

router.get('/overviewexcel', async (ctx) => {
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
  const start = moment(startTime).startOf('day').toDate();

  const range = Math.ceil(Math.abs(start - end) / 1000 / 60 / 60 / 24);
  const data = [
    ['日期', '流量', '日活', '在线'],
  ];
  for (let index = 0; index < range; index += 1) {
    const date = moment(end).subtract(index).toDate();
    const item = [
      date,
      Math.round(Math.random() * 10),
      Math.round(Math.random() * 10),
      Math.round(Math.random() * 10),
    ];
    data.push(item);
  }


  const buffer = xlsx.build([{ name: '数据表', data }]); // Returns a buffer
  ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  ctx.set('Content-Disposition', 'attachment; filename=datas.xlsx');
  ctx.body = buffer;
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
  const start = moment(startTime).startOf('day').toDate();

  const range = Math.ceil(Math.abs(start - end) / 1000 / 60 / 60 / 24);
  // console.log(range);
  // range = range < during ? during : range;
  // console.log(start, end);
  // const data = await DeviceModel.search(start, end);
  const today = moment().startOf('day');
  const flow = {
    today: 32,
    totalNum: Math.round(Math.random() * 100),
    chart: [],
  };
  const active = {
    today: 32,
    totalNum: Math.round(Math.random() * 100),
    chart: [],
  };
  const online = {
    today: 32,
    totalNum: Math.round(Math.random() * 100),
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
