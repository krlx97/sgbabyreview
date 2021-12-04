import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  public isShrunk = false;

  public ngOnInit (): void {
    window.onscroll = () => {
      if (window.pageYOffset > 0) {
        this.isShrunk = true;
      } else {
        this.isShrunk = false;
      }
    }
  }
}
