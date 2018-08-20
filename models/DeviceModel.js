const mongoose = require('mongoose');
const Device = require('../schema/Device');
const config = require('config');

const { dbCollection } = config.get('mongodb.flow');

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
  // let rows = await DeviceModel.find({ date: { $gte: '2019-02-16', $lte: endTime } });
  let rows = await DeviceModel.find().sort({ date: '-1' }).limit(1);
  console.log(rows, '========');


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

