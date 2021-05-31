import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIconComponent } from './list-icon.component';

describe('ListIconComponent', () => {
  let component: ListIconComponent;
  let fixture: ComponentFixture<ListIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
