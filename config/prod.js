const config = {
  jwtToken: process.env.JWT_TOKEN,
  mongoURI: process.env.MONGO_URI,
  appPort: process.env.APP_PORT
};

module.exports = config;
