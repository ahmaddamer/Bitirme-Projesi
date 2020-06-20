import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuIdariComponent } from './menu-idari.component';

describe('MenuIdariComponent', () => {
  let component: MenuIdariComponent;
  let fixture: ComponentFixture<MenuIdariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuIdariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuIdariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
