module.exports = {
  PORT: process.env.PORT || 9000,
  NODE_ENV: process.env.NODE_ENV || "development",
  HASH_ROUND: process.env.HASH_ROUND,
  JWT_SECRET: process.env.JWT_SECRET,
};
