const crypto = require("crypto")
const {ObjectId} = require("mongodb");

class Mongo {
  #db;

  constructor (db) { this.#db = db; }

  #handleError (error) { console.error(error); }

  async getCategories () {
    let documents;

    try {
      documents = await this.#db.collection("categories").find().toArray();
    } catch (error) {
      this.#handleError(error);
    }

    return documents ? documents : undefined;
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

  async getProduct (params) {
    const {subcategoryUrl, productUrl: url} = params;
    let document;

    try {
      document = await this.#db.collection(subcategoryUrl).findOne({url});
    } catch (error) {
      this.#handleError(error);
    }

    return document ? document : undefined;
  }

  async getRecentReviews () {
    let documents;

    try {
      documents = await this.#db.collection("recentReviews").find().toArray();
    } catch (error) {
      this.#handleError(error);
    }

    return documents ? documents : undefined;
  }

  async insertReview (params) {
    const {urls, username, stars, title, content} = params;
    const review = crypto.randomBytes(4).toString("hex");
    const posted = new Date();

    let update;
    let updateProfile;

    try {
      // console.log(await this.#db.collection("recentReviews").count());

      // await this.#db.collection("recentReviews").deleteOne({});

      await this.#db.collection("recentReviews").insertOne({
        urls: {...urls, review},
        username,
        posted,
        stars,
        title,
        content,
        likes: []
      });

      update = await this.#db.collection(urls.subcategory).updateOne({
        url: urls.product
      }, {
        $push: {
          reviews: {
            urls: {...urls, review},
            username,
            posted,
            stars,
            title,
            content,
            likes: []
          }
        },
        $inc: {
          [`stars.${(stars - 1).toString()}`]: 1
        }
      });

      updateProfile = await this.#db.collection("users").updateOne({username}, {
        $push: {
          reviews: {
            urls: {...urls, review},
            username,
            posted,
            stars,
            title,
            content,
            likes: []
          }
        }
      });
    } catch (error) {
      this.#handleError(error);
    }

    return update.modifiedCount > 0 && updateProfile.modifiedCount > 0 ? true : false;
  }

  async likeReview (params) {
    const {username, subcategoryUrl, productUrl, reviewUrl} = params;
    let updated;
    let product;

    try {
      product = await this.#db.collection(subcategoryUrl).findOne({
        url: productUrl
      });

      const review = product.reviews.find((review) => review.url === reviewUrl);
      const i = product.reviews.indexOf(review);

      const user = await this.#db.collection("users").findOne({username: product.reviews[i].username});

      const userReview = user.reviews.find((review) => review.url === reviewUrl);
      const k = user.reviews.indexOf(userReview);

      if (product.reviews[i].likes.includes(username)) {
        updated = await this.#db.collection(subcategoryUrl).updateOne({
          url: productUrl
        }, {
          $pull: {
            [`reviews.${i}.likes`]: username
          }
        });

        await this.#db.collection("users").updateOne({username: product.reviews[i].username}, {
          $inc: {
            [`reviews.${k}.likes`]: -1
          }
        });
      } else {
        updated = await this.#db.collection(subcategoryUrl).updateOne({
          url: productUrl
        }, {
          $push: {
            [`reviews.${i}.likes`]: username
          }
        });

        await this.#db.collection("users").updateOne({username: product.reviews[i].username}, {
          $inc: {
            [`reviews.${k}.likes`]: 1
          }
        });
      }
    } catch (error) {
      this.#handleError(error);
    }

    return updated.modifiedCount > 0 ? true : false;
  }

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

  async updateUser (query, params) {
    let update;

    try {
      update = await this.#db.collection("users").updateOne(query, {$set: params});
    } catch (error) {
      this.#handleError(error);
    }

    return update.modifiedCount > 0 ? true : false;
  }

  async updateUser2 (query, params) {
    let update;

    try {
      update = await this.#db.collection("users").updateOne(query, params);
    } catch (error) {
      this.#handleError(error);
    }

    return update.modifiedCount > 0 ? true : false;
  }

  async getReview (params) {
    const {subcategory, product, review} = params;
    let document;

    try {
      document = await this.#db.collection(subcategory).findOne({url: product});
    } catch (error) {
      this.#handleError(error);
    }

    if (document) {
      const revieww = document.reviews.find((x) => x.urls.review === review);

      if (revieww) { return revieww; }
      else { return undefined; }
    } else {
      return undefined;
    }
  }
}

module.exports = Mongo;
