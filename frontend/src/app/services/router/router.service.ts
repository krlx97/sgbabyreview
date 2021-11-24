import {Injectable} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

interface Urls {
  category: string | null;
  subcategory: string | null;
  product: string | null;
  referer: string | null;
  review: string | null;
}

@Injectable({
  providedIn: "root"
})
export class RouterService {
  public urls: Urls = {
    category: null,
    subcategory: null,
    product: null,
    referer: null,
    review: null
  };

  public categoryUrl: string | null = null;
  public subcategoryUrl: string | null = null;
  public productUrl: string | null = null;
  public referer: string | null = null;
  public review: string | null = null;

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.paramMap.subscribe((paramMap) => {
      this.urls = {
        category: paramMap.get("category"),
        subcategory: paramMap.get("subcategory"),
        product: paramMap.get("product"),
        referer: paramMap.get("referer"),
        review: paramMap.get("review")
      }
      this.categoryUrl = paramMap.get("category");
      this.subcategoryUrl = paramMap.get("subcategory");
      this.productUrl = paramMap.get("product");
      this.referer = paramMap.get("referer");
      this.review = paramMap.get("review");
    });
  }
}
