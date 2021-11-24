import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ReviewPostingPolicyComponent} from "./review-posting-policy.component";

describe("ReviewPostingPolicyComponent", () => {
  let component: ReviewPostingPolicyComponent;
  let fixture: ComponentFixture<ReviewPostingPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewPostingPolicyComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPostingPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
