const knexClient = require('../config/knex');
const { generateRandomUUID, hashPassword, createJWT } = require('../utils/utils');

module.exports = async (req, res, next) => {
  const reqBody = req.body;

  if(!reqBody.email && !reqBody.password && !reqBody.hasOwnProperty("is_shop_owner")) {
    return res.status(400).send({
      error: {
        status: res.statusCode,
        message: "Please provide a valid email, password and is_shop_owner value"
      }
    });
  }else if(!reqBody.email) {
    return res.status(400).send({
      error: {
        status: res.statusCode,
        message: "Please provide a valid email"
      }
    });
  }else if(!reqBody.password) {
    return res.status(400).send({
      error: {
        status: res.statusCode,
        message: "Please provide a valid password"
      }
    });
  }else if(!reqBody.hasOwnProperty("is_shop_owner")) {
    return res.status(400).send({
      error: {
        status: res.statusCode,
        message: "Please provide a valid is_shop_owner value"
      }
    });
  }

  const existingUser = await knexClient.raw(`SELECT id FROM users WHERE email = '${reqBody.email}';`);

  if(JSON.parse(JSON.stringify(existingUser))[0].length !== 0) {
    return res.status(409).send({
      error: {
        status: res.statusCode,
        message: "User already exists"
      }
    });
  }

  const id = generateRandomUUID();
  const hashedPassword = await hashPassword(reqBody.password);
  await knexClient.raw(`INSERT INTO users VALUES ('${id}', '${reqBody.name ? reqBody.name : null}', '${hashedPassword}', '${reqBody.email}', ${reqBody.is_shop_owner});`);

  const token = await createJWT({ id, email: reqBody.email });
  return res.status(200).send({
    status: res.statusCode,
    message: "Signed up successfully",
    data: { token, id: result[0].id, name: result[0].name }
  });
};