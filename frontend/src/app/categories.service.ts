import {Injectable} from "@angular/core";

interface Subcategory {
  title: string;
  url: string;
}
interface Category {
  title: string;
  url: string;
  subcategories: Array<Subcategory>
}

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  categories: Array<Category> = [];

  public getCategory (url: string): Category | undefined {
    return this.categories.find((category) => category.url === url);
  }
}