import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentsecService } from './ogrencisayfasi/studentsec.service';
import { Observable, Subscription, ObservableLike } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import {CookieService} from 'ngx-cookie-service';
import {FormControl} from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
let C = require( 'js-cookie');
class A{
  public name:any;
  public id:any;
  constructor(name:any,id:any)
  {
    this.name=name;
    this.id=id;
  }
}
@Component({
  selector: 'app-student',
  templateUrl: './student.html' ,
  styleUrls: ['./style.css']
})
export class StudentComponent implements OnInit  {
 
  pswfc = new FormControl(''); // control in the password failed value
  cookies:any=[];
  ngOnInit(): void {
  
this.router.urlUpdateStrategy;


   
    this.cookies = this.cookieservice.getAll();
    
    
  
   for(let key in this.cookies)
   {console.log(key[0]);
     if(key[0]==='s'){
       
      this.options.push(key.substring(1,key.length).toString());
     }
   }
  
   this.filteredOptions = this.myControl.valueChanges
   .pipe(
     startWith(''),
     map(value => this._filter(value))
   ); 
    
  }
private secim:any;
private obs:Observable<string>  
private L:Observable<A[]>;
private t:A[]=[];
private r:any;
ap:AppComponent;
myControl = new FormControl();
options: string[] = [];
filteredOptions: Observable<string[]>;
private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.options.filter(option => option.toLowerCase().includes(filterValue));
}
constructor(private db:AngularFireDatabase , private router:Router, 
    private route:ActivatedRoute ,
     private st:StudentsecService , private cookieservice:CookieService
     ,private http:HttpClient) { 
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    
   this.st.set_id(undefined);
    this.r='';
      this.L= new Observable<A[]>((obs)=>{
        this.db.database.ref('AlinmisDersler/2019-2020/IOgretim/algo22').once('value',snap=>{
         
        snap.forEach(a=>{
        console.log('read');
        console.log(a.val());
        this.t.push(new A(a.val(),a.key));
           
           
          })
          obs.next(this.t);
        })
       });
     
  
    $('#deneme').css('visibility','hidden');
  
}
 
public func()
{

  
 
let pswd=$('#pwd').val().toString().trim();
let id = $('#uid').val().toString().trim();
this.st.set_id(id);
this.st.set_pws(pswd);
this.router.navigate(['ogrencisayfasi'],{relativeTo:this.route});
}

public fcall(op:string)
{


this.pswfc.setValue(this.cookies['s'+op.toString()]);
}
}
