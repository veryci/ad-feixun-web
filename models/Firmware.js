const mongoose = require('mongoose');
const firmware = require('../schema/Firmware');
const config = require('config');

const { dbCollection } = config.get('mongodb.feixunDB');

const firmwareSchema = new mongoose.Schema(firmware);

const firmwareModel = mongoose.model(dbCollection.firmware, firmwareSchema, dbCollection.firmware);

exports.firmwareModel = firmwareModel;

exports.find = async () => {
  const data = await firmwareModel.findOne();
  return data;
};

exports.findOne = async (version, code) => {
  const data = await firmwareModel.findOne({ version, code });
  return data;
};

exports.search = async () => {
  const data = await firmwareModel.find({
  }, { version: 1, url: 1 }).sort({ createDate: '-1' });
  return data;
};

exports.save = async (arr) => {
  const data = await firmwareModel.create(arr);
  return data;
};


(async function () {
  const rows = await firmwareModel.findOne();
  const arr = [];
  if (rows === null) {
    const { list } = require('../utils/firmware');
    list.forEach((element) => {
      arr.push({
        version: element,
        code: `111${element.split('.')[3]}`,
        url: `http://117.121.41.228:4040/firmware/K2A5-release-${element}.tar.gz`,
      });
    });
  }

  await firmwareModel.create(arr);
}());
