const production = false;

const settings = {
  mongo: {
    uri: "mongodb+srv://test:test@cluster0.ycjif.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  },
  socket: {
    opts: production ? {} : {
      cors: {origin: "*"}
    }
  },
  server: {
    port: process.env.PORT || 4100
  },
  jwt: {
    secret: process.env.JWT_SECRET || "supersecretpassword"
  }
};

module.exports = settings;