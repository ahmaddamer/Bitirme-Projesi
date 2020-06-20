import { Component, OnInit, Input } from '@angular/core';
import { StudentsecService } from 'src/app/anasistem/student/ogrencisayfasi/studentsec.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { clearInterval } from 'timers';

@Component({
  selector: 'app-ogretim',
  templateUrl: './ogretim.component.html',
  styleUrls: ['./ogretim.component.scss']
})
export class OgretimComponent implements OnInit {
 static x:number;
  constructor(private st:StudentsecService,
     private router:Router, private route:ActivatedRoute , private db:AngularFireDatabase) { 


  }

  ngOnInit() {
    let d='';
    this.db.database.ref('Donem').once('value',sp=>{
    this.st.set_Donem(sp.val());
    })
  }

  fn(OT:string)
  {

   this.st.set_Ogretim_Turu(OT);

   var t=setInterval(()=>{
    if(this.st.get_Donem()!==undefined){
      // clearInterval(t);
      return this.router.navigate(['acilacakdersler'],{relativeTo:this.route});
    }
   },10)
  }

}
