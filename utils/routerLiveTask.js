const moment = require('moment');
const logUtil = require('./log');
const config = require('config');
const rp = require('request-promise');
require('moment-timezone');

moment.tz.setDefault('Asia/Shanghai');

const DeviceModel = require('../models/DeviceModel');

const routerLive = config.get('transmit.routerLive');
const url = routerLive.transmitUrl;
const tms = routerLive.intervalTime;

async function liveData() {
  const time = moment().format('YYYYMMDD');
  try {
    const body = await rp.get(`${url}?d=${time}`, { json: true });
    logUtil.log(body);
    const date = moment().startOf('day').toDate();
    const obj = {
      date,
      lastUpdate: new Date(),
      info: body,
    };
    await DeviceModel.save(obj);
  } catch (err) {
    logUtil.err(err);
  }
}

setInterval(async () => {
  await liveData();
}, tms * 60 * 1000);

