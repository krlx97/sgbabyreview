import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {AboutUsComponent} from "./about-us/about-us.component";
import {BlogComponent} from "./blog/blog.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {HomeComponent} from "./home/home.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import {ProductComponent} from "./product/product.component";
import { ProfileComponent } from "./profile/profile.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {ReviewGuidelinesComponent} from "./review-guidelines/review-guidelines.component";
import { ReviewPostingPolicyComponent } from "./review-posting-policy/review-posting-policy.component";
import {RewardsProgramFaqComponent} from "./rewards-program-faq/rewards-program-faq.component";
import {SubcategoriesComponent} from "./subcategories/subcategories.component";
import { TermsOfUseComponent } from "./terms-of-use/terms-of-use.component";
import {WildcardComponent} from "./wildcard/wildcard.component";

const routes: Routes = [{
  path: "",
  redirectTo: "/home",
  pathMatch: "full"
}, {
  path: "home",
  component: HomeComponent
}, {
  path: "contact_us",
  component: ContactUsComponent
}, {
  path: "about_us",
  component: AboutUsComponent
}, {
  path: "blog",
  component: BlogComponent
}, {
  path: "review_guidelines",
  component: ReviewGuidelinesComponent
}, {
  path: "rewards_program_faq",
  component: RewardsProgramFaqComponent
}, {
  path: "login",
  component: LoginFormComponent
}, {
  path: "register",
  component: RegisterFormComponent
}, {
  path: "profile",
  component: ProfileComponent
}, {
  path: "products/:category",
  children: [{
    path: ":subcategory",
    children: [{
      path: ":product",
      component: ProductComponent
    }, {
      path: "",
      component: SubcategoriesComponent,
      pathMatch: "full"
    }]
  }, {
    path: "",
    component: CategoriesComponent,
    pathMatch: "full"
  }]
}, {
  path: "terms_of_use",
  component: TermsOfUseComponent
}, {
  path: "privacy_policy",
  component: PrivacyPolicyComponent
}, {
  path: "review_posting_polocy",
  component: ReviewPostingPolicyComponent
}, {
  path: "**",
  component: WildcardComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}