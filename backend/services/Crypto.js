class Crypto {
  #bcrypt;
  #jwt;

  constructor (bcrypt, jwt) {
    this.#bcrypt = bcrypt;
    this.#jwt = jwt;
  }

  #handleError (error) { console.error(error); }

  async hashPassword (password) {
    let hash;

    try {
      hash = await this.#bcrypt.hash(password, 12);
    } catch (error) {
      this.#handleError(error);
    }

    return hashedPassword;
  }

  async verifyPassword (password, hash) {
    let isVerified;

    try {
      isVerified = await this.#bcrypt.compare(password, hash);
    } catch (error) {
      this.#handleError(error);
    }

    return isVerified;
  }

  signToken (id, options) {
    const {secret} = config.jwt;
    let token;

    try {
      token = this.#jwt.sign({id}, secret, options);
    } catch (error) {
      this.#handleError(error);
    }

    return token;
  }

  async verifyToken (token) {
    const {secret} = config.jwt
    const {socket, db} = this

    try {
      const {id} = jwt.verify(token, secret)

      if (id) {
        const _id = mongodb.ObjectId(id)
        const account = await db.collection('accounts').findOne({_id})

        if (account) {
          return account
        }
      }
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        socket.emit('matDialogClose')
        socket.emit('expiredToken')
      } else if (err.name === 'JsonWebTokenError') {
        socket.emit('matDialogClose')
        socket.emit('invalidToken')
      } else {
        console.error(err)
      }
    }
  }
}

module.exports = Crypto;