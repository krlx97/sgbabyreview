const changeEmail = require("./changeEmail");
const changePassword = require("./changePassword");
const getCategories = require("./getCategories");
const getProduct = require("./getProduct");
const getProducts = require("./getProducts");
const getSubcategories = require("./getSubcategories");
const insertProduct = require("./insertProduct");
const likeProduct = require("./likeProduct");
const login = require("./login");
const rateProduct = require("./rateProduct");
const register = require("./register");
const reportProduct = require("./reportProduct");
const search = require("./search");
const sendEmail = require("./sendEmail");
const writeAnswer = require("./writeAnswer");
const writeQuestion = require("./writeQuestion");
const writeReview = require("./writeReview");

const requests = {
  changeEmail,
  changePassword,
  getCategories,
  getProduct,
  getProducts,
  getSubcategories,
  insertProduct,
  likeProduct,
  login,
  rateProduct,
  register,
  reportProduct,
  search,
  sendEmail,
  writeAnswer,
  writeQuestion,
  writeReview
};

module.exports = requests;