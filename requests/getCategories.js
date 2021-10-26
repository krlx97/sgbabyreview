const getCategories = async (app, params) => {
  const {mongo, io} = app;

  const categories = await mongo.getCategories();

  if (!categories) { return; }

  io.emit("getCategories", {categories});
};

module.exports = getCategories;