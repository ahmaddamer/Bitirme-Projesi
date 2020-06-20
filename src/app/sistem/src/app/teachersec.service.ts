import { Injectable, NgZone, OnInit } from '@angular/core';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { CookieService } from 'ngx-cookie-service';
let C = require( 'js-cookie');


@Injectable({
  providedIn: 'root'
})
export class TeachersecService implements CanActivate,OnInit {
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot,
   state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return new Observable((observer)=>{
      this.db.database.ref('Teachers/'+this.get_id()).once('value',(snap)=>{
        if(this.get_id()===undefined)
        {
          this.zone.run(()=>{
            this.router.navigate(['anasistem/akademikkismi']);
          })

        }


        if(this.get_id()!==undefined&&snap.exists()){
            if(this.get_pass()===snap.val().password)
            {
              if(this.cookies.check(this.get_id())===false)
              this.cookies.set('t'+this.get_id(),this.get_pass(),100000,'/');
              observer.next(true);
            }
            else{

              observer.next(false);
            }

          }


      })
    })
  }
ButDegeri:any=undefined;
  constructor(private db:AngularFireDatabase ,
     private route:ActivatedRoute , private router:Router ,
      private zone:NgZone, private cookies:CookieService) {

  }

 async ngOnInit(){
this.ButDegeri= undefined;
  }


  private id:any;
  private pass:any;
  private Ogretim:any;
  private Ders_adi:any;
  private donem:string;
  myObj = {
   }
// Dersler_Kredi ={
//   "algoritma": {
//     "kredi":4
//   },
//   "YazlabI":{
//     "kredi":5
//   },
//   "YazlabII":{
//     "kredi":5
//   },
//   "ProgramalamaI":{
//     "kredi":3
//   } ,
//   "ProgramalamaII":{
//     "kredi":3
//   } ,
//   "BilLabI":{
//     "kredi":3
//   } ,
//   "BilLabII":{
//     "kredi":3
//   } ,
//   "NoronAglari":{
//     "kredi":5
//   } ,
//   "BulanikMantik":{
//     "kredi":5
//   } ,
//   "Biyonformatic":{
//     "kredi":5
//   } ,
//   "ProlabI":{
//     "kredi":3
//   } ,
//   "ProlabII":{
//     "kredi":4
//   } ,
//   "VeriYapilari":{
//     "kredi":4
//   } ,
//   "VeriTabani":{
//     "kredi":3
//   } ,
// }
  public set_id(id: any)
  {


    this.id=id;
  }
  public set_pass(pass: any)
  {
    this.pass=pass;
  }
  public set_ogretim(o: any)
  {
    this.Ogretim=o;
  }
  public get_id()
  {
    return this.id;
  }
  public get_pass()
  {
    return this.pass;
  }
  public get_ogretim()
  {
    return this.Ogretim;
  }
  public set_Ders_adi(o:any)
  {
    this.Ders_adi=o;
  }
  public get_Ders_adi()
  {
    return this.Ders_adi;
  }

  public set_donem(s:string)
  {
    this.donem = s;
  }
  public get_donem():string
  {
    return this.donem;
  }
  public get_date():string{
    var d = new Date();
    var n = d.getFullYear();
     return (n-1)+'-'+n;
    }




}
