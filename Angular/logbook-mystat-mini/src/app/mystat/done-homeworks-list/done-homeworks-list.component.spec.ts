import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneHomeworksListComponent } from './done-homeworks-list.component';

describe('DoneHomeworksListComponent', () => {
  let component: DoneHomeworksListComponent;
  let fixture: ComponentFixture<DoneHomeworksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoneHomeworksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneHomeworksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
