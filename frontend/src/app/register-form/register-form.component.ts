import {Component} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {IoService} from "../services/io/io.service";
import {RouterService} from "../services/router/router.service";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.css"],
  providers: [RouterService]
})
export class RegisterFormComponent {
  public readonly registerForm = this._fb.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    username: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    repeatPassword: ["", [Validators.required, Validators.minLength(6)]],
  });

  public show = false;

  constructor (
    private readonly _fb: FormBuilder,
    private readonly _ioService: IoService,
    private readonly _routerService: RouterService
  ) {}

  public get firstName(): FormControl { return this.registerForm.get("firstName") as FormControl; }
  public get lastName(): FormControl { return this.registerForm.get("lastName") as FormControl; }
  public get email(): FormControl { return this.registerForm.get("email") as FormControl; }
  public get username(): FormControl { return this.registerForm.get("username") as FormControl; }
  public get password(): FormControl { return this.registerForm.get("password") as FormControl; }
  public get repeatPassword(): FormControl { return this.registerForm.get("repeatPassword") as FormControl; }

  public isLength (field: FormControl, length: number): boolean {
    return field.value && field.value < length && field.touched;
  }

  public onSubmit (): void {
    const {_ioService, _routerService, registerForm} = this;
    const {referer} = _routerService.urls;

    _ioService.emit("register", {...registerForm.value, referer});
  }
}
