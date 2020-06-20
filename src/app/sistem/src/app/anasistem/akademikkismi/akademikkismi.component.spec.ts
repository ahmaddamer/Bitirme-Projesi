import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkademikkismiComponent } from './akademikkismi.component';

describe('AkademikkismiComponent', () => {
  let component: AkademikkismiComponent;
  let fixture: ComponentFixture<AkademikkismiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkademikkismiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkademikkismiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
