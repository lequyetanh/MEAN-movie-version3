import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamemovieComponent } from './samemovie.component';

describe('SamemovieComponent', () => {
  let component: SamemovieComponent;
  let fixture: ComponentFixture<SamemovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamemovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamemovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
