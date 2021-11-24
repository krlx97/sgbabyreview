import {Component, OnDestroy, OnInit} from "@angular/core";

import {CategoriesService} from "../../services/categories/categories.service";
import {IoService} from "../../services/io/io.service";
import {RouterService} from "../../services/router/router.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
  providers: [RouterService]
})
export class CategoriesComponent implements OnDestroy, OnInit {
  constructor (
    public readonly categoriesService: CategoriesService,
    private readonly _ioService: IoService,
    private readonly _routerService: RouterService
  ) {}

  public category: any = {
    title: "",
    url: "",
    subcategories: []
  };
  public categoryUrl: any;
  public subcategories: any[] = [];

  public ngOnInit (): void {
    this._ioService.on("getSubcategories", (params) => {
      this.subcategories = params.subcategories;

      const category = this.categoriesService.getCategory(this._routerService.categoryUrl as string);

      if (category) {
        this.category = category;
      }
    });

    this._ioService.emit("getSubcategories", {
      url: this._routerService.urls.category
    });
  }

  public ngOnDestroy (): void {
    this._ioService.off("getSubcategories");
  }
}
