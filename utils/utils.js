const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const shortUUID = require('short-uuid');

const { saltRounds, secret } = require('../config/index');

exports.hashPassword = async plainTextPassword => {
  return bcrypt.hash(plainTextPassword, saltRounds);
};

exports.comparePassword = async (inputPassword, userPassword) => {
  return bcrypt.compare(inputPassword, userPassword);
};

exports.generateRandomUUID = () => {
  return shortUUID.generate();
};

exports.createJWT = async obj => {
  return JWT.sign(obj, secret, { expiresIn: 864000 * 15 });
};

exports.verifyJWT = async token => {
  return JWT.verify(token, secret);
};

exports.extractJWT = req => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return false;
};