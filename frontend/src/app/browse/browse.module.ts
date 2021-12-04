import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {RatingModule} from 'ng-starrating';

import {BrowseComponent} from "./browse.component";
import {CategoriesComponent} from "./categories/categories.component";
import {HowItWorksComponent} from "./how-it-works/how-it-works.component";
import {LatestBlogsComponent} from "./latest-blogs/latest-blogs.component";
import {LatestReviewsComponent} from "./latest-reviews/latest-reviews.component";
import {VideoReviewsComponent} from "./video-reviews/video-reviews.component";
import { MaterialModule } from "../material/material.module";

@NgModule({
  declarations: [
    BrowseComponent,
    CategoriesComponent,
    HowItWorksComponent,
    LatestBlogsComponent,
    LatestReviewsComponent,
    VideoReviewsComponent
  ],
  imports: [CommonModule, RouterModule, MaterialModule, RatingModule],
  exports: [BrowseComponent]
})
export class BrowseModule {}
