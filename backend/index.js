const {createServer} = require("http");
const {join} = require("path");

const bcrypt = require("bcrypt");
const express, {static} = require("express");
const jwt = require("jsonwebtoken");
const {MongoClient} = require("mongodb");
const {Server} = require("socket.io");

const settings = require("./settings");
const requests = require("./requests");
const {Crypto, IO, Mongo} = require("./services");

const init = async () => {
  const {
    mongo: {uri},
    socket: {opts},
    server: {port}
  } = settings;

  const app = express();
  const httpServer = createServer(app);
  const socketioServer = new Server(httpServer, opts);

  const mongoClient = await MongoClient.connect(uri);
  const mongoDb = mongoClient.db("bebe");

  const requestKeys = Object.keys(requests);

  // =====REDIRECT TO HTTPS FOR PRODUCTION!!!=====
  // app.use((req, res, next) => {
  //   if (req.header("x-forwarded-proto") !== "https")
  //     res.redirect(`https://${req.header("host")}${req.url}`)
  //   else
  //     next()
  // })
  // =============================================

  app.use(static(join(__dirname, "frontend")));
  app.get("/", (req, res) => res.sendFile(`${__dirname}/frontend/index.html`));
  app.get("*", (req, res) => res.sendFile(`${__dirname}/frontend/index.html`));

  socketioServer.on("connection", (socket) => {
    const crypto = new Crypto(bcrypt, jwt);
    const io = new IO(socketioServer, socket);
    const mongo = new Mongo(mongoDb, socket);
    const app = {crypto, io, mongo};

    requestKeys.forEach((request) => {
      socket.on(request, (params = {}) => {
        requests[request](app, params);
      });
    });
  });

  httpServer.listen(port);
};

init();