const fs = require("fs").promises;
const {createServer} = require("http");
const {join} = require("path");

const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const {MongoClient} = require("mongodb");
const {Server} = require("socket.io");
const siofu = require("socketio-file-upload");

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

  app.use("/assets", express.static(join(__dirname, "assets")));
  app.use(express.static(join(__dirname, "frontend/dist")));
  app.use(siofu.router);

  app.get("/", (req, res) => res.sendFile(`${__dirname}/frontend/dist/index.html`));
  app.get("*", (req, res) => res.sendFile(`${__dirname}/frontend/dist/index.html`));

  const uploader = new siofu({
    dir: "assets/avatars",
    maxFileSize: 1000000
  });

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

    uploader.listen(socket);

    uploader.on("saved", async (event) => {
      console.log(`
        ==========
        ${event.file.success}
        ==========
      `);

      const src = event.file.name;
      const {username} = event.file.meta;

      try {
        await fs.rename(`assets/avatars/${src}`, `assets/avatars/${username}.jpg`);
      } catch (error) {
        console.error(error);
      }

      // await fs.copyFile(
      //   `frontend/dist/assets/avatars/${username}.jpg`,
      //   `frontend/src/assets/avatars/${username}.jpg`
      // );
    })
  });

  httpServer.listen(port);
};

init();