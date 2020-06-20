import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DersdetayComponent } from './dersdetay.component';

describe('DersdetayComponent', () => {
  let component: DersdetayComponent;
  let fixture: ComponentFixture<DersdetayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DersdetayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DersdetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
