import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActionFixedComponent } from './list-action-fixed.component';

describe('ListActionFixedComponent', () => {
  let component: ListActionFixedComponent;
  let fixture: ComponentFixture<ListActionFixedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListActionFixedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActionFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
