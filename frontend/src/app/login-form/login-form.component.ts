import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IoService} from "../io.service";
import {UserService} from "../user.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit, OnDestroy {
  readonly loginForm = this._fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  });

  constructor (
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
    private readonly _ioService: IoService,
    private readonly _userService: UserService
  ) {}

  onSubmit (): void {
    this._ioService.emit("login", this.loginForm.value);
  }

  onSubmitAvatarForm (): void {

  }

  ngOnInit (): void {
    this._ioService.on("login", (params) => {
      this._userService.isLoggedIn = true;
      this._userService.user = params;
      this._router.navigate(["/home"]);
    });
  }

  ngOnDestroy (): void {
    this._ioService.off("login");
  }
}