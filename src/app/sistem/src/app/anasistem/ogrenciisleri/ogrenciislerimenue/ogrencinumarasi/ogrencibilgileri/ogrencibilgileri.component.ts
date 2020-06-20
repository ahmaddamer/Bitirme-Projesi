import { Component, OnInit } from '@angular/core';
import {MyserviceService} from '../../../../myservice.service';
import {AngularFireDatabase} from '@angular/fire/database';
import 'firebase/auth';
import 'firebase/firestore';
import * as $ from 'jquery';
import 'firebase/auth';
import 'firebase/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import { IslerserviceService } from './islerservice.service';
@Component({
  selector: 'app-ogrencibilgileri',
  templateUrl: './ogrencibilgileri.component.html',
  styleUrls: ['./ogrencibilgileri.component.scss']
})
export class OgrencibilgileriComponent implements OnInit {

  constructor(private ts: MyserviceService ,
    private db: AngularFireDatabase , private router: Router
      , private activerouter: ActivatedRoute , private Is:IslerserviceService) {
    // console.log(ts.id);
 
    this.db.database.ref(`Ogrenciler/${this.Is.get_id()}`).once('value',sp=>{
      console.log('Ogretim '+sp.val().Ogretim);
      this.Is.set_Ogretim(sp.val().Ogretim);
    })
  }

  ngOnInit() {
    console.log(this.Is.get_id());
  }
 public geri() {
   this.router.navigate(['../'], { relativeTo: this.activerouter });
 }
  public extra() {
    alert('ikinci donemde yasamaya devam etsem devam ederim');
  }
  public sonucular()
  {
   var t= setInterval(()=>{
      if(this.Is.get_ogretim()!==undefined)
      { clearInterval(t);
        
        return this.router.navigate(['sonuclar'],{relativeTo:this.activerouter});
       
      }
    },10);
  }

}
