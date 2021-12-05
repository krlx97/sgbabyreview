import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageService} from "../services/image.service";
import {IoService} from "../services/io/io.service";
import {RouterService} from "../services/router/router.service";
import {UserService} from "../services/user/user.service";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.css"],
  providers: [RouterService]
})
export class ReviewComponent implements OnDestroy, OnInit {
  constructor (
    private readonly _matSnackBar: MatSnackBar,
    public readonly imageService: ImageService,
    private readonly _ioService: IoService,
    private readonly _routerService: RouterService,
    public readonly userService: UserService
  ) {}

  @Input()
  review: any;

  public onLikeReview (): void {
    const {username} = this.userService.user;
    const subcategoryUrl = this._routerService.urls.subcategory;
    const productUrl = this._routerService.urls.product;
    const reviewUrl = this.review.urls.review;

    this._ioService.emit("likeReview", {username, subcategoryUrl, productUrl, reviewUrl});
  }

  public onFlag(): void {
    this._matSnackBar.open("Review flagged successfully", "", {duration: 5000});
  }

  public ngOnInit (): void {
    const {_ioService, _routerService} = this;
    const {subcategory, product, review} = _routerService.urls;

    _ioService.on("getReview", (review) => { this.review = review; });

    // _ioService.on("likeReview", (params) => {
    //   const {username, subcategoryUrl, productUrl, reviewUrl} = params;

    //   if (this.review.likes.includes(username)) {
    //     const i = this.review.likes.indexOf(username);
    //     this.review.likes.splice(i, 1);
    //   } else {
    //     this.review.likes.push(username);
    //   }
    // });

    _ioService.emit("getReview", {subcategory, product, review});
  }

  public ngOnDestroy (): void {
    this._ioService.off("getReview");
  }
}
