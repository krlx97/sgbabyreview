import {NgModule} from "@angular/core";

import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";

import {BrowseModule} from "./browse/browse.module";
import {FooterModule} from "./footer/footer.module";
import {MaterialModule} from "./material/material.module";

import {AppComponent} from "./app.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {HomeComponent} from "./home/home.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {BlogComponent} from "./blog/blog.component";
import {WildcardComponent} from "./wildcard/wildcard.component";
import {SubcategoriesComponent} from "./subcategories/subcategories.component";
import {ProductComponent} from "./product/product.component";
import {ReviewGuidelinesComponent} from "./review-guidelines/review-guidelines.component";
import {RewardsProgramFaqComponent} from "./rewards-program-faq/rewards-program-faq.component";
import {ProfileComponent} from "./profile/profile.component";
import {ReviewComponent} from "./review/review.component";
import {HeaderComponent} from "./header/header.component";
import {ProductsComponent} from "./products/products.component";
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    BrowseModule,
    FooterModule,
    MaterialModule
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
    ReviewGuidelinesComponent,
    RewardsProgramFaqComponent,
    ProfileComponent,
    ReviewComponent,
    HeaderComponent,
    ProductsComponent,
    MenuComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
