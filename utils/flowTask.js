const moment = require('moment');
const logUtil = require('./log');
const config = require('config');
const rp = require('request-promise');
require('moment-timezone');

moment.tz.setDefault('Asia/Shanghai');

const FlowModel = require('../models/FlowModel');

const flowLive = config.get('transmit.flowLive');
const url = flowLive.transmitUrl;
const tms = flowLive.intervalTime;

async function liveData() {
  const time = moment().format('YYYYMMDD');
  try {
    const body = await rp.get(`${url}?d=${time}`, { json: true });
    const date = moment().startOf('day').toDate();
    let num = 0;
    if (body) num = body.count || 0;
    const obj = {
      date,
      lastUpdate: new Date(),
      num,
    };
    // console.log(obj);
    await FlowModel.save(obj);
  } catch (err) {
    logUtil.err(err);
  }
}

setInterval(async () => {
  await liveData();
}, tms * 60 * 1000);

