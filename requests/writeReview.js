const writeReview = async (app, params) => {
  const {io, mongo} = app;
  const {subcategory, productId, username, stars, title, content, timeOfPosting} = params;

  console.log("writeReview reqest");

  const updated = await mongo.insertReview(subcategory, productId, username, stars, title, content, timeOfPosting);

  if (!updated) { return; }

  io.notification("Review posted successfully.");
};

module.exports = writeReview;