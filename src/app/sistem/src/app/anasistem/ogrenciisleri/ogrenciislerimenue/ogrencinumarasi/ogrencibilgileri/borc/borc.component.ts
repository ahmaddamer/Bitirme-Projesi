import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-borc',
  templateUrl: './borc.component.html',
  styleUrls: ['./borc.css']
})
export class BorcComponent implements OnInit {

  constructor(private router: Router , private activerouter: ActivatedRoute) {
    this.f('Borcunuz=' + 50 + ' Tl');
    this.f2();
  }

  ngOnInit() {
  }
  public f(s: any) {alert(s);
  }
public f2() {
  this.router.navigate(['../'], { relativeTo: this.activerouter });
}

}
