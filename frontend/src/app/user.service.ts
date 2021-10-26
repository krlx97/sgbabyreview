import {Injectable} from "@angular/core";

interface User {
  token: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

@Injectable({
  providedIn: "root"
})
export class UserService {
  isLoggedIn = false;
  user: User;

  constructor () {}
}