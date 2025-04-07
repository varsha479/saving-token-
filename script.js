
const jwt = require("jsonwebtoken");

const encrypt = (payload, secret) => {
  // Create a JWT token with 1 hour expiry
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return token;
};

module.exports = encrypt;