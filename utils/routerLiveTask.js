const moment = require('moment');
const logUtil = require('./log');
const config = require('config');
const request = require('request');
const DeviceModel = require('../models/DeviceModel');

const routerLive = config.get('transmit.routerLive');

const url = routerLive.transmitUrl;
const tms = routerLive.intervalTime;

async function getDb() {
  try {
    const time = moment().format('YYYYMMDD');
    request(
      {
        method: 'GET',
        uri: `${url}?d=${time}`,
      }
      , async (error, response, body) => {
        if (response.statusCode === 200) {
          logUtil.log(`body=====${JSON.stringify(body)}`);
          const dt = moment().format('YYYY-MM-DD');
          const obj = {
            date: dt,
            lastUpdate: new Date(),
            info: JSON.parse(body),
          };
          const db = await DeviceModel.save(dt, obj);
          logUtil.log(`db=====${db}`);
          return db;
        }
      },
    );
  } catch (err) {
    logUtil.err(err);
  }
}

setInterval(async () => {
  await getDb();
}, tms);

getDb();

