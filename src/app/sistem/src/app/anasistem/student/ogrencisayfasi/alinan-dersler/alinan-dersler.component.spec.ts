import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlinanDerslerComponent } from './alinan-dersler.component';

describe('AlinanDerslerComponent', () => {
  let component: AlinanDerslerComponent;
  let fixture: ComponentFixture<AlinanDerslerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlinanDerslerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlinanDerslerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
