const {ObjectId} = require("mongodb");

class Mongo {
  #db;

  constructor (db) { this.#db = db; }

  #handleError (error) { console.error(error); }

  async getCategories () {
    let document;

    try { document = await this.#db.collection("categories").find().toArray(); }
    catch (error) { this.#handleError(error); }

    return document ? document : undefined;
  }

  async getSubcategories (url) {
    let document;

    try { document = await this.#db.collection("categories").findOne({url}); }
    catch (error) { this.#handleError(error); }

    return document ? document.subcategories : undefined;
  }

  async getProducts (url) {
    let documents;

    try { documents = await this.#db.collection(url).find().toArray(); }
    catch (error) { this.#handleError(error); }

    return documents ? documents : undefined;
  }

  async getProduct (subcategory, productId) {
    let documents;
    const _id = new ObjectId(productId);

    try { documents = await this.#db.collection(subcategory).findOne({_id}); }
    catch (error) { this.#handleError(error); }

    return documents ? documents : undefined;
  }

  async findUser (query) {
    let document;

    try { document = await this.#db.collection("users").findOne(query); }
    catch (error) { this.#handleError(error); }

    return document ? document : undefined;
  }

  async insertUser (params) {
    let inserted;

    try { inserted = await this.#db.collection("users").insertOne(params); }
    catch (error) { this.#handleError(error); }

    return inserted;
  }

  async updateUser (query, params) {
    let update;

    try { update = await this.#db.collection("users").updateOne(query, {$set: params}); }
    catch (error) { this.#handleError(error); }

    return update.modifiedCount > 0 ? true : false;
  }
}

module.exports = Mongo;