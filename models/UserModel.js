const mongoose = require('mongoose');
const schema = require('@veryci/ad-flow-schema');
// const db = require('./database');
const config = require('config');
const { check, generate, random } = require('../utils/password');

const { dbCollection } = config.get('mongodb.flow');

const usersSchema = new mongoose.Schema(schema.Users);

const UserModel = mongoose.model(dbCollection.user, usersSchema, dbCollection.user);

exports.UserModel = UserModel;

exports.checkUser = async (mobile, password) => {
  // check mobile. password
  // check fail throw custom err
  if (!mobile || !password) {
    return '用户名或密码不正确';
  }
  try {
    const userDoc = await UserModel.findOne({ mobile });
    if (!userDoc) {
      return '没有该用户';
    }
    if (check(userDoc.password, password)) {
      userDoc.password = '';
      return userDoc;
    }
    return '密码不正确';
  } catch (err) {
    throw (err);
  }
};

exports.findAllUser = async () => {
  try {
    const users = await UserModel.find({ del: { $ne: true } }).sort({ accountType: -1 }).select('mobile username cpId initPwd js factor price userRole').exec();
    return users;
  } catch (err) {
    throw (err);
  }
};

/**
 * updateUser, createNewUser
 * @param {Object} param0 ..
 */
exports.editUser = async ({
  _id, mobile, username, js, fromID, factor = 100, userRole = 'normal', accountType = 1, del = false,
}) => {
  const newUser = new UserModel();
  newUser.mobile = mobile;
  newUser.factor = factor;
  newUser.username = username;
  newUser.userRole = userRole;
  newUser.accountType = accountType;
  newUser.del = del;
  newUser.js = Object.assign({ r: 0, f: 0, e: 0 }, js);
  if (_id) {
    newUser._id = _id;
  } else {
    const cpIdPre = parseFloat(mobile).toString(36);
    const cpId = Date.now().toString(36);
    const initPass = random();
    newUser.initPwd = initPass;
    newUser.password = generate(initPass);
    newUser.sortCPId = cpIdPre;
    newUser.cpId = `${cpIdPre}${cpId}`;
    newUser.fromID = fromID;
  }
  try {
    await UserModel.findOneAndUpdate({ _id: newUser._id }, newUser, { upsert: true }).exec();
    delete newUser.password;
    return newUser;
  } catch (err) {
    throw (err);
  }
};

exports.allCpUser = async () => {
  try {
    const users = await UserModel.find({ del: { $ne: true }, cpId: { $ne: '%CP_ID%' } })
      .select('username cpId ').exec();
    return users;
  } catch (err) {
    throw (err);
  }
};
