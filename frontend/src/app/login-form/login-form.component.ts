import {Component} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {IoService} from "../io.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent {
  public readonly loginForm = this._fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  });

  constructor (
    private readonly _fb: FormBuilder,
    private readonly _ioService: IoService
  ) {}

  onSubmit (): void {
    this._ioService.emit("login", this.loginForm.value);
  }
}