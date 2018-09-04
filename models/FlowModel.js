const mongoose = require('mongoose');
const flow = require('../schema/Flow');
const config = require('config');

const { dbCollection } = config.get('mongodb.feixunDB');

const flowSchema = new mongoose.Schema(flow);

const FlowModel = mongoose.model(dbCollection.flow, flowSchema, dbCollection.flow);

exports.FlowModel = FlowModel;

exports.save = async (obj) => {
  let rows = null;
  rows = await FlowModel.findOneAndUpdate({ date: obj.date }, { $set: obj }, { new: true });

  if (rows === null) {
    rows = await FlowModel.create(obj);
  }
  return rows;
};

exports.search = async (startTime, endTime) => {
  const data = await FlowModel.find({
    date: { $gte: startTime, $lte: endTime },
  }).sort({ date: '-1' });
  return data;
};

