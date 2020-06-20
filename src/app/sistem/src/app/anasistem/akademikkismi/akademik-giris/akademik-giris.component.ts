import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachersecService } from 'src/app/teachersec.service';

@Component({
  selector: 'app-akademik-giris',
  templateUrl: './akademik-giris.component.html',
  styleUrls: ['./akademik-giris.component.scss']
})

export class AkademikGirisComponent implements OnInit {
 public Ogretim:any;
  ngOnInit(): void {
  
  }
  
constructor(private db:AngularFireDatabase, 
  private Tc:TeachersecService, private route:ActivatedRoute , 
  private router:Router ,private zone:NgZone ){

}
  
public async get_Ogretim(s:any)
{
  this.Ogretim=s;
this.Tc.set_ogretim(this.Ogretim);

await this.db.database.ref('Donem').once('value',sp=>{
  this.Tc.set_donem(sp.val());
})
this.zone.run(()=>{
  
  this.router.navigate(['dersler'],{relativeTo:this.route});

})
}
  
}
