import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHomeworksListComponent } from './new-homeworks-list.component';

describe('NewHomeworksListComponent', () => {
  let component: NewHomeworksListComponent;
  let fixture: ComponentFixture<NewHomeworksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHomeworksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHomeworksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
