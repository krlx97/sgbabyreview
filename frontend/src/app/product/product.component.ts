import {Component, OnDestroy, OnInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IoService } from "../io.service";
import { GetProductParams, Product } from "./product.models";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit, OnDestroy {
  product: Product;
  averageStars: number;

  readonly paramMapSub = this._activatedRoute.paramMap.subscribe((paramMap) => {
    const subcategory = paramMap.get("subcategory");
    const productId = paramMap.get("product");
    this._io.emit("getProduct", {subcategory, productId});
  });

  constructor (
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _io: IoService
  ) {}

  ngOnInit (): void {
    this._io.on("getProduct", (params: GetProductParams) => {
      this.product = params.product;

      const {one, two, three, four, five} = params.product.stars;
      this.averageStars = (1 * one + 2 * two + 3 * three + 4 * four + 5 * five) / (one + two + three + four + five);
    });
  }

  ngOnDestroy (): void {
    this._io.off("getProduct");
    this.paramMapSub.unsubscribe();
  }
}