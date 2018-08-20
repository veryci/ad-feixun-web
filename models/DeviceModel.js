const mongoose = require('mongoose');
const Device = require('../schema/Device');
const config = require('config');

const { dbCollection } = config.get('mongodb.flow');

const deviceSchema = new mongoose.Schema(Device);

const DeviceModel = mongoose.model(dbCollection.device, deviceSchema, dbCollection.device);

exports.DeviceModel = DeviceModel;

exports.save = async (dt, obj) => {
  let rows = null;
  rows = await DeviceModel.findOneAndUpdate({ date: dt }, { $set: obj }, { new: true });

  if (rows === null) {
    rows = await DeviceModel.create(obj);
  }
  return rows;
};

exports.search = async (startTime, endTime) => {
  let data = await DeviceModel.find({ date: { $gte: startTime, $lte: endTime } }).sort({ date: '-1' });
  if (data.length === 0) {
    data = [{
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

  return data;
};

