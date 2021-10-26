const getProduct = async (app, params) => {
  const {io, mongo} = app;
  const {subcategory, productId} = params;

  const product = await mongo.getProduct(subcategory, productId);

  if (!product) { return; }

  io.emit("getProduct", {product});
};

module.exports = getProduct;