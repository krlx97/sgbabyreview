import {Component} from "@angular/core";
import {UserService} from "../services/user/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  constructor (public readonly userService: UserService) {}
}
