const router = require('koa-router')();
const fs = require('fs');

router.get('/', async (ctx) => {
  const docPath = `${process.cwd()}/docs/index.html`;
  const doc = new Promise((reslove) => {
    fs.readFile(docPath, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        reslove(data);
      }
    });
  });
  const rs = await doc;
  console.log(rs);
  ctx.type = 'html';
  ctx.body = rs;
});

module.exports = router;
