interface Product {
  _id: string;
  title: string;
  url: string;
  category: {
    title: string;
    url: string;
  };
  content: string;
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
  reviews: Array<{
    urls: {
      category: string;
      subcategory: string;
      product: string;
      review: string;
    }
    username: string;
    posted: Date;
    stars: number;
    title: string;
    content: string;
    likes: Array<string>;
  }>;
  stars: Array<number>;
  details: {
    content: string;
    url: string;
  };
};

interface GetProductParams {
  product: Product;
}

export {Product, GetProductParams}
