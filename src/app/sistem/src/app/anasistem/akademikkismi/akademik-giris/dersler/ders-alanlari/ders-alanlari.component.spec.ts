import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DersAlanlariComponent } from './ders-alanlari.component';

describe('DersAlanlariComponent', () => {
  let component: DersAlanlariComponent;
  let fixture: ComponentFixture<DersAlanlariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DersAlanlariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DersAlanlariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
