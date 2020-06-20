import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as $ from 'jquery';
import { element } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentsecService } from './studentsec.service';
import { resolve } from 'url';
@Component({
  selector: 'app-ogrencisayfasi',
  templateUrl: './ogrencisayfasi.component.html',
  styleUrls: ['./ogrencisayfasi.component.scss']
})
export class OgrencisayfasiComponent implements OnInit {

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
    this.st.set_id('');
    this.st.set_pws('');
    // window.history.go(-1);
   window.history.back();
  // return   this.router.navigate(['../'],{relativeTo:this.route , replaceUrl:true});
  });
}

  ngOnInit() {

    this.db.database.ref(`Ogrenciler/${this.st.get_id()}/Ogretim`).once('value',sp=>{
      console.log(sp.val());
      this.st.set_Ogretim_Turu(sp.val());
    })
    this.db.database.ref(`Donem`).once('value',sp=>{
      this.st.set_Donem(sp.val());
    })
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
  this.zone.run(() => { 
    var t=setInterval(()=>{
      if(this.st.get_Ogretim_Turu()!==undefined && this.st.get_Donem()!==undefined){
     this.router.navigate(["DersSecim"],{relativeTo:this.route}).then(()=>{
      clearInterval(t);
      // console.log('after nav');
    })
      }
    })
  },10)
  
 }
 public message()
 {
   this.zone.run(()=>{
    return this.router.navigate(['Messages'] , {relativeTo: this.route});
   })
   
 }
 public dersler()
 {
   this.zone.run(()=>{
    this.router.navigate(["dersler"],{relativeTo:this.route});
   })
  
 }

}
