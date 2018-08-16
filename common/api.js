
const crypto = require('crypto');
const moment = require('moment');
const UserModel = require('../models/UserModel');
const ViewModel = require('../models/ViewModel');
const VccpModel = require('../models/VccpModel');
const VcModel = require('../models/VcModel');

function random(length = 8) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function generate(pwd) {
  const salt = random();
  const hash = crypto.pbkdf2Sync(pwd, salt, 1000, 32, 'sha256').toString('hex');
  return `${salt}.${hash}`;
}

function check(hmac, password) {
  const ts = hmac.split('.');
  const salt = ts[0];
  const token = ts[1];
  return token === crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha256').toString('hex');
}


exports.checkUser = async (mobile, password) => UserModel.findOne({ mobile })
  .then((userDoc) => {
    if (userDoc) {
      if (check(userDoc.password, password)) {
        return userDoc;
      }
      return false;
    } else if (userDoc === null) {
      return false;
    }
  }, (reject) => {
    console.log(reject);
    return false;
  });

const insertOrUpdate = item => VccpModel.updateMany(
  { vcMac: item.vcMac },
  { cpId: item.cpId, updateDate: new Date() },
  {
    upsert: true,
    setDefaultsOnInsert: true,
  },
).then(async (vcDoc) => {
  console.log(vcDoc);
  return true;
}, (reject) => {
  console.log(`reject=======================${reject}`);
  return false;
});

exports.findAllUsers = () =>
  UserModel.find().exec().then((result) => {
    const arr = [];
    result.forEach((user) => {
      let jsValue = '';
      const userDoc = user.toObject();
      if (user.js.r === 0) {
        jsValue = '-';
      } else if (user.js.r === 1) {
        jsValue = '-替换';
      }
      if (user.js.e === 0) {
        jsValue = `-${jsValue}`;
      } else if (user.js.e === 1) {
        jsValue = `-挤入${jsValue}`;
      }
      if (user.js.f === 0) {
        jsValue = `-${jsValue}`;
      } else if (user.js.f === 1) {
        jsValue = `-菲搜${jsValue}`;
      }
      userDoc.jsValue = jsValue;
      arr.push(userDoc);
    });
    return arr;
  }, (reject) => {
    console.log(reject);
    return false;
  });

exports.findUserBycpId = async cpId => new Promise((reslove) => {
  UserModel.findOne({ cpId }).exec((err, userDoc) => {
    if (err) {
      reslove(false);
    } else {
      console.log(userDoc);
      reslove(userDoc);
    }
  });
});

exports.resetUserPwd = async userId => new Promise((reslove) => {
  const initPass = random();
  const password = generate(initPass);
  UserModel.update({ _id: userId }, { $set: { password, initPwd: initPass } }, (err) => {
    if (err) {
      console.log(err);
      reslove(false);
    } else {
      reslove(initPass);
    }
  });
});

exports.createUser = async (mobile, from, username) => {
  const cpIdPre = parseFloat(mobile).toString(36);
  if (cpIdPre === 'NaN') {
    return 10004;
  }
  const initPass = random();
  const time = new Date();
  const cpId = time.getTime().toString(36);
  const record = new UserModel();
  record.mobile = mobile;
  record.username = username;
  record.password = generate(initPass);
  record.cpId = cpIdPre + cpId;
  record.initPwd = initPass;
  record.role = 'cp';
  record.from = from;
  record.createDate = time;
  record.sortCPId = cpIdPre;
  return new Promise((reslove) => {
    UserModel.findOne({ mobile }, (err, userDoc) => {
      if (userDoc) {
        reslove(10002);// 手机号已存在
      } else {
        record.save((error) => {
          if (error) {
            console.log(error);
            reslove(10003);// 保存错误
          } else {
            const obj = {
              mobile, password: initPass, cpId,
            };
            reslove(obj);
          }
        });
      }
    });
  });
};

exports.updateUser = async (user) => {
  const userObj = {};
  userObj.js = {};
  userObj.js.r = Number(user.jsr);
  userObj.js.e = Number(user.jse);
  userObj.js.f = Number(user.jsf);
  userObj.factor = Number(user.factor);
  userObj.username = user.username;
  if (user.price != null) {
    userObj.price = Number(user.price);
  }
  const accountType = Number(user.accountType.toString(10));
  userObj.accountType = accountType;
  if (accountType === 1) {
    userObj.userRole = 'normal';
  } else if (accountType === 4) {
    userObj.userRole = 'sales/commerce';
  } else if (accountType === 8) {
    userObj.userRole = 'agent';
  } else if (accountType === 16) {
    userObj.userRole = 'operator';
  } else if (accountType === 64) {
    userObj.userRole = 'admin';
  }
  return UserModel.update(
    { _id: user.id },
    { $set: userObj },
  ).then(result => result, (reject) => {
    console.log(reject);
    return false;
  });
};


