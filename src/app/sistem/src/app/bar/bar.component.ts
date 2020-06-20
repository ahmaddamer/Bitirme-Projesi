import { Component, OnInit, NgZone } from '@angular/core';
import * as $ from 'jquery';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentsecService } from '../anasistem/student/ogrencisayfasi/studentsec.service';
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  constructor(private db:AngularFireDatabase , private router:Router , 
    private route:ActivatedRoute , private st:StudentsecService , public zone: NgZone) {
console.log('from service'+ this.st.get_id()+'   '+this.st.get_pws());
// let id = this.route.snapshot.paramMap.get('id');
// console.log(id+' '+this.route.snapshot.paramMap.get('name'));
   }

/**
 * geri
 */
public geri() {
  this.zone.run(() => {
  return   this.router.navigate(['../'],{relativeTo:this.route});
  });
}

  ngOnInit() {

  this.db.database.ref('secim').on('value', element=>{
    if(element.val()===true)
    {
      $('#DS').css('visibility', 'visible');
      $('#DS').text('Ders Secimleri');
    }
    else
    {
      $('#DS').css('visibility', 'hidden');
      $('#DS').text('');
    }
  });
  }
 public nav()
 {
  this.zone.run(() => { return this.router.navigate(["DersSecim"],{relativeTo:this.route});});
  
  
 }

}
