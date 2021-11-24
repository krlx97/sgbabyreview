const getCategories = async (app) => {
  const {mongo, io} = app;
  const categories = await mongo.getCategories();

  if (!categories) { return; }

  io.emit("getCategories", {categories});
};

module.exports = getCategories;