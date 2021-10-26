const getProducts = async (app, params) => {
  const {io, mongo} = app;

  const products = await mongo.getProducts(params.url);

  if (!products) { return; }

  io.emit("getProducts", {products});
};

module.exports = getProducts;