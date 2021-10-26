import {Component, OnDestroy, OnInit} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { IoService } from "../io.service";
import { UserService } from "../user.service";
import { GetProductParams, Product } from "./product.models";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit, OnDestroy {
  product: Product;
  averageStars: number;
  stars = [1, 2, 3, 4, 5];
  readonly writeReviewForm = this._formBuilder.group({
    stars: [1],
    title: [""],
    content: [""],
  })

  subcategory: string | null;
  productId: string | null;

  readonly paramMapSub = this._activatedRoute.paramMap.subscribe((paramMap) => {
    const subcategory = paramMap.get("subcategory");
    const productId = paramMap.get("product");
    this.subcategory = paramMap.get("subcategory");
    this.productId = paramMap.get("product");
    this._io.emit("getProduct", {subcategory, productId});
  });

  constructor (
    private readonly _formBuilder: FormBuilder,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _io: IoService,
    public readonly userService: UserService
  ) {}

  public onReviewSubmit (): void {
    const {subcategory, productId} = this;
    const {stars, title, content} = this.writeReviewForm.value;
    const {username} = this.userService.user;
    const timeOfPosting = new Date();

    console.log("onReviewSubmit");
  
    this._io.emit("writeReview", {subcategory, productId, username, stars, title, content, timeOfPosting});
  }

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