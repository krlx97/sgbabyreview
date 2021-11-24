const likeReview = async (app, params) => {
  const {io, mongo} = app;
  const updated = await mongo.likeReview(params);

  if (!updated) { return; }

  io.emit("likeReview", params);
};

module.exports = likeReview;