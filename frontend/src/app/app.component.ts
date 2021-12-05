import {Component, OnInit} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

import {CategoriesService} from "./services/categories/categories.service";
import {IoService} from "./services/io/io.service";
import {UserService} from "./services/user/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor (
    private readonly _matSnackBar: MatSnackBar,
    public readonly categoriesService: CategoriesService,
    private readonly _ioService: IoService,
    public readonly user: UserService
  ) {}

  public ngOnInit (): void {
    this._ioService.on("notification", (params) => {
      this._matSnackBar.open(params.msg, "", {duration: 5000});
    });

    this._ioService.on("getCategories", (params) => {
      this.categoriesService.categories = params.categories;
    });

    this._ioService.emit("getCategories");
  }
}
