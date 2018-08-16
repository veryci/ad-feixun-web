const mongoose = require('mongoose');
const config = require('config');
const moment = require('moment');
const schema = require('@veryci/ad-flow-schema');

const { dbCollection } = config.get('mongodb.flow');

const missCountSchema = new mongoose.Schema(schema.MissCount, { read: 'secondaryPreferred' });

const MissCountModel = mongoose.model('missCount', missCountSchema, dbCollection.missCount);

exports.MissCountModel = MissCountModel;


exports.missCount = async ({
  startDate = moment().startOf('day').toDate(),
  endDate = moment().endOf('day').toDate(),
}) => {
  try {
    const count = await MissCountModel.where({
      createDate: { $gte: startDate, $lte: endDate },
    }).count('count').exec();
    return count;
  } catch (err) {
    throw (err);
  }
};

exports.aggregateMissCount = async ({
  endDate = moment().endOf('day').toDate(),
  startDate = moment().subtract(30, 'day').startOf('day').toDate(),
}) => {
  try {
    const count = await MissCountModel.aggregate().match({
      createDate: { $gte: startDate, $lt: endDate },
    }).group({ _id: null, count: { $sum: '$count' } })
      .exec();
    return count;
  } catch (err) {
    throw (err);
  }
};

exports.aggregateMissCountByDate = async ({
  endDate = moment().endOf('day').toDate(),
  startDate = moment().subtract(30, 'day').startOf('day').toDate(),
}) => {
  try {
    const count = await MissCountModel.aggregate().match({
      createDate: { $gte: startDate, $lt: endDate },
    }).group({ _id: '$date', count: { $sum: '$count' } }).exec();
    return count;
  } catch (err) {
    throw (err);
  }
};

/*
exports.aggregateMissSizeCount = async ({
  endDate = moment().endOf('day').toDate(),
  startDate = moment().subtract(30, 'day').startOf('day').toDate(),
}) => {
  try {
    const count = await MissModel.aggregate().match({
      createDate: { $gte: startDate, $lte: endDate },
      divW: { $exists: true },
      date: { $exists: true },
    }).group({
      _id: {
        divW: '$divW',
        divH: '$divH',
      },
      count: { $sum: 1 },
    }).exec();
    return count;
  } catch (err) {
    throw (err);
  }
};
*/
