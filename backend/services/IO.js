class IO {
  #io;
  #socket;

  constructor(io, socket) {
    this.#io = io;
    this.#socket = socket;
  }

  emit (event, params) { this.#socket.emit(event, params); }
  on (event, cb) { this.#socket.on(event, cb); }
  notification (msg) { this.#socket.emit("notification", {msg}); }
}

module.exports = IO;