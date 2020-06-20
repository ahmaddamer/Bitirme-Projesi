import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeniogrencikayitComponent } from './yeniogrencikayit.component';

describe('YeniogrencikayitComponent', () => {
  let component: YeniogrencikayitComponent;
  let fixture: ComponentFixture<YeniogrencikayitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeniogrencikayitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeniogrencikayitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
