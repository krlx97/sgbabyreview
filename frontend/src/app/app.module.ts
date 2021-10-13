import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {AppComponent} from "./app.component";
import {LoginFormComponent} from './login-form/login-form.component';
import {RegisterFormComponent} from "./register-form/register-form.component";
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    RouterModule
  ],
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ContactUsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}