const moment = require('moment');
const logUtil = require('./log');
const config = require('config');
const rp = require('request-promise');
require('moment-timezone');

moment.tz.setDefault('Asia/Shanghai');

const DeviceModel = require('../models/DeviceModel');

const routerLive = config.get('transmit.routerLive');
const routerOnline = config.get('transmit.routerOnline');
const liveUrl = routerLive.transmitUrl;
const lineUrl = routerOnline.transmitUrl;

const tms = routerLive.intervalTime;

async function liveData() {
  const time = moment().subtract(1, 'days').format('YYYYMMDD');
  try {
    const info = await rp.get(`${liveUrl}?d=${time}`, { json: true });
    const online = await rp.get(`${lineUrl}?d=${time}`, { json: true });

    const date = moment().subtract(1, 'days').startOf('day').toDate();
    const obj = {
      date,
      lastUpdate: new Date(),
      info,
      online,
    };
    await DeviceModel.save(obj);
  } catch (err) {
    logUtil.err(err);
  }
}

setInterval(async () => {
  await liveData();
}, tms * 10 * 1000);

