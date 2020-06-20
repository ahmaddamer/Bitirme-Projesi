import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcilacakDerslerComponent } from './acilacak-dersler.component';

describe('AcilacakDerslerComponent', () => {
  let component: AcilacakDerslerComponent;
  let fixture: ComponentFixture<AcilacakDerslerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcilacakDerslerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcilacakDerslerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
