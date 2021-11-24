import {Component} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
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
    password: ["", [Validators.required]],
    repeatPassword: ["", [Validators.required]],
  });

  constructor (
    private readonly _fb: FormBuilder,
    private readonly _ioService: IoService,
    private readonly _routerService: RouterService
  ) {}

  public onSubmit (): void {
    const {_ioService, _routerService, registerForm} = this;
    const {referer} = _routerService.urls;

    _ioService.emit("register", {...registerForm.value, referer});
  }
}
