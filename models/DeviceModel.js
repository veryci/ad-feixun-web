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
