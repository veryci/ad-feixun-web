const mongoose = require('mongoose');
const config = require('config');
const moment = require('moment');
const schema = require('@veryci/ad-flow-schema');

const { dbCollection } = config.get('mongodb.flow');

const newCountSchema = new mongoose.Schema(schema.NewCount, { read: 'secondaryPreferred' });

const NewCountModel = mongoose.model(dbCollection.newCount, newCountSchema, dbCollection.newCount);

exports.NewCountModel = NewCountModel;

exports.aggregateNewCount = async ({
  endDate = moment().endOf('day').toDate(),
  startDate = moment().subtract(30, 'day').startOf('day').toDate(),
}) => {
  try {
    const count = await NewCountModel.aggregate().match({
      createDate: { $gte: startDate, $lt: endDate },
    }).group({ _id: null, count: { $sum: '$count' } })
      .exec();
    return count;
  } catch (err) {
    throw (err);
  }
};

exports.aggregateNewCountByDate = async ({
  endDate = moment().endOf('day').toDate(),
  startDate = moment().subtract(30, 'day').startOf('day').toDate(),
}) => {
  try {
    const count = await NewCountModel.aggregate().match({
      createDate: { $gte: startDate, $lt: endDate },
    }).group({ _id: '$date', count: { $sum: '$count' } }).exec();
    return count;
  } catch (err) {
    throw (err);
  }
};


exports.aggregateNewCountByDateCPID = async ({
  endDate = moment().endOf('day').toDate(),
  startDate = moment().subtract(30, 'day').startOf('day').toDate(),
}) => {
  try {
    const count = await NewCountModel.aggregate().match({
      cpId: { $ne: '%CP_ID%' },
      createDate: { $gte: startDate, $lt: endDate },
    }).group({
      _id: {
        date: '$date',
        cpId: '$cpId',
      },
      count: { $sum: '$count' },
    }).exec();
    return count;
  } catch (err) {
    throw (err);
  }
};

