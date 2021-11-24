interface User {
  token: string;
  _id: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  email: string;
  username: string;
  referals: string[];
  reviews: any[];
}

export {User};
