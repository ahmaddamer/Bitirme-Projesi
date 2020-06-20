import { Component, OnInit, NgZone } from '@angular/core';
import { TeachersecService } from 'src/app/teachersec.service';
import { AngularFireDatabase } from '@angular/fire/database';
import {setInterval , clearInterval} from 'timers';
import { ActivatedRoute, Router } from '@angular/router';
import {  Observable } from 'rxjs';
@Component({
  selector: 'app-dersler',
  templateUrl: './dersler.component.html',
  styleUrls: ['./dersler.component.scss']
})
export class DerslerComponent implements OnInit {
t_dersleri:string[]=[];
show_mat:any[]=[];
items:Observable<string[]>;
  constructor(private Tc:TeachersecService ,
     private db:AngularFireDatabase , private route:ActivatedRoute 
     , private router:Router , private zone:NgZone) {

    
     
     
       
           
 
 
  }
  ngOnInit() {
  
    this.db.database.ref('Teachers/'+this.Tc.get_id()).once('value',snap=>{
      // console.log(this.Tc.get_ogretim());
      this.items = new Observable<string[]>((obs)=>{this.db.database.ref(`table/${this.Tc.get_date()}/${this.Tc.get_ogretim()}/${this.Tc.get_donem()}`).
      once('value',snap2=>{
        snap2.forEach(a=>{
       if(snap.val().name===a.val().Dr){
       // console.log(a.val().Ders);
        this.t_dersleri.push(a.val().Ders);
        
        }
       
        }) 
        obs.next(this.t_dersleri);
        
      })
    
    })
   
  }) 
  }

public get_Ders(x:any)
{

this.zone.run(()=>{
//console.log('ahmed');
this.Tc.set_Ders_adi(x);
return  this.router.navigate(['DersAlanlari'],{relativeTo:this.route});
})

}
}
