const mongoose = require('mongoose');
const config = require('config');
const { format } = require('util');

const flowDB = config.get('mongodb.flow');
const {
  dbUrl,
  dbUser,
  dbPassword,
  dbName,
} = flowDB;


let mongoUrl = '';
const user = encodeURIComponent(dbUser);
const password = encodeURIComponent(dbPassword);

if (user && password) {
  mongoUrl = format(dbUrl, user, password, dbName);
} else {
  mongoUrl = `${dbUrl}${dbName}`;
}

mongoose.connect(mongoUrl);

const db = mongoose.connection;
db.on('error', (error) => {
  console.error(error);
  setTimeout(() => {
    process.exit(1);
  }, 500);
});
db.once('open', () => {
  console.log('Mongodb,连接成功');
});

