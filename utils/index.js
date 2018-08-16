
const checkValueLogin = async (ctx, next) => {
  const { user } = ctx.session;
  if (user && user.mobile) {
    await next();
  } else {
    ctx.status = 401;
    ctx.body = 'please login';
  }
};

exports.checkValueLogin = checkValueLogin;
