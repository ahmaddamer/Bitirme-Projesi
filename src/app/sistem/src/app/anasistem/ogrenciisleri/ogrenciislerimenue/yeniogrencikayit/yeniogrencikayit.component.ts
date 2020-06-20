import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as $ from 'jquery';
import 'firebase/auth';
import 'firebase/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute, Router} from '@angular/router';
export interface Cinsiyet {
  value: string;
}
class Details {
  name: string;
  surename: string;
  pass: string;
  tarih: string;
  gender: string;
  address: string;
  yil:string;
  Ogretim:string;
constructor(name:string , surename:string , pass:string , 
  tarih:string , gender:string , address:string, yil:string,Ogretim:string) {
  this.name = name;
  this.surename = surename;
  this.pass = pass;
  this.tarih = tarih;
  this.gender = gender;
  this.address = address;
  this.yil=yil;
  this.Ogretim=Ogretim;
}
}




@Component({
  selector: 'app-yeniogrencikayit',
  templateUrl: './yeniogrencikayit.component.html',
  styleUrls: ['./yenikayit.css']
})
export class YeniogrencikayitComponent implements OnInit {
  x: any;
  y:any;
  ogretim:string;
  constructor(private db: AngularFireDatabase , private r: Router , private activatedRoute: ActivatedRoute) {
     

  }

  cinsiyet: Cinsiyet[] = [
    {value: 'Erkek'},
    {value: 'Kadın'},
  ];
  yil: Cinsiyet[] = [
    {value: '1'},
    {value: '2'},
    {value: '3'},
    {value: '4'}
  ];
   sinif: Cinsiyet[]=[
     {value:'IOgretim'},
     {value:'IIOgretim'}
   ];
  ngOnInit() 
  { 
   
  this.ogretim='';
   
  }
  public get_g(i: any): any {
    return this.x = i;
  }
public kaydet(): void {
  const adres = $('#address').val().toString();
  const name = $('#name').val().toString();
  const surename = $('#surename').val().toString();
  const id = $('#num').val().toString();
  const pass = $('#pwd').val().toString();
  const TarihDogumu = $('#birthdate').val().toString();
  const Gender = this.x;
  const yil=this.y;
 // alert(TarihDogumu+' '+Gender+' '+yil);
  this.db.database.ref().child('Ogrenciler/' + id).set(new Details(name, surename
      , pass, TarihDogumu , Gender , adres,yil,this.ogretim));

  alert('yeni kayit oldu!!!');
  this.r.navigate(['../'] , {relativeTo: this.activatedRoute});

}
}
