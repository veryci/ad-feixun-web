/* eslint-disable linebreak-style */
const router = require('koa-router')({ prefix: '/api' });
const moment = require('moment');
const _ = require('lodash');

// const { allCpUser } = require('../models/UserModel');

// eslint-disable-next-line linebreak-style
const { checkValueLogin } = require('../utils');


router.get('/', async (ctx) => {
  ctx.body = {
    api: 'api with koa2',
  };
});

router.get('/dashboard/newcp', checkValueLogin, async (ctx) => {
  const days = 10;
  // const todayZeroTime = moment().endOf('day').toDate();
  // const yesterdayZeroTime = moment().subtract(1, 'day').startOf('day').toDate();
  // const tenZeroTime = moment().subtract(days, 'day').startOf('day').toDate();
  try {
    // const vccps = await allCpUser();
    const vccps = [];
    const vccp = {};
    vccps.forEach(({ username, cpId }) => {
      vccp[cpId] = username;
    });
    // const datas = await aggregateNewCountByDateCPID({
    //   startDate: tenZeroTime, endDate: todayZeroTime,
    // });
    // console.log(datas);

    const datas = [];

    const cpIds = new Set();
    datas.forEach((d) => {
      const { _id } = d;
      const { cpId } = _id;
      cpIds.add(cpId);
    });
    // ctx.body = datas;
    // return;
    const chartData = [];
    for (let index = days; index >= 0; index -= 1) {
      const date = moment().subtract(index, 'day').startOf('day');
      const item = { _id: date.toDate(), date: date.format('MM-DD') };
      cpIds.forEach((cpId) => {
        const itemIndex = _.findIndex(datas, o => _.isEqual(o._id, {
          cpId,
          date: date.toDate(),
        }));
        const { count = 0 } = datas[itemIndex] || {};
        const k = `${cpId.substr(0, 7)}-${vccp[cpId]}`;
        item[k] = count;
      });

      chartData.push(item);
    }
    chartData.sort((a, b) => a._id - b._id);
    ctx.body = chartData;
    // ctx.body = datas;
  } catch (err) {
    ctx.throw(err);
  }
});

router.get('/dashboard/:sort', checkValueLogin, async (ctx) => {
  // const todayZeroTime = moment().startOf('day').toDate();
  // const yesterdayZeroTime = moment().subtract(1, 'day').startOf('day').toDate();
  // const aWeekZeroTime = moment().subtract(7, 'day').startOf('day').toDate();
  const { sort } = ctx.params;
  let result = [0, 0, 0];
  switch (sort) {
    case 'new':
      // result = await Promise.all([
      //   aggregateNewCount({ startDate: todayZeroTime }),
      //   aggregateNewCount({ startDate: yesterdayZeroTime, endDate: todayZeroTime }),
      //   aggregateNewCount({ startDate: aWeekZeroTime, endDate: todayZeroTime }),
      // ]);
      // result = result.map(item => (item[0] ? item[0].count : 0));
      result = [29205, 27934, 162869];
      break;
    case 'view':
      // result = await Promise.all([
      //   aggregateViewCount({ startDate: todayZeroTime }),
      //   aggregateViewCount({ startDate: yesterdayZeroTime, endDate: todayZeroTime }),
      //   aggregateViewCount({ startDate: aWeekZeroTime, endDate: todayZeroTime }),
      // ]);
      // result = result.map(item => (item[0] ? item[0].count : 0));
      result = [8906, 7934, 62901];
      break;
    case 'miss':
      // result = await Promise.all([
      //   aggregateMissCount({ startDate: todayZeroTime }),
      //   aggregateMissCount({ startDate: yesterdayZeroTime, endDate: todayZeroTime }),
      //   aggregateMissCount({ startDate: aWeekZeroTime, endDate: todayZeroTime }),
      // ]);
      // result = result.map(item => (item[0] ? item[0].count : 0));
      result = [812, 734, 6053];
      break;
    default:
      break;
  }
  ctx.body = result;
});

router.get('/dashboard', checkValueLogin, async (ctx) => {
  const days = 10;
  // const todayZeroTime = moment().endOf('day').toDate();
  // const yesterdayZeroTime = moment().subtract(1, 'day').startOf('day').toDate();
  // const tenZeroTime = moment().subtract(days, 'day').startOf('day').toDate();
  try {
    // const start = new Date();
    // const [
    //   newAgg, viewAgg, missAgg,
    // ] = await Promise.all([
    //   aggregateNewCountByDate({ startDate: tenZeroTime, endDate: todayZeroTime }),
    //   aggregateViewCountByDate({ startDate: tenZeroTime, endDate: todayZeroTime }),
    //   aggregateMissCountByDate({ startDate: tenZeroTime, endDate: todayZeroTime }),
    // ]);
    // console.log(newAgg, missAgg, viewAgg);
    // console.log('read db', new Date() - start);
    const chartData = [];
    for (let index = days; index >= 0; index -= 1) {
      const date = moment().subtract(index, 'day').startOf('day');
      const item = { _id: date.toDate(), date: date.format('MM-DD') };
      // const newUUIDIndex = _.findIndex(newAgg, o => _.isEqual(o._id, date.toDate()));
      // const newUUIDItem = newAgg[newUUIDIndex] || { count: 0 };
      // item.new = newUUIDItem.count;

      // const newIndex = _.findIndex(viewAgg, o => _.isEqual(o._id, date.toDate()));
      // const newItem = viewAgg[newIndex] || { count: 0 };
      // item.view = newItem.count;

      // const missIndex = _.findIndex(missAgg, o => _.isEqual(o._id, date.toDate()));
      // const missItem = missAgg[missIndex] || { count: 0 };
      // item.miss = missItem.count;
      item.new = parseInt(Math.random() * 1200, 10);
      item.view = parseInt(Math.random() * 600, 10);
      item.miss = parseInt(Math.random() * 300, 10);


      chartData.push(item);
    }

    chartData.sort((a, b) => a._id - b._id);
    ctx.body = chartData;
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;
