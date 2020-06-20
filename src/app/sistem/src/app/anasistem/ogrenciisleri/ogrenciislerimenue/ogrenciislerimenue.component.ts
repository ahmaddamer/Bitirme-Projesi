import { Component, OnInit, NgZone } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import { OgrenciisleriComponent } from '../ogrenciisleri.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ogrenciislerimenue',
  templateUrl: './ogrenciislerimenue.component.html',
  styleUrls: ['./sidenavbar.css']
})
export class OgrenciislerimenueComponent implements OnDestroy {
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h =>
      h.test(window.location.host));
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      ``);

  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher ,private router:Router , private route:ActivatedRoute , private zone:NgZone) {
    if(OgrenciisleriComponent.id===undefined)
    {
      this.router.navigate(['../'],{relativeTo:this.route});
    }
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
