const writeReview = async (app, params) => {
  const {io, mongo} = app;
  const updated = await mongo.insertReview(params);

  if (!updated) { return; }

  io.notification("Review posted successfully.");
};

module.exports = writeReview;