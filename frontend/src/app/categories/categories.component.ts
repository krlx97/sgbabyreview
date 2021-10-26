import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CategoriesService} from "../categories.service";
import { IoService } from "../io.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"]
})
export class CategoriesComponent implements OnInit {
  public category: any = {
    title: "",
    url: "",
    subcategories: []
  };
  public categoryUrl: any;
  public subcategories: any[] = [];

  constructor (
    private readonly _route: ActivatedRoute,
    public readonly categories: CategoriesService,
    private readonly _io: IoService
  ) {}

  ngOnInit (): void {
    this._io.on("getSubcategories", (params) => {
      console.log(params);
      this.subcategories = params.subcategories;
    });

    this._route.paramMap.subscribe((params) => {
      this._io.emit("getSubcategories", {url: params.get("category")})
      this.categoryUrl = params.get("category");

      const category = this.categories.getCategory(this.categoryUrl);

      if (category) {
        this.category = category;
      }
    });
  }
}