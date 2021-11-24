import {Component, OnDestroy, OnInit} from "@angular/core";
import {CategoriesService} from "../services/categories/categories.service";
import {IoService} from "../services/io/io.service";
import {RouterService} from "../services/router/router.service";

@Component({
  selector: "app-subcategories",
  templateUrl: "./subcategories.component.html",
  styleUrls: ["./subcategories.component.css"],
  providers: [RouterService]
})
export class SubcategoriesComponent implements OnInit, OnDestroy {
  public subcategories: any[] = [];

  constructor (
    public readonly categoriesService: CategoriesService,
    private readonly _ioService: IoService,
    public readonly _routerService: RouterService
  ) {}

  ngOnInit (): void {
    this._ioService.on("getSubcategories", (params) => {
      this.subcategories = params.subcategories;
    });

    this._ioService.emit("getSubcategories", {
      url: this._routerService.urls.category
    });
  }

  public ngOnDestroy (): void {
    this._ioService.off("getSubcategories");
  }
}
