import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SicilComponent } from './sicil.component';

describe('SicilComponent', () => {
  let component: SicilComponent;
  let fixture: ComponentFixture<SicilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SicilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SicilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
