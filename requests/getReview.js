const getReview = async (app, params) => {
  const {io, mongo} = app;
  const review = await mongo.getReview(params);

  if (!review) { return; }

  io.emit("getReview", review);
};

module.exports = getReview;