const mongoose = require('mongoose');
const Device = require('../schema/Device');
const config = require('config');

const { dbCollection } = config.get('mongodb.feixunDB');

const deviceSchema = new mongoose.Schema(Device);

const DeviceModel = mongoose.model(dbCollection.device, deviceSchema, dbCollection.device);

exports.DeviceModel = DeviceModel;

exports.save = async (obj) => {
  let rows = null;
  rows = await DeviceModel.findOneAndUpdate({ date: obj.date }, { $set: obj }, { new: true });

  if (rows === null) {
    rows = await DeviceModel.create(obj);
  }
  return rows;
};

exports.search = async (startTime, endTime) => {
  const data = await DeviceModel.find({
    date: { $gte: startTime, $lte: endTime },
  }).sort({ date: '-1' });
  return data;
};

