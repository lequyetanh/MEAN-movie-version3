import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCountryComponent } from './admin-country.component';

describe('AdminCountryComponent', () => {
  let component: AdminCountryComponent;
  let fixture: ComponentFixture<AdminCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
