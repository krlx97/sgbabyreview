const {createServer} = require("http");
const {join} = require("path");
const express = require("express");
const {MongoClient} = require("mongodb");
const {Server} = require("socket.io");
const settings = require("./settings");
const requests = require("./requests");
// const {Eos, IO, Mongo} = require("./services/index.js");

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

  app.use(express.static(join(__dirname, "dist")))
  app.get("/", (req, res) => res.sendFile(`${__dirname}/dist/index.html`))
  app.get("*", (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

  socketioServer.on("connection", (socket) => {
    // const eos = new Eos(api, socket);
    // const io = new IO(socketioServer, socket);
    // const mongo = new Mongo(mongoDb, socket);
    // const app: App = {eos, io, mongo};

    requestKeys.forEach((request) => {
      io.on(request, (params = {}) => {
        requests[request](app, params);
      })
    });
  });

  httpServer.listen(port);
};

init();