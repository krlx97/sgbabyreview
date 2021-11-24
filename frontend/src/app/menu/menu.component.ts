import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import { LoginFormComponent } from "../login-form/login-form.component";
import {UserService} from "../services/user/user.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  constructor (
    public readonly dialog: MatDialog,
    public readonly userService: UserService
  ) {}

  public openDialog(): void {
    if (this.userService.isLoggedIn) {
      const dialogRef = this.dialog.open(Plus);
    } else {
      const dialogRef = this.dialog.open(LoginFormComponent);
    }
  }

  ngOnInit(): void {}
}

@Component({
  selector: 'plus',
  templateUrl: 'plus.component.html',
})
export class Plus {}