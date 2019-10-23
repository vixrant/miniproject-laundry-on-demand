const knexClient = require('../config/knex');
const { comparePassword, createJWT } = require('../utils/utils');

module.exports = async (req, res, next) => {
  const reqBody = req.body;

  if(!reqBody.email && !reqBody.password) {
    return res.status(400).send({
      error: {
        status: res.statusCode,
        message: "Please provide a valid email/password pair"
      }
    });
  }else if(!reqBody.password) {
    return res.status(400).send({
      error: {
        status: res.statusCode,
        message: "Please provide a valid password"
      }
    });
  }else if(!reqBody.email) {
    return res.status(400).send({
      error: {
        status: res.statusCode,
        message: "Please provide a valid email"
      }
    });
  }

  const existingUser = await knexClient.raw(`SELECT id, name, password FROM users WHERE email = '${reqBody.email}';`);
  const result = JSON.parse(JSON.stringify(existingUser))[0];

  if(result.length === 0) {
    return res.status(404).send({
      error: {
        status: res.statusCode,
        message: "User does not exist"
      }
    });
  }

  const verifyInputPassword = await comparePassword(reqBody.password, result[0].password);

  if(!verifyInputPassword) {
    return res.status(401).send({
      error: {
        status: res.statusCode,
        message: "Incorrect email/password pair"
      } 
    });
  }

  const token = await createJWT({ id: result[0].id, email: reqBody.email });
  return res.status(200).send({
    message: "Signed in successfully",
    data: { token, id: result[0].id, name: result[0].name },
  });
};