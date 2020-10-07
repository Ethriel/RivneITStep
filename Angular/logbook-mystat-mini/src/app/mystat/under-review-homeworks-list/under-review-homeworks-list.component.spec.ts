import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderReviewHomeworksListComponent } from './under-review-homeworks-list.component';

describe('UnderReviewHomeworksListComponent', () => {
  let component: UnderReviewHomeworksListComponent;
  let fixture: ComponentFixture<UnderReviewHomeworksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderReviewHomeworksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderReviewHomeworksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
