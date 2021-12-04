import {Component, OnDestroy, OnInit} from "@angular/core";
import { ImageService } from "../services/image.service";
import {IoService} from "../services/io/io.service";
import {RouterService} from "../services/router/router.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
  providers: [RouterService]
})
export class ProductsComponent implements OnDestroy, OnInit {
  public products: Array<any> = [];

  constructor (
    private readonly _ioService: IoService,
    private readonly _routerService: RouterService,
    public readonly imageService: ImageService
  ) {}

  public getStars (product): number {
    const totalStars = product.stars.reduce((sum, star) => sum + star);
    const starsVal = product.stars.reduce((sum, star, i) => sum + (star * (i + 1)));
    console.log(totalStars, starsVal);

    if (totalStars && starsVal) {
      return starsVal / totalStars;
    } else {
      return 0
    }
    // return starsVal / totalStars === NaN ? 0 : starsVal / totalStars;
  }

  public ngOnInit (): void {
    const {_ioService, _routerService} = this;
    const {subcategory} = _routerService.urls;

    _ioService.on("getProducts", (params) => {
      this.products = params.products;
    });

    _ioService.emit("getProducts", {url: subcategory});
  }

  public ngOnDestroy (): void {
    const {_ioService} = this;

    _ioService.off("getProducts");
  }
}
