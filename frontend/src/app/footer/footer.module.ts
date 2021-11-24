import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {MaterialModule} from "../material/material.module";

import {FooterComponent} from "./footer.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {ReviewPostingPolicyComponent} from "./review-posting-policy/review-posting-policy.component";
import {TermsOfUseComponent} from "./terms-of-use/terms-of-use.component";

@NgModule({
  declarations: [
    FooterComponent,
    PrivacyPolicyComponent,
    ReviewPostingPolicyComponent,
    TermsOfUseComponent
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [FooterComponent]
})
export class FooterModule {}
