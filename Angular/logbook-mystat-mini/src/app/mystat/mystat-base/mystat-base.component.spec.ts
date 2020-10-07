import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MystatBaseComponent } from './mystat-base.component';

describe('MystatBaseComponent', () => {
  let component: MystatBaseComponent;
  let fixture: ComponentFixture<MystatBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MystatBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MystatBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
