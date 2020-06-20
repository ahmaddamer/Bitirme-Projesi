import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-idarikismi',
  templateUrl: './idari.html',
  styleUrls: ['./style.css']
})
export class IdarikismiComponent implements OnInit {
  static id:any;
name : FormControl;
password:FormControl;


options: string[] = [];
      filteredOptions: Observable<string[]>;
      private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
      
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
      }
      cookies:any;


  constructor(private db:AngularFireDatabase , 
    private router:Router , private route:ActivatedRoute,
    private zone:NgZone,private cookiess:CookieService) {
    this.name = new FormControl('');
    this.password = new FormControl('');
    this.filteredOptions = this.name.valueChanges
.pipe(
  startWith(''),
  map(value => this._filter(value))
);
   }

  ngOnInit() {
    IdarikismiComponent.id = undefined;


    this.cookies = this.cookiess.getAll();
    for(let key in this.cookies)
    {
      
      if(key[0]==='o')
      {
        this.options.push(key.substring(1,key.length).toString());
      }

  }
  }
  public fcall(op:string)
  {
  
  
  this.password.setValue(this.cookies['o'+op]);
  }
submitb()
{
 
this.db.database.ref(`idarikismi/${this.name.value}`).once('value',sp=>{

 if(sp.exists()){
if(this.password.value === sp.val().password){
  if(this.cookiess.check(this.name.value)===false)
  {
    this.cookiess.set('o'+this.name.value,this.password.value,100000,'/');
  }
  this.zone.run(()=>{
    IdarikismiComponent.id = this.name.value;
    this.router.navigate(['idari_menu'],{relativeTo:this.route});
  })
 
}
 }
}).then(()=>{
 
}).catch(e=>{
console.log('Bulumadi');
});
}







}
