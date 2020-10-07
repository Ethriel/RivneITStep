import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderReviewTasksListComponent } from './under-review-tasks-list.component';

describe('UnderReviewTasksListComponent', () => {
  let component: UnderReviewTasksListComponent;
  let fixture: ComponentFixture<UnderReviewTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderReviewTasksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderReviewTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
