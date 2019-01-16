module.exports = {
  domain: {
    host: process.env.DOMAIN_HOST,
    protocol: process.env.DOMAIN_PROTOCOL,
  },
  crypt: {
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS)
  },
  Mongo: {
    HOST: process.env.MONGO_DB_HOST,
    PORT: Number(process.env.MONGO_DB_PORT),
    NAME: process.env.MONGO_DB_NAME
  }
};
