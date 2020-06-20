import { Injectable } from '@angular/core';
import { GuardsCheckEnd, CanActivate, Router, ActivatedRoute } from '@angular/router';
import { StudentsecService } from '../studentsec.service';

@Injectable({
  providedIn: 'root'
})
export class AlinanderslerServiceService implements CanActivate{

  constructor(private st:StudentsecService , private router:Router,private route:ActivatedRoute) { }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if(this.st.get_id()===undefined){
    this.router.navigate(['anasistem/student']);
      return false;
    }
    else
    return true;
  }
}
