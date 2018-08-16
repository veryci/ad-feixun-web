const agent = require('superagent');
const moment = require('moment');
const DeviceModel = require('../models/DeviceModel');

const url = 'http://c.so9.cc:8082/routerlive/feixun';
// const url = 'http://localhost:7070/api/version';
const tms = 1000 * 60 * 5;

async function getDb() {
  try {
    const rows = await agent.get(url);

    if (rows.status === 200) {
      const { body } = rows;
      const dt = moment().format('YYYY-MM-DD');
      const obj = {
        date: dt,
        lastUpdate: new Date(),
        info: body,
      };

      const db = await DeviceModel.save(dt, obj);
      return db;
    }
  } catch (err) {
    console.log('err', err);
  }
}

setInterval(() => {
  getDb();
}, tms);
