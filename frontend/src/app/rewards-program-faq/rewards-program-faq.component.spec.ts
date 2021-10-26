import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RewardsProgramFaqComponent} from "./rewards-program-faq.component";

describe("RewardsProgramFaqComponent", () => {
  let component: RewardsProgramFaqComponent;
  let fixture: ComponentFixture<RewardsProgramFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RewardsProgramFaqComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsProgramFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});