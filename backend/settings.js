const production = false;

const settings = {
  mongo: {
    uri: "mongodb://localhost:27017"
  },
  socket: {
    opts: production ? {} : {
      cors: {origin: "*"}
    }
  },
  server: {
    port: process.env.PORT || 4100
  }
};

module.exports = settings;