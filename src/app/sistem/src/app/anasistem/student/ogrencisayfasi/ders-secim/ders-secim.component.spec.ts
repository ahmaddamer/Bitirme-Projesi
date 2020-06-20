import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DersSecimComponent } from './ders-secim.component';

describe('DersSecimComponent', () => {
  let component: DersSecimComponent;
  let fixture: ComponentFixture<DersSecimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DersSecimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DersSecimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
