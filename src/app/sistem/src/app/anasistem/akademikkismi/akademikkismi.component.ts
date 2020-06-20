import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TeachersecService } from 'src/app/teachersec.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-akademikkismi',
  templateUrl: './akademic.html',
  styleUrls: ['./style.css']
})
export class AkademikkismiComponent implements OnInit {
  public id:any;
  public pass:any;
  myControl = new FormControl();
options: string[] = [];
filteredOptions: Observable<string[]>;
private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.options.filter(option => option.toLowerCase().includes(filterValue));
}
  constructor(private Tc:TeachersecService ,
     private route:ActivatedRoute , private router:Router , 
     private db:AngularFireDatabase , private cookiess:CookieService) { 
     
      
     }
cookies:any;
  ngOnInit() {
    this.cookies = this.cookiess.getAll();
    for(let key in this.cookies)
    {
      
      if(key[0]==='t')
      {
        this.options.push(key.substring(1,key.length).toString());
      }
    }
    
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

   
  }
  ctrl()
  {
    
   this.Tc.set_id(this.id);
   this.Tc.set_pass(this.pass);
   return this.router.navigate(['giris'],{relativeTo:this.route});
  }

  pswfc = new FormControl('');
  public fcall(op:string)
{


this.pswfc.setValue(this.cookies['t'+op.toString()]);
}

}
