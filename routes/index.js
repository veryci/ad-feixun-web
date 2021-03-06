const router = require('koa-router')({ prefix: '/api' });
const moment = require('moment');
const _ = require('lodash');
const xlsx = require('node-xlsx');
const config = require('config');
const rp = require('request-promise');

const DeviceModel = require('../models/DeviceModel');
const FlowModel = require('../models/FlowModel');

require('moment-timezone');

moment.tz.setDefault('Asia/Shanghai');

const routerLive = config.get('transmit.routerLive');
const url = routerLive.transmitUrl;

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
  const activeData = await DeviceModel.search(start, end);


  for (let index = 0; index < range; index += 1) {
    const date = moment(end).subtract(index, 'day').startOf('day').toDate();

    // 日活
    let activeDataDaily = 0;
    const activeDataItem = _.find(activeData, { date }) || {};
    Object.values(activeDataItem.info || {}).forEach((v) => {
      activeDataDaily += v;
    });
    const item = [
      date,
      Math.round(Math.random() * 10),
      activeDataDaily,
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
  const { endTime } = ctx.query;
  let { time } = ctx.query;
  if (endTime) {
    time = endTime;
  }
  time = time === '0' ? new Date() : time;

  if (!moment(time).isValid()) {
    ctx.status = 400;
    ctx.body = {
      msg: 'inValid params',
    };
    return;
  }

  // const end = moment(endTime).endOf('day').toDate();
  // const start = moment(startTime).startOf('day').toDate();

  // const totalActiveNum = 0;
  // const range = Math.ceil(Math.abs(start - end) / 1000 / 60 / 60 / 24);
  // const activeData = await DeviceModel.search(start, end);

  time = moment(time).format('YYYYMMDD');
  const body = await rp.get(`${url}?d=${time}`, { json: true });
  // const date = moment().startOf('day').toDate();

  let count = 0;

  for (i in body) {
    count += body[i];
  }

  const flow = {
    today: 0,
    totalNum: 0,
    chart: [],
  };

  ctx.body = {
    flow,
    active: {
      today: count,
      totalNum: count,
      chart: [],
    },
    online: {
      today: 0,
      totalNum: 0,
      chart: [],
    },
  };

  // activeData.forEach((v) => {
  //   const info = v.info || {};
  //   const values = Object.values(info);
  //   values.forEach((n) => {
  //     totalActiveNum += n;
  //   });
  // });
  // const today = moment().startOf('day');
  // const todayActiveData = _.find(activeData, { date: today.clone().toDate() });

  // let todayActive = 0;
  // const todayInfo = todayActiveData.info || {};
  // const todayValues = Object.values(todayInfo);
  // todayValues.forEach((v) => {
  //   todayActive += v;
  // });

  // const flowData = await FlowModel.search(start, end);
  // const todayFlowData = _.find(flowData, { date: today.clone().toDate() }) || {};

  // const flow = {
  //   today: todayFlowData.num || 0,
  //   totalNum: (() => {
  //     let n = 0;
  //     flowData.forEach(({ num = 0 }) => {
  //       n += num;
  //     });
  //     return n;
  //   })(),
  //   chart: [],
  // };
  // const active = {
  //   today: todayActive,
  //   totalNum: totalActiveNum,
  //   chart: [],
  // };
  // const online = {
  //   today: 32,
  //   totalNum: Math.round(Math.random() * 100),
  //   chart: [],
  // };
  // for (let index = range; index > 0; index -= 1) {
  //   const date = today.clone().subtract(index, 'day').toDate();

  //   const itemFlow = _.find(flowData, { date }) || {};
  //   const flowChartItem = {
  //     date,
  //     num: itemFlow.num || 0,
  //   };
  //   flow.chart.push(flowChartItem);

  //   const item = _.find(activeData, { date }) || {};
  //   const activeChartItem = {
  //     date,
  //     num: (() => {
  //       let num = 0;
  //       const info = item.info || {};
  //       Object.values(info).forEach((v) => {
  //         num += v;
  //       });
  //       return num;
  //     })(),
  //   };
  //   active.chart.push(activeChartItem);

  //   const onlineChartItem = {
  //     date,
  //     num: Math.floor(Math.random() * 100),
  //   };
  //   online.chart.push(onlineChartItem);
  // }

  // data
  // ctx.body = {
  //   flow,
  //   active,
  //   online,
  // };
});


module.exports = router;
