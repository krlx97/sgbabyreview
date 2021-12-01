import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';
import { ImageService } from '../services/image.service';
import { IoService } from '../services/io/io.service';
import { RouterService } from '../services/router/router.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-add-review-popup',
  templateUrl: './add-review-popup.component.html',
  styleUrls: ['./add-review-popup.component.css']
})
export class AddReviewPopupComponent implements OnInit {
  constructor (
    private readonly _formBuilder: FormBuilder,
    public readonly imageService: ImageService,
    public readonly userService: UserService,
    private readonly _io: IoService,
    private readonly _routerService: RouterService
  ) {}

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;

  public readonly writeReviewForm = this._formBuilder.group({
    stars: [5],
    title: [""],
    content: [""],
  });

  public readonly form = this._formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });

  public onReviewSubmit (): void {
    const {category, subcategory, product} = this._routerService.urls;
    const {username} = this.userService.user;
    const {stars, title, content} = this.writeReviewForm.value;

    this._io.emit("writeReview", {
      urls: {
        category: "bath_tubs",
        subcategory: "bath_tubs_and_accessories",
        product: "skip_hop_moby_smart_sling_3_stage_tub"
      },
      username,
      stars,
      title,
      content
    });
  }

  public onSubmit (): void {
    this._io.emit("login", this.form.value);
  }

  public onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}): void {
    alert($event.newValue);
    this.writeReviewForm.controls.stars.setValue($event.newValue);
  }

  public loginAndWriteReview (): void {
    const {stars, title, content} = this.writeReviewForm.value;
    const {email, password} = this.form.value;

    this._io.emit("loginAndWriteReview", {
      review: {
        urls: {
          category: "bath_tubs",
          subcategory: "bath_tubs_and_accessories",
          product: "skip_hop_moby_smart_sling_3_stage_tub"
        },
        username: "",
        stars,
        title,
        content
      },
      user: {email, password}
    })
  }

  ngOnInit (): void {
    this._io.on("loginAndWriteReview", (params) => {
      this.userService.isLoggedIn = true;
      this.userService.user = params.user;
    });
  }
}
