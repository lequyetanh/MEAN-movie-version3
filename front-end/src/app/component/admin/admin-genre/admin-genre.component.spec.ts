import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenreComponent } from './admin-genre.component';

describe('AdminGenreComponent', () => {
  let component: AdminGenreComponent;
  let fixture: ComponentFixture<AdminGenreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGenreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
