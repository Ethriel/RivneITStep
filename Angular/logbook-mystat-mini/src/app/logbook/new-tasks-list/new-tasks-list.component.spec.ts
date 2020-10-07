import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTasksListComponent } from './new-tasks-list.component';

describe('NewTasksListComponent', () => {
  let component: NewTasksListComponent;
  let fixture: ComponentFixture<NewTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTasksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
