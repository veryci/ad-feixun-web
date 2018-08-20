const mongoose = require('mongoose');
const Device = require('../schema/Device');
const config = require('config');
const request = require('superagent');

const { dbCollection } = config.get('mongodb.flow');
const routerLiveUrl = config.get('routerLiveUrl');

const deviceSchema = new mongoose.Schema(Device);

const DeviceModel = mongoose.model(dbCollection.device, deviceSchema, dbCollection.device);

exports.UserModel = DeviceModel;

exports.save = async (dt, obj) => {
  let rows = null;
  rows = await DeviceModel.findOneAndUpdate({ date: dt }, { $set: obj }, { new: true });

  if (rows === null) {
    rows = await DeviceModel.create(obj);
  }
  return rows;
};
/* eslint no-restricted-syntax:
["error", "FunctionExpression",
"WithStatement", "BinaryExpression[operator='in']"] */
exports.search = async (startTime, endTime) => {
  let rows = await DeviceModel.find({ date: { $gte: '2019-02-16', $lte: endTime } });

  if (rows.length === 0) {
    rows = [{
      info: {
        k1: 300,
        k2: 200,
        k3: 500,
      },
    }, {
      info: {
        k1: 240,
        k2: 320,
        k3: 510,
      },
    }];
  }


  const data = {};

  rows.forEach((element) => {
    const { info = {} } = element;

    for (const i in info) {
      if (!data[i]) {
        data[i] = info[i];
      } else {
        data[i] += info[i];
      }
    }
  });

  return data;
};

exports.getOnlineData = async (time) => {
  let data = {};
  try {
    const result = await request.get(`${routerLiveUrl}/?d=${time}`);
    data = JSON.parse(result.text);
  } catch (err) {
    console.log(err);
    data = 'get error';
  }
  return data;
};
