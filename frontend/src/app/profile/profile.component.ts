import {AfterViewInit, Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";

import {CategoriesService} from "../services/categories/categories.service";
import { ImageService } from "../services/image.service";
import {IoService} from "../services/io/io.service";
import {UserService} from "../services/user/user.service";

import {ChangeEmailParams} from "./profile.models";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements AfterViewInit, OnDestroy, OnInit {
  public readonly changeEmailForm = this._fb.group({
    newEmail: [this.user.user.email],
    password: [""]
  });

  public readonly changePasswordForm = this._fb.group({
    newPassword: [""],
    repeatNewPassword: [""],
    password: [""]
  });

  public readonly avatarForm = this._fb.group({
    avatar: [""]
  });

  constructor (
    private readonly _fb: FormBuilder,
    public readonly categoriesService: CategoriesService,
    private readonly _ioService: IoService,
    public readonly user: UserService,
    public readonly imageService: ImageService
  ) {}

  public ngAfterViewInit (): void {
    this._ioService.uploader.listenOnInput(document.getElementById("avatarInput"));

    this._ioService.uploader.addEventListener("start", (event) => {
      event.file.meta.username = this.user.user.username;
    });
  }

  public ngOnDestroy (): void {
    this._ioService.off("changeEmail");
  }

  public ngOnInit (): void {
    this._ioService.on("changeEmail", (params: ChangeEmailParams) => {
      this.user.user.email = params.newEmail;
    });
  }

  public onChangeEmail (): void {
    const {email} = this.user.user;
    const {newEmail, password} = this.changeEmailForm.value;

    this._ioService.emit("changeEmail", {email, newEmail, password});
  }

  public onChangePassword (): void {
    const {email} = this.user.user;
    const {newPassword, repeatNewPassword, password} = this.changePasswordForm.value;

    this._ioService.emit("changePassword", {email, newPassword, repeatNewPassword, password});
  }

  public onSubmitAvatarForm (): void {

  }

  public onLogout (): void {
    this.user.isLoggedIn = false;
    this.user.user = {
      _id: "",
      token: "",
      firstName: "",
      lastName: "",
      city: "",
      country:"",
      email: "",
      username: "",
      referals: [],
      reviews: []
    };
  }
}