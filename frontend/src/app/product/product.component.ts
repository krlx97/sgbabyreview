import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import { ImageService } from "../services/image.service";
import {IoService} from "../services/io/io.service";
import {RouterService} from "../services/router/router.service";
import {UserService} from "../services/user/user.service";
import {GetProductParams, Product} from "./product.models";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
  providers: [RouterService]
})
export class ProductComponent implements OnInit, OnDestroy {
  constructor (
    private readonly _formBuilder: FormBuilder,
    private readonly _io: IoService,
    private readonly _routerService: RouterService,
    public readonly userService: UserService,
    public readonly imageService: ImageService
  ) {}

  public product: Product;
  public averageStars = 0;
  public stars = [1, 2, 3, 4, 5];
  public readonly writeReviewForm = this._formBuilder.group({
    stars: [1],
    title: [""],
    content: [""],
  });


  //======
  public oneWidth = 0;
  public twoWidth = 0;
  public threeWidth = 0;
  public fourWidth = 0;
  public fiveWidth = 0;
  //======


  public onReviewSubmit (): void {
    const {category, subcategory, product} = this._routerService.urls;
    const {username} = this.userService.user;
    const {stars, title, content} = this.writeReviewForm.value;

    this._io.emit("writeReview", {
      urls: {category, subcategory, product},
      username,
      stars,
      title,
      content
    });
  }

  public onLikeReview (reviewUrl: string): void {
    const {subcategoryUrl, productUrl} = this._routerService;
    const {username} = this.userService.user;

    this._io.emit("likeReview", {username, subcategoryUrl, productUrl, reviewUrl});
  }

  public async onShareReview(urls): Promise<void> {
    console.log(urls);
    const {category, subcategory, product, review} = urls;
    await navigator.clipboard.writeText(`http://localhost:4200/products/${category}/${subcategory}/${product}/review/${review}`);
  }

  public ngOnInit (): void {
    const {subcategoryUrl, productUrl} = this._routerService;

    this._io.on("getProduct", (params: GetProductParams) => {
      const {product} = params;
      const {stars} = product;

      this.product = product;

      const totalStars = stars.reduce((previous, star) => previous + star);
      const starsVal = stars.reduce((prev, star, i) => star * (i + 1));

      this.oneWidth = 100 / totalStars * stars[0];
      this.twoWidth = 100 / totalStars * stars[1];
      this.threeWidth = 100 / totalStars * stars[2];
      this.fourWidth = 100 / totalStars * stars[3];
      this.fiveWidth = 100 / totalStars * stars[4];

      this.averageStars = (starsVal / totalStars);
    });

    this._io.on("likeReview", (params) => {
      const {username, subcategoryUrl, productUrl, reviewUrl} = params;

      if (this.product.url === productUrl) {
        const review = this.product.reviews.find((review) => review.urls.review === reviewUrl);

        if (!review) { return; }

        const i = this.product.reviews.indexOf(review);

        if (this.product.reviews[i].likes.includes(username)) {
          const k = this.product.reviews[i].likes.indexOf(username);

          this.product.reviews[i].likes.splice(k, 1);
        } else {
          this.product.reviews[i].likes.push(username);
        }
      }
    });

    this._io.emit("getProduct", {subcategoryUrl, productUrl});
  }

  public ngOnDestroy (): void {
    this._io.off("getProduct");
  }
}
