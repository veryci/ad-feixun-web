/**
 * Created by malifeng on 2018/3/22.
 */


exports.getResult = (code, msg, result) => {
  const obj = {
    code,
    msg,
    result,
  };
  return obj;
};

exports.getError = function (msg) {
  const obj = {
    code: 10001,
    msg,
    result: '',
  };
  return obj;
};
