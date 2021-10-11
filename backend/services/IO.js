class IO {
  io;
  socket;

  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }
}

module.exports = IO;