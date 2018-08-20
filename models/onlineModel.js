const mongoose = require('mongoose');
const online = require('../schema/Online');
const config = require('config');
const request = require('superagent');

const { dbCollection } = config.get('mongodb.flow');
const routerLiveUrl = config.get('routerLiveUrl');

const onlineSchema = new mongoose.Schema(online);

const onlineModel = mongoose.model(dbCollection.online, onlineSchema, dbCollection.online);

exports.UserModel = onlineModel;

exports.getOnlineData = async (time) => {
  let data = {};
  try {
    const result = await request.get(`${routerLiveUrl}/?d=${time}`);
    data = JSON.parse(result.text);
  } catch (err) {
    console.log(err);
  }
  return data;
};

