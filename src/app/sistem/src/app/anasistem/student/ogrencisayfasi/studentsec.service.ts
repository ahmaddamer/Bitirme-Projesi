import { Injectable, OnInit, NgZone } from '@angular/core';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, empty } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
let C = require( 'js-cookie');

@Injectable({
  providedIn: 'root'
})
export class StudentsecService implements CanActivate  {
  private Ref:any;
  private id:string;
  private psw:string;
  private Ogretim_Turu:string;
  private b:boolean;
  private Donem:string;
  sonuc:Observable<any>;
 
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, 
  state: import("@angular/router").RouterStateSnapshot): boolean |
   import("@angular/router").UrlTree | import("rxjs").Observable<boolean | 
   import("@angular/router").UrlTree> | Promise<boolean | 
   import("@angular/router").UrlTree>{
   
return new Observable((observer)=>{
  
    
  this.db.database.ref('Ogrenciler/'+this.get_id()).once('value',snap=>{
   
    if(this.get_id()===undefined)
    {
     this.zone.run(()=>{
      this.router.navigate(['anasistem/student'], { replaceUrl: false});
     })

     
    }
    if(this.get_id()!==undefined&&snap.exists()){
      console.log(this.get_id());
        if(this.get_pws()===snap.val().pass)
        {
          if(this.cookieService.check(this.get_id())===false)
           this.cookieService.set('s'+this.get_id(),this.get_pws(),100000,'/');
          // C.set(this.get_id(),this.get_pws(),{path:'/anasistem/student'});
          observer.next(true);
        }
        else{
         
          observer.next(false);
        }
        
      }
      // else{
      //   this.router.navigate(['anasistem/student']);
      // //  observer.next(false);
      // }
    })
  });
  
     
    
}

  constructor(private db:AngularFireDatabase,
    private route:ActivatedRoute,private router:Router , 
    private zone:NgZone , private cookieService:CookieService) {
   }

/**
 * control
 */
 y:string;
obs:Observable<string>;

public control() {
  //console.log(this.get_id()+' '+this.get_pws())
  this.db.database.ref('Ogrenciler').once('value',snap=>{
   snap.forEach(a=>{
     console.log(a.key);
     console.log(a.val().pass);
   })
  })
}
  public set_id(id:string)
  {
    this.id=id;
  }
  public get_id():any{
    return this.id;
  }
  public set_pws(pw: string)
  {
    this.psw=pw;
  }
  public get_pws()
  {
    return this.psw;
  }
  public set_Ogretim_Turu(O:string)
  {
    this.Ogretim_Turu = O;
  }
  public get_Ogretim_Turu()
  {
    return this.Ogretim_Turu;
  }
  public set_Donem(a:string)
  {
    this.Donem = a;

  }
  public get_Donem():string{
    return this.Donem;
  }
  public get_date():string{
  var d = new Date();
  var n = d.getFullYear();
   return (n-1)+'-'+n;
  }
  
}