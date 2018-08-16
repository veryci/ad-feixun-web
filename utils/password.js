const crypto = require('crypto');

function random(length = 8) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
exports.random = random;

function generate(pwd) {
  const salt = random();
  const hash = crypto.pbkdf2Sync(pwd, salt, 1000, 32, 'sha256').toString('hex');
  return `${salt}.${hash}`;
}
exports.generate = generate;

function check(hmac, password) {
  const ts = hmac.split('.');
  const salt = ts[0];
  const token = ts[1];
  return token === crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha256').toString('hex');
}
exports.check = check;
