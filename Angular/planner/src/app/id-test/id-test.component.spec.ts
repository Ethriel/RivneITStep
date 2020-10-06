import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdTestComponent } from './id-test.component';

describe('IdTestComponent', () => {
  let component: IdTestComponent;
  let fixture: ComponentFixture<IdTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
