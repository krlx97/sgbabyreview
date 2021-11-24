const getProduct = async (app, params) => {
  const {io, mongo} = app;
  const product = await mongo.getProduct(params);

  if (!product) { return; }

  io.emit("getProduct", {product});
};

module.exports = getProduct;