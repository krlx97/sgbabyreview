import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {IoService} from "../io.service";

@Component({
  selector: "app-subcategories",
  templateUrl: "./subcategories.component.html",
  styleUrls: ["./subcategories.component.css"]
})
export class SubcategoriesComponent implements OnInit, OnDestroy {
  public products: Array<any> = [];
  public subcategoryUrl: string | null = "";
  public categoryUrl: string | null = "";
  public paramMapSub = this._activatedRoute.paramMap.subscribe((paramMap) => {
    this.categoryUrl = paramMap.get("category");
    this.subcategoryUrl = paramMap.get("subcategory");
    const url = paramMap.get("subcategory");
    this._io.emit("getProducts", {url});
  });

  constructor (
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _io: IoService
  ) {}

  public ngOnInit (): void {
    this._io.on("getProducts", (params) => {
      this.products = params.products;
    });
  }

  public ngOnDestroy (): void {
    this._io.off("getProducts");
    this.paramMapSub.unsubscribe();
  }
}