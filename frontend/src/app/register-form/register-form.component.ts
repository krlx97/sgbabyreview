import {Component} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {IoService} from "../io.service";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.css"]
})
export class RegisterFormComponent {
  public readonly registerForm = this._fb.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    username: ["", [Validators.required]],
    password: ["", [Validators.required]],
    repeatPassword: ["", [Validators.required]],
  });

  constructor (
    private readonly _fb: FormBuilder,
    private readonly _ioService: IoService
  ) {}

  onSubmit (): void {
    this._ioService.emit("register", this.registerForm.value);
  }
}