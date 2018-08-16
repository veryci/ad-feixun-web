const agent = require('superagent');
const moment = require('moment');
const DeviceModel = require('../models/DeviceModel');

const url = 'http://c.so9.cc:8082/routerlive/feixun';
// const url = 'http://localhost:7070/api/version';
const tms = 5000;
let int = '';
let n = 8;
/**
 * 当n<0或请求到数据时，停止发送请求
 */
async function getDb() {
  try {
    n -= 1;

    if (n <= 0) {
      clearInterval(int);
    }

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
      if (db.info) {
        clearInterval(int);
      }
      return db;
    }
  } catch (err) {
    console.log('err', err);
  }
}

int = setInterval(() => {
  getDb();
}, tms);
