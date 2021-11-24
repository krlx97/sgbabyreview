import {Injectable} from "@angular/core";
import settings from "../settings";

@Injectable({
  providedIn: "root"
})
export class ImageService {
  public getUrl(category: string, fileName: string): string {
    if (settings.production) {
      return `${settings.productionUrl}/assets/${category}/${fileName}`;
    } else {
      return `${settings.testUrl}/assets/${category}/${fileName}`;
    }
  }
}
