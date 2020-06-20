import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IslerserviceService implements CanActivate
 {
private id:any;
private Ogretim:any;

  constructor(private router:Router , 
    private route:ActivatedRoute , private zone:NgZone) { }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot):
   boolean | import("@angular/router").UrlTree 
   | import("rxjs").Observable<boolean | 
   import("@angular/router").UrlTree> |
    Promise<boolean | import("@angular/router").UrlTree> {
 
      return new Observable<boolean>(obs=>{
        if(this.get_id()===undefined)
        {
          
          obs.next(false);
          this.zone.run(()=>{
            this.router.navigate(['anasistem/isler/ogrenciIsleriMenue/ogrencinumarasi']);
          })
         
        }
        else
        {
          obs.next(true);
        }
      })
  }

  public set_id(id:any)
  {
    this.id=id;

  }
  public set_Ogretim(ogretim:any)
  {
    this.Ogretim=ogretim;
  }
  public get_id()
  {
    return this.id;
  }
  public get_ogretim()
  {
    return this.Ogretim;
  }
}
