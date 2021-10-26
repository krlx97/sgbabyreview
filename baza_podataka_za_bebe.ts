// getProducts();
// getProduct();
// getCategories();
// sendEmail();
// login();
// register();
// changeEmail();
// changePassword();
// writeReview();
// writeQuestion();
// writeAnswer();
// rateProduct();
// likeProduct();
// reportProduct();
// insertProduct();
// search();

interface Kategorije {
  podkategorije: {
    url: string;
 };
};

interface Categories {
  list: Array<{
    title: string;
    url: string;
  }>;
}

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface Product {
  title: string;
  category: string;
  stars: {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
  };
  content: string;
  reviews: Array<{
    username: string;
    timeOfPosting: Date;
    stars: number;
    title: string;
    content: string;
    likes: number;
  }>;
  qna: Array<{
    product: string;
    timeOfPosting: Date;
    username: string;
    content: string;
    answers: Array<{
      username: string;
      timeOfPosting: Date;
      content: string;
    }>;
  }>;
  details: {
    content: string;
    url: string;
  };
};

interface Blog {
  wallpaper: string;
  title: string;
  timeOfPosting: Date;
  category: string;
  content: string;
};