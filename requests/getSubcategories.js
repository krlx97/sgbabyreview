const getSubcategories = async (app, params) => {
  const {io, mongo} = app;
  const {url} = params;

  const subcategories = await mongo.getSubcategories(url);

  if (!subcategories) { return; }

  io.emit("getSubcategories", {subcategories});
};

module.exports = getSubcategories;