import {Injectable} from "@angular/core";
import {Category} from "./categories.models";

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  public categories: Array<Category> = [];

  public getCategory (url: string): Category | undefined {
    return this.categories.find((category) => category.url === url);
  }
}
