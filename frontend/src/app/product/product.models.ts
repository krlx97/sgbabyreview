interface Product {
  _id: string;
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

interface GetProductParams {
  product: Product;
}

export {Product, GetProductParams}