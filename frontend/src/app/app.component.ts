import {Component, OnInit} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

import {CategoriesService} from "./categories.service";
import {IoService} from "./io.service";
import {UserService} from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor (
    private readonly _matSnackBar: MatSnackBar,
    public readonly categoriesService: CategoriesService,
    private readonly _io: IoService,
    public readonly user: UserService
  ) {}

  public ngOnInit (): void {
    this._io.on("notification", (params) => {
      this._matSnackBar.open(params.msg);
    });

    this._io.on("getCategories", (params) => {
      this.categoriesService.categories = params.categories;
    });

    this._io.emit("getCategories");
  }
}