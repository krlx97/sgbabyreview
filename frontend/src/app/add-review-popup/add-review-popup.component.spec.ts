import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewPopupComponent } from './add-review-popup.component';

describe('AddReviewPopupComponent', () => {
  let component: AddReviewPopupComponent;
  let fixture: ComponentFixture<AddReviewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReviewPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
