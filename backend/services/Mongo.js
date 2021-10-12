class Mongo {
  #db;

  constructor (db) { this.#db = db; }

  #handleError (error) { console.error(error); }

  async findUser (query) {
    let document;

    try {
      document = await this.#db.collection("users").findOne(query);
    } catch (error) {
      this.#handleError(error);
    }

    return document ? document : undefined;
  }

  async insertUser (params) {
    let inserted;

    try {
      inserted = await this.#db.collection("users").insertOne(params);
    } catch (error) {
      this.#handleError(error);
    }

    return inserted;
  }
}

module.exports = Mongo;