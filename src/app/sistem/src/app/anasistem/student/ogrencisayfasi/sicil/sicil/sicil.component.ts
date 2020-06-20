import { Component, OnInit ,  NgZone } from '@angular/core';
import {NgIf} from '@angular/common';
import { FirebaseDatabase } from '@angular/fire';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { SyncAsync } from '@angular/compiler/src/util';
class A
{
  node:any;
  key:any;
  constructor(node:any,key:any)
  {
    this.key=key;
    this.node=node;
  }
}
@Component({
  selector: 'app-sicil',
  templateUrl: './sicil.component.html',
  styleUrls: ['./sicil.component.scss']
})
export class SicilComponent {
 L:Observable<any[]>;
 donem:any;
  constructor(private db:AngularFireDatabase , private zone:NgZone) {
 
  if(this.p()==='BAHAR')
  {
    console.log('yes');
  }

  }

  
f() : any
{
  

 
    this.L = new Observable((obs)=>{
    this.db.database.ref(`Donem`).once('value', sp=>{
      obs.next(sp.val());
   })
    
  })
  
  return this.L;

}

p():any
{
  this.f().subscribe(k=>{
    console.log(k);
return k;
  })
}

}
