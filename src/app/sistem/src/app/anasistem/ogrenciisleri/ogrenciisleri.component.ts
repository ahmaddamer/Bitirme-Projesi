import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-ogrenciisleri',
  templateUrl: './isler.html',
  styleUrls: ['./style.css']
})
export class OgrenciisleriComponent implements OnInit {
name:FormControl;
password:FormControl;
static id:string;
  constructor(private db:AngularFireDatabase ,
     private router:Router , private route:ActivatedRoute ,
      private zone:NgZone,private cookiess:CookieService) {
this.name = new FormControl('');
this.password = new FormControl('');
this.filteredOptions = this.name.valueChanges
.pipe(
  startWith(''),
  map(value => this._filter(value))
);

      }
     
      options: string[] = [];
      filteredOptions: Observable<string[]>;
      private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
      
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
      }
      cookies:any;
  ngOnInit() {
    OgrenciisleriComponent.id = undefined;
    this.cookies = this.cookiess.getAll();
    for(let key in this.cookies)
    {
      
      if(key[0]==='i')
      {
        this.options.push(key.substring(1,key.length).toString());
      }

  }

  }
  public controlletme(){
    this.db.database.ref(`ogrenciisleri/${this.name.value}`).once('value',sp=>{
      if(sp.exists())
      {
        if(sp.val().password === this.password.value)
        {
          this.zone.run(()=>{
if(this.cookiess.check(this.name.value)===false)
{
  this.cookiess.set('i'+this.name.value,this.password.value,100000,'/');
}
OgrenciisleriComponent.id = this.password.value;
            this.router.navigate(['ogrenciIsleriMenue'],{relativeTo: this.route} );
          });
         
        }
      }
    });
    console.log(this.name.value+' '+this.password.value);
  }


  public fcall(op:string)
  {
  
  
  this.password.setValue(this.cookies['i'+op]);
  }


}
