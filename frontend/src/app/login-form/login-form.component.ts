import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IoService} from "../services/io/io.service";
import {UserService} from "../services/user/user.service";
import { LoginParams } from "./login.models";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit, OnDestroy {
  constructor (
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
    private readonly _ioService: IoService,
    private readonly _userService: UserService
  ) {}

  public readonly form = this._fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });

  public get email(): FormControl {
    return this.form.get("email") as FormControl;
  }
  public get password(): FormControl {
    return this.form.get("password") as FormControl;
  }

  public isEmptyFormField (field: FormControl): boolean {
    return !field.value && field.touched;
  }
  public isLength (field: FormControl, length: number): boolean {
    return field.value && field.value < length && field.touched;
  }

  public get isEmailInvalid(): boolean {
    return !this.email.valid && this.email.value && this.email.touched;
  }
  public get isEmailEmpty(): boolean {
    return !this.email.value && this.email.touched;
  }

  public onSubmit (): void {
    this._ioService.emit("login", this.form.value);
  }

  onSubmitAvatarForm (): void {

  }

  public ngOnInit (): void {
    const {_router, _ioService, _userService} = this;

    _ioService.on("login", (params: LoginParams) => {
      _userService.isLoggedIn = true;
      _userService.user = params.user;
      _router.navigate(["/home"]);
    });
  }

  public ngOnDestroy (): void {
    this._ioService.off("login");
  }
}
