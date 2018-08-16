const mongoose = require('mongoose');
const config = require('config');
const schema = require('@veryci/ad-flow-schema');

const { UserModel } = require('./UserModel');

const { dbCollection } = config.get('mongodb.flow');
const vccpSchema = new mongoose.Schema(schema.VCCP);

const VCCPModel = mongoose.model('vccp', vccpSchema, dbCollection.vccp);

exports.create = async ({
  isDel,
  vcMac,
  cpId,
  valuable,
}) => {
  const date = new Date();
  const result = await VCCPModel.create({
    createDate: date,
    updateDate: date,
    vcMac,
    isDel,
    cpId,
    valuable,
  });
  return result;
};

exports.updateById = async (id, data) => {
  const vccp = new VCCPModel();
  vccp._id = id;
  vccp.vcMac = data.vcMac;
  vccp.cpId = data.cpId;
  vccp.updateDate = new Date();
  const result = await VCCPModel.findOneAndUpdate({ _id: vccp._id }, vccp).exec();
  return result;
};

exports.allVccp = async () => {
  const result = await VCCPModel.find({ isDel: false });
  const uservps = [];
  await Promise.all(result.map(async (r) => {
    const rObject = r.toObject();
    const user = await UserModel.findOne({ cpId: r.cpId }).exec();
    if (user) {
      rObject.username = user.toObject().username;
      uservps.push(rObject);
    } else {
      console.log(r.cpId);
    }
  }));
  return uservps;
};
