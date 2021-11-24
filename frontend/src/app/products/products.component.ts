import {Component, OnDestroy, OnInit} from "@angular/core";
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
    private readonly _routerService: RouterService
  ) {}

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
