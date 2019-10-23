const knexClient = require('../config/knex');
const { verifyJWT, extractJWT } = require('../utils/utils');

module.exports = async (req, res, next) => {
  res.locals.user = null;
  return next();

  const token = extractJWT(req);

  if(!token) {
    return res.status(400).send({
      error: {
        status: res.statusCode,
        message: "No JWT provided",
      }
    });
  }

  let payload;
  try {
    payload = await verifyJWT(token);
  }catch(error) {
    return next(error);
  }
  
  const result = await knexClient.raw(`SELECT id, name, email, is_shop_owner FROM users WHERE id = '${payload.id}' AND email = '${payload.email}';`);
  const existingUser = JSON.parse(JSON.stringify(result))[0];

  if(existingUser.length === 0) {
    res.status(404).send({
      error: {
        status: res.statusCode,
        message: "User does not exist",
      }
    });
  }else {
    res.locals.user = existingUser[0];
    next();
  }
};
