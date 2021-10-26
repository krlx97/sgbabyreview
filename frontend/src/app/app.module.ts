import {NgModule} from "@angular/core";

import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";

import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatSnackBarModule} from "@angular/material/snack-bar";

import {AppComponent} from "./app.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {ContactUsComponent } from "./contact-us/contact-us.component";
import {HomeComponent} from "./home/home.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {BlogComponent} from "./blog/blog.component";
import {WildcardComponent} from "./wildcard/wildcard.component";
import {SubcategoriesComponent} from "./subcategories/subcategories.component";
import {ProductComponent} from "./product/product.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ReviewGuidelinesComponent} from "./review-guidelines/review-guidelines.component";
import {RewardsProgramFaqComponent} from "./rewards-program-faq/rewards-program-faq.component";
import {ProfileComponent} from "./profile/profile.component";
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ReviewPostingPolicyComponent } from './review-posting-policy/review-posting-policy.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    // Material
    MatExpansionModule,
    MatListModule,
    MatSnackBarModule
  ],
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ContactUsComponent,
    HomeComponent,
    AboutUsComponent,
    BlogComponent,
    WildcardComponent,
    SubcategoriesComponent,
    ProductComponent,
    CategoriesComponent,
    ReviewGuidelinesComponent,
    RewardsProgramFaqComponent,
    ProfileComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent,
    ReviewPostingPolicyComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}