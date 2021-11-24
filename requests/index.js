const changeEmail = require("./changeEmail");
const changePassword = require("./changePassword");
const getCategories = require("./getCategories");
const getProduct = require("./getProduct");
const getProducts = require("./getProducts");
const getRecentReviews = require("./getRecentReviews");
const getReview = require("./getReview");
const getSubcategories = require("./getSubcategories");
const likeReview = require("./likeReview");
const login = require("./login");
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
  getRecentReviews,
  getReview,
  getSubcategories,
  likeReview,
  login,
  register,
  reportProduct,
  search,
  sendEmail,
  writeAnswer,
  writeQuestion,
  writeReview
};

module.exports = requests;