exports.findAllViews = async (user, dayType, sortType, totalType) => {
  const queryParams = {};
  const groupObj = {};
  const projectObj = {};
  let sortObj = {};
  const dateNow = new Date();
  const preDate = new Date();
  if (user.accountType < 16) {
    queryParams.valuable = { $ne: 0 };
    queryParams.cpId = user.cpId;
  }
  if (dayType === '1') {
    preDate.setDate(preDate.getDate() - 1);
    queryParams.date = { $gte: preDate, $lte: dateNow };
  } else if (dayType === '2' || dayType == null || dayType === '') {
    preDate.setDate(preDate.getDate() - 7);
    queryParams.date = { $gte: preDate, $lte: dateNow };
  } else if (dayType === '3') {
    preDate.setDate(preDate.getDate() - 30);
    queryParams.date = { $gte: preDate, $lte: dateNow };
  }
  if (totalType === '1') {
    groupObj._id = {
      date: '$date',
    };
    sortObj = { '_id.date': -1 };
  } else if (totalType === '0' || totalType === undefined || totalType === null) {
    groupObj._id = {
      date: '$date',
      cpId: '$cpId',
    };
    projectObj.cpId = '$_id.cpId';
    sortObj = { '_id.cpId': -1, '_id.date': -1 };
  }
  groupObj.viewNum = { $sum: 1 };
  projectObj.viewNum = 1;
  projectObj.date = '$_id.date';
  const rs = await ViewModel.aggregate([
    { $match: queryParams },
    { $group: groupObj },
    { $sort: sortObj },
    { $project: projectObj },
  ]).then(async (result) => {
    const arr = [];
    const obj = {};
    for (let i = 0; i < result.length; i += 1) {
      const viewItem = result[i];
      viewItem.date = moment(viewItem.date).format('YYYY-MM-DD');
      viewItem.viewNum /= 1000;
      if (obj[viewItem.cpId] && totalType !== 1) {
        viewItem.username = obj[viewItem.cpId];
        arr.push(viewItem);
      } else if (totalType !== 1) {
        obj[viewItem.cpId] = await UserModel.findOne({ cpId: viewItem.cpId }).then((userDoc) => {
          if (userDoc && userDoc.username) {
            return userDoc.username;
          }
          return '没有用户名';
        });
        viewItem.username = obj[viewItem.cpId];
        arr.push(viewItem);
      } else if (totalType !== 1) {
        arr.push(viewItem);
      }
    }
    // function compare(property) {
    //   return function (a, b) {
    //     const value1 = a._id[property];
    //     const value2 = b._id[property];
    //     return value2 - value1;
    //   };
    // }
    // const rsDateSort = result.sort(compare('date'));
    // for (let i = 0; i < rsDateSort.length; i += 1) {
    //   rsDateSort[i]._id.date = moment(rsDateSort[i]._id.date).format('YYYY-MM-DD');
    //   rsDateSort[i].viewNum = rsDateSort[i].viewNum / 1000;
    //   if (obj[rsDateSort[i]._id.cpId]) {
    //     obj[rsDateSort[i]._id.cpId].push(rsDateSort[i]);
    //   } else if (obj[rsDateSort[i].cpId] === null || obj[rsDateSort[i].cpId] === undefined || obj[rsDateSort[i].cpId] === '') {
    //     obj[rsDateSort[i]._id.cpId] = [];
    //     obj[rsDateSort[i]._id.cpId].push(rsDateSort[i]);
    //   }
    // }
    // for (const key in obj) {
    // const username = await UserModel.findOne({ cpId: key }).then((userDoc) => {
    //   if (userDoc && userDoc.username) {
    //     return userDoc.username;
    //   }
    //   return '没有用户名';
    // });
    // obj[key].forEach((item) => {
    //   item.username = username;
    //   arr.push(item);
    // });
    // }
    // rsDateSort.forEach((item) => {
    //   const viewItem = item;
    //   /**
    //    * _id为私有属性，eslint报错
    //    */
    //   viewItem._id.date = moment(item._id.date).format('YYYY-MM-DD');
    //   viewItem.viewNum /= 1000;
    //   arr.push(item);
    // });
    console.log(arr);
    return arr;
  }, (reject) => {
    console.log(reject);
    return false;
  })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return rs;
};


/**
 * 测试注释.
 */

exports.insertVcMac = async (data) => {
  for (let i = 0; i < data.length; i += 1) {
    await insertOrUpdate(data[i]);
  }
  return true;
};


exports.findVcMac = () => VccpModel.find().sort({ updateDate: -1 }).exec().then(
  (result) => {
    console.log(result);
    const arr = [];
    for (let i = 0; i < result.length; i += 1) {
      const vcItem = result[i];
      vcItem.update = moment(vcItem.updateDate).format('YYYY-MM-DD HH:mm:ss');
      vcItem.create = moment(vcItem.createDate).format('YYYY-MM-DD HH:mm:ss');
      arr.push(vcItem);
    }
    console.log(arr);
    return arr;
  },
  (reject) => {
    console.log(reject);
    return false;
  },
);


exports.findVc = async () => {
  const queryParams = {};
  const sort = { createDate: -1 };
  /*
   *queryParams.cpId = user.cpId;
    * */
  const rs = await VcModel.aggregate([
    { $match: queryParams },
    {
      $group: {
        _id: {
          vcMac: '$vcMac',
        },
        createDate: { $max: '$createDate' },
      },
    },
    // { $sort: sort },
  ]).sort(sort).exec().then(
    (result) => {
      const arr = [];
      // function compare(property) {
      //   return function (a, b) {
      //     const value1 = a[property];
      //     const value2 = b[property];
      //     return value2 - value1;
      //   };
      // }
      // const rsDateSort = result.sort(compare('createDate'));
      for (let i = 0; i < result.length; i += 1) {
        const item = result[i];
        item.createDate = moment(result[i].createDate).format('YYYY-MM-DD HH:mm:ss');
        arr.push(item);
      }
      return arr;
    },
    (reject) => {
      console.log(reject);
      return false;
    },
  );
  return rs;
};
