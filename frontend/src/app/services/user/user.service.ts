import {Injectable} from "@angular/core";
import {User} from "src/app/models/user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  isLoggedIn = true;
  user: User = {
    _id: "abc",
    city:" 7",
    country: "Srbija.",
    email: "@@0",
    firstName: "Milos",
    lastName: "Krstic",
    referals: [],
    reviews: [],
    token: "",
    username: "milos"
  };
}
