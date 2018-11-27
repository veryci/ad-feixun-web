const config = require('config');
const moment = require('moment');
const rp = require('request-promise');
const DeviceModel = require('../models/DeviceModel');

const num = 7;
const routerLive = config.get('transmit.routerLive');
const routerOnline = config.get('transmit.routerOnline');
const liveUrl = routerLive.transmitUrl;
const lineUrl = routerOnline.transmitUrl;

async function dbCreate(number) {
  const time = moment().subtract(number, 'days').format('YYYYMMDD');

  const info = await rp.get(`${liveUrl}?d=${time}`, { json: true });
  const online = await rp.get(`${lineUrl}?d=${time}`, { json: true });

  const date = moment().subtract(number, 'days').startOf('day').toDate();
  const obj = {
    date,
    lastUpdate: new Date(),
    info,
    online,
  };
  await DeviceModel.save(obj);
}

async function findOne() {
  const rows = await DeviceModel.findOne();
  const results = [];
  if (rows === null) {
    for (let i = 1; i < num; i++) {
      results.push(dbCreate(i));
    }
  }

  await Promise.all(results);
}

(async function () {
  await findOne();
}());
