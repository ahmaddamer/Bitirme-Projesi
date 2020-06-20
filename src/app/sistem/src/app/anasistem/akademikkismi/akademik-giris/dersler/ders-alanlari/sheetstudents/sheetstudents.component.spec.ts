import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetstudentsComponent } from './sheetstudents.component';

describe('SheetstudentsComponent', () => {
  let component: SheetstudentsComponent;
  let fixture: ComponentFixture<SheetstudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetstudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
