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
    productUrl: [""],
    stars: [5],
    title: [""],
    content: [""],
  });

  public readonly registerForm = this._formBuilder.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    username: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    repeatPassword: ["", [Validators.required, Validators.minLength(6)]],
  });

  public onReviewSubmit (): void {
    const {category, subcategory, product} = this._routerService.urls;
    const {username} = this.userService.user;
    const {productUrl, stars, title, content} = this.writeReviewForm.value;

    this._io.emit("writeReview", {
      urls: {
        category: "bath_tubs",
        subcategory: "bath_tubs_and_accessories",
        product: productUrl
      },
      username,
      stars,
      title,
      content
    });
  }

  public onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}): void {
    this.writeReviewForm.controls.stars.setValue($event.newValue);
  }

  public loginAndWriteReview (): void {
    const {productUrl, stars, title, content} = this.writeReviewForm.value;

    this._io.emit("loginAndWriteReview", {
      review: {
        urls: {
          category: "bath_tubs",
          subcategory: "bath_tubs_and_accessories",
          product: productUrl
        },
        username: this.registerForm.value.username,
        stars,
        title,
        content
      },
      user: this.registerForm.value
    });
  }

  ngOnInit (): void {
    this._io.on("loginAndWriteReview", (params) => {
      this.userService.isLoggedIn = true;
      this.userService.user = params.user;
    });
  }
}
