/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const config = require('config');
const moment = require('moment');
const schema = require('@veryci/ad-flow-schema');
const { allCpUser } = require('./UserModel');

const { dbCollection } = config.get('mongodb.flow');

const viewCountSchema = new mongoose.Schema(schema.ViewCount, { read: 'secondaryPreferred' });

const ViewCountModel = mongoose.model('viewCount', viewCountSchema, dbCollection.viewCount);

exports.ViewCountModel = ViewCountModel;

exports.aggregateViewCount = async ({
  endDate = moment().endOf('day').toDate(),
  startDate = moment().subtract(30, 'day').startOf('day').toDate(),
}) => {
  try {
    const count = await ViewCountModel.aggregate().match({
      createDate: { $gte: startDate, $lt: endDate },
    }).group({ _id: null, count: { $sum: '$count' } })
      .exec();
    return count;
  } catch (err) {
    throw (err);
  }
};

exports.aggregateViewCountByDate = async ({
  endDate = moment().endOf('day').toDate(),
  startDate = moment().subtract(30, 'day').startOf('day').toDate(),
}) => {
  try {
    const count = await ViewCountModel.aggregate().match({
      createDate: { $gte: startDate, $lt: endDate },
    }).group({ _id: '$date', count: { $sum: '$count' } }).exec();
    return count;
  } catch (err) {
    throw (err);
  }
};

exports.aggregateViewCountWithCPID = async ({
  cpId = '',
  startDate = moment().subtract(30, 'day').startOf('day').toDate(),
}) => {
  try {
    const count = await ViewCountModel.aggregate().match({
      cpId,
      createDate: { $gte: startDate },
    }).group({ _id: '$date', count: { $sum: '$count' } })
      .sort({ _id: 1 })
      .exec();
    return count;
  } catch (err) {
    throw (err);
  }
};

exports.systemAdd = async ({
  cpId,
  count,
  time,
}) => {
  if (!cpId && !count) {
    return 'cpId or count not find';
  }
  const addTime = moment(time, 'YYYY-MM-DD HH:mm:ss');
  const hourTime = addTime.startOf('hour').toDate();
  const date = addTime.startOf('day').toDate();
  const createDate = new Date();
  const result = await ViewCountModel.create({
    cpId, count, date, hourTime, createDate, systemAdd: true,
  });
  return result;
};

exports.allSystemAddView = async () => {
  const result = [];
  const view = await ViewCountModel.find({ systemAdd: true }).sort('-createDate');
  const vccps = await allCpUser();
  const vccp = {};
  vccps.forEach(({ username, cpId }) => {
    vccp[cpId] = username;
  });
  view.forEach((item) => {
    const viewItem = item.toObject();
    viewItem.username = vccp[item.cpId];
    result.push(viewItem);
  });
  return result;
};

exports.updateOne = async ({ id, cpId, count }) => {
  const updateObj = {};
  if (cpId) {
    updateObj.cpId = cpId;
  }
  if (count) {
    updateObj.count = Number(count);
  }
  const result = await ViewCountModel.findByIdAndUpdate(
    { _id: id },
    updateObj,
    { new: true },
  );
  return result;
};

