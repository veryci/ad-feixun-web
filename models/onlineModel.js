const mongoose = require('mongoose');
const online = require('../schema/Online');
const config = require('config');

const { dbCollection } = config.get('mongodb.flow');

const onlineSchema = new mongoose.Schema(online);

const onlineModel = mongoose.model(dbCollection.online, onlineSchema, dbCollection.online);

exports.onlineModel = onlineModel;

exports.getOnlineData = async () => {
  const data = {
    'feixun-k2': 800,
    'feixun-k3': 900,
  };
  return data;
};

