import {Component} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {IoService} from "../io.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  public readonly contactUsForm = this._fb.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    subject: ["", [Validators.required]],
    message: ["", [Validators.required]]
  });

  constructor (
    private readonly _fb: FormBuilder,
    private readonly _ioService: IoService
  ) {}

  onSubmit (): void {
    this._ioService.emit("sendEmail", this.contactUsForm.value);
  }
}