import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogbookBaseComponent } from './logbook-base.component';

describe('LogbookBaseComponent', () => {
  let component: LogbookBaseComponent;
  let fixture: ComponentFixture<LogbookBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogbookBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
