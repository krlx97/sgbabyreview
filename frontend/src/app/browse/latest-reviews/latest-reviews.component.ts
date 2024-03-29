import {Component, OnInit} from "@angular/core";
import { ImageService } from "src/app/services/image.service";
import {IoService} from "../../services/io/io.service";

@Component({
  selector: "app-latest-reviews",
  templateUrl: "./latest-reviews.component.html",
  styleUrls: ["./latest-reviews.component.css"]
})
export class LatestReviewsComponent implements OnInit {
  public recentReviews: any[] = [];

  constructor (
    private readonly _ioService: IoService,
    public readonly imageService: ImageService
  ) {}

  public getStars(review): any {
    const totalStars = review.stars.reduce((sum, star) => sum + star);
    const starsVal = review.stars.reduce((sum, star, i) => sum + (star * (i + 1)));

    return starsVal / totalStars;
  }
  public getStarsFloor(review): any {
    const totalStars = review.stars.reduce((sum, star) => sum + star);
    const starsVal = review.stars.reduce((sum, star, i) => sum + (star * (i + 1)));

    return Math.floor(starsVal / totalStars);
  }

  public ngOnInit(): void {
    this._ioService.on("getRecentReviews", (params: any) => {
      console.log(params);

      this.recentReviews = params.recentReviews.reverse();

      
    });

    this._ioService.emit("getRecentReviews");
  }

  public async onShare (recentReview): Promise<void> {
    const {url, categoryUrl, subcategoryUrl, productUrl} = recentReview;
    await navigator.clipboard.writeText(`http://localhost:4200/products/${categoryUrl}/${subcategoryUrl}/${productUrl}/review/${url}`);
  }
}
