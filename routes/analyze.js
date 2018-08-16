const router = require('koa-router')({
  prefix: '/api/analyze',
});
const request = require('superagent');
const config = require('config');

const analyzeUrl = config.get('analyzeUrl');

router.get('/time', async (ctx) => {
  try {
    const result = await request.get(`${analyzeUrl}/time`);
    ctx.response.body = result.body;
  } catch (err) {
    console.log(err);
    ctx.body = 500;
    ctx.body = '';
  }
});

router.get('/browser', async (ctx) => {
  try {
    const result = await request.get(`${analyzeUrl}/browser`);
    ctx.response.body = result.body;
  } catch (err) {
    console.log(err);
    ctx.body = 500;
    ctx.body = '';
  }
});

router.get('/device', async (ctx) => {
  try {
    const result = await request.get(`${analyzeUrl}/device`);
    ctx.response.body = result.body;
  } catch (err) {
    console.log(err);
    ctx.body = 500;
    ctx.body = '';
  }
});

router.get('/missSize', async (ctx) => {
  try {
    const result = await request.get(`${analyzeUrl}/missSize`);
    ctx.response.body = result.body;
  } catch (err) {
    console.log(err);
    ctx.body = 500;
    ctx.body = '';
  }
});

router.get('/size', async (ctx) => {
  try {
    const result = await request.get(`${analyzeUrl}/size`);
    ctx.response.body = result.body;
  } catch (err) {
    console.log(err);
    ctx.body = 500;
    ctx.body = '';
  }
});

router.get('/host', async (ctx) => {
  try {
    const result = await request.get(`${analyzeUrl}/host`);
    ctx.response.body = result.body;
  } catch (err) {
    console.log(err);
    ctx.body = 500;
    ctx.body = '';
  }
});

router.get('/uuid', async (ctx) => {
  try {
    const result = await request.get(`${analyzeUrl}/uuid`);
    ctx.response.body = result.body;
  } catch (err) {
    console.log(err);
    ctx.body = 500;
    ctx.body = '';
  }
});

router.get('/area', async (ctx) => {
  try {
    const result = await request.get(`${analyzeUrl}/area`);
    ctx.response.body = result.body;
  } catch (err) {
    console.log(err);
    ctx.body = 500;
    ctx.body = '';
  }
});

router.get('/size/os', async (ctx) => {
  try {
    const result = await request.get(`${analyzeUrl}/size/os`);
    ctx.response.body = result.body;
  } catch (err) {
    console.log(err);
    ctx.body = 500;
    ctx.body = '';
  }
});

module.exports = router;
