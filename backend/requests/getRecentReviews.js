const getRecentReviews = async (app, params) => {
  const {io, mongo} = app;
  const recentReviews = await mongo.getRecentReviews();

  if (!recentReviews) { return; }

  io.emit("getRecentReviews", {recentReviews});
};

module.exports = getRecentReviews;