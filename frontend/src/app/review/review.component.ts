import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {IoService} from "../services/io/io.service";
import {RouterService} from "../services/router/router.service";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.css"],
  providers: [RouterService]
})
export class ReviewComponent implements OnDestroy, OnInit {
  @Input()
  review: any;

  constructor (
    private readonly _ioService: IoService,
    private readonly _routerService: RouterService
  ) {}

  public ngOnInit (): void {
    const {_ioService, _routerService} = this;
    const {subcategory, product, review} = _routerService.urls;

    _ioService.on("getReview", (review) => { this.review = review; });
    _ioService.emit("getReview", {subcategory, product, review});
  }

  public ngOnDestroy (): void {
    const {_ioService} = this;

    _ioService.off("getReview");
  }
}
