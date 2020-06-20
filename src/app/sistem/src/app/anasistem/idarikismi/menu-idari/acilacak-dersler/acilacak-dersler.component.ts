import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import * as $ from 'jquery';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { StudentsecService } from 'src/app/anasistem/student/ogrencisayfasi/studentsec.service';
import { TeachersecService } from 'src/app/teachersec.service';
class DersDet{
  Final:string;
  Vize:string;
  Proje:string;
  Odevler:string[];
}
class secim{
  Dr:string;
  Ders:string;
  saat:string;
  yil:string;
  kredi:string;
  OgrenciSayisi:string;
  fullOgrenciSayisi:string;
  mykredi:any;
  Final:any;
  Proje:any;
  Vize:any;
constructor(dr:string,ders:string,saat:string,
  yil:string,kredi:string,O:string,fO:string,vize:any,proje:any,final:any)
{
this.Ders=ders;
this.Dr=dr;
this.saat=saat;
this.yil=yil;
this.kredi=kredi;
this.OgrenciSayisi=O;
this.fullOgrenciSayisi=fO;
this.Final=final;
this.Vize = vize;
this.Proje = proje;
}
}
@Component({
  selector: 'app-acilacak-dersler',
  templateUrl: './acilacak-dersler.component.html',
  styleUrls: ['./style.css']
})

export class AcilacakDerslerComponent implements OnInit {
  Kalan:any;
  orderForm: FormGroup;
itemsf: FormArray;
///////////////////////////
  myControl = new FormControl();
  options: string[] = ['Yaşar Becerekli', 'Onur Gök', 'ADNAN KAVAK','ALEV MUTLU','BURAK INNER'];
  myControl2 = new FormControl();
  name= new FormControl();
  options2: string[] = [
  "algoritma",
  "YazlabI",
  "YazlabII",
  "ProgramalamaI",
  "ProgramalamaII",
  "BilLabI",
  "BilLabII",
  "NoronAglari",
  "BulanikMantik",
  "Biyonformatic",
  "ProlabI",
  "ProlabII",
  "VeriYapilari",
  "VeriTabani"];
  options3: string[] = ['1-3', '3-5', '5-8','10-1','9:30-12','6:00-8:30'];
  options4: string[] = ['1', '2', '3','4'];
  options5:string[]=['2','3','4','5','6'];
  options6:string[]=['30','35','40','45','50','55','60','75'];
  private objm:secim[]=[];
  private yt:secim;
t:number;
t2:number;
items: Observable<any[]>;
id:number;
itemsRef: AngularFireList<any>;
DersDetaylar:DersDet;
constructor(private fb: AngularFireDatabase,
  private st:StudentsecService,private Tc:TeachersecService,
  private formBuilder: FormBuilder) {
let y = 'BilLabI';
 // console.log(Tc.Dersler_Kredi[`${y}`].kredi);
this.DersDetaylar = new DersDet();
this.DersDetaylar.Final = '';
this.DersDetaylar.Vize='';
this.DersDetaylar.Proje='';
this.DersDetaylar.Odevler = [];


  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',

    });
  }
  Ls:any[]=[];
  addItem(i:any): void {
    this.itemsf = this.orderForm.get('itemsf') as FormArray;
    this.itemsf.push(this.createItem());
    this.Ls.push(i);
  }
  remove(i:number)
  {

    this.itemsf.removeAt(i);
  }
  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: '',

      itemsf: this.formBuilder.array([ this.createItem() ])
    });


    ///////////////////////////
console.log(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}`);
    this.items = this.fb.list(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}`).valueChanges();
    this.itemsRef=this.fb.list(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}`);
}

public getOdevler(s:string)
{
var getting = $(".getting");
console.log('deney length '+getting.length);
if(getting.eq(0).val().toString().length===0)
{
  this.fb.database.
  ref
  (`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${s}/Odevler`).set('Yok');
}
else
for(let i=0;i<getting.length;i++)
{//save homeworks and (final,) in database
this.fb.database.
ref
(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${s}/Odevler/${i}`)
.set(getting.eq(i).val());

}
}
public async add()
{



let t1=$('#one').val().toString();
let t2=$('#one2').val().toString();
let t3=$('#one3').val().toString();
let t4=$('#one4').val().toString();
let t5=$('#kredi').val().toString();
let t6=$('#one6').val().toString();
let t7 = $('#final').val().toString();
let t8 = $('#vize').val().toString();
let t9 = $('#proje').val().toString();
if(t9==='')
{
  t9 = 'Yok';
}
if(t1!==""&&t2!==""&&t3!==""&&t4!==""&&t5!==""&&t6!==""){
  let ob = new secim(t1,t2,t3,t4,t5,t6,t6,t8,t9,t7);
await this.fb.database.
ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${t2}`).
set(ob);
this.getOdevler(t2);

}
}


public get_id(i:number)
{
  this.t=0;
this.fb.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}`).on('value',(snapshot) => {

  snapshot.forEach(a=>{

    if(this.t===i){
  this.fb.database.ref('idDelete').set(a.key);
    }
    this.t++;
});
});

 this.fb.database.ref('idDelete').once('value',(snapshot)=>{

  this.itemsRef.remove(snapshot.val());
  console.log(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}`+snapshot.val());
 })
}

public get_id_u(i:any)
{
  this.id=i;
let c=0;
this.fb.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}`).once('value' , snapshot=>{

  snapshot.forEach(a =>{
    if(c===i){
    $('#Mtwo').val(a.val().Ders);
    $('#Mone').val(a.val().Dr);
    $('#Mthree').val(a.val().saat);
    $('#Mfour').val(a.val().yil);
    $('#Mfive').val(a.val().kredi);
    $('#Msix').val(a.val().OgrenciSayisi);
  }

c++;
})

})



}
get_v()
{
  console.log(this.myControl.value);
}
public async print_id()
{
  let t1=$('#Mone').val().toString();
  let t2=$('#Mtwo').val().toString();
  let t3=$('#Mthree').val().toString();
  let t4=$('#Mfour').val().toString();
  let t5=$('#Mfive').val().toString();
  let t6=$('#Msix').val().toString();
  let yodevler = [];
  let final='';
  let vize='';
  let proje='';
await this.fb.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${t2}/Final`).once('value',sp=>{
final = sp.val();
  });
  await this.fb.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${t2}/Vize`).once('value',sp=>{
    vize = sp.val();
      });
  await this.fb.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${t2}/Proje`).once('value',sp=>{
    proje = sp.val();
          });

await this.fb.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${t2}/Odevler`).once('value',sp=>{

  console.log(sp.val());
  yodevler.push(sp.val());

});

 this.t2=0;
  this.fb.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}`).on('value',(snapshot) => {

  snapshot.forEach(a=>{

    if(this.t2===this.id){
  this.fb.database.ref('idUpdate').set(a.key);
    }
    this.t2++;
});
});
let t7 = $('#vize').val().toString();
let t8 = $('#proje').val().toString();
let t9 = $('#final').val().toString();
if(t8==='')
t8='Yok';
await  this.fb.database.ref('idUpdate').once('value',(snapshot)=>{

  this.fb.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/`+snapshot.val()).
  set(new secim(t1,t2,t3,t4,t5,t6,t6,t7,t8,t9));
  console.log(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/`+snapshot.val());
 });


await this.fb.database.
ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${t2}/Odevler`).
set(yodevler[0]);

//////////////


await this.fb.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${t2}/Vize`).set(vize);
await this.fb.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${t2}/Proje`).set(proje);
await this.fb.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${t2}/Final`).set(final);




}
////////////////



/////
public conf()// control if there is any homework or not
{
  if(this.DersDetaylar.Odevler[0])
  return true;
  else
  return false;
}
////////////////////////
dersname:string;
public async dersDetay(Ders:string)
{
  let proje = $('#uproje').val().toString();
 console.log('fomr detay'+ proje);
  this.dersname = Ders;
  this.DersDetaylar.Odevler=[];
await this.fb.database.
ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${Ders}`).
once('value',sp=>{
this.DersDetaylar.Final = sp.val().Final;
this.DersDetaylar.Vize = sp.val().Vize;
this.DersDetaylar.Proje = sp.val().Proje;

});
 await this.fb.database.
  ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${Ders}/Odevler`).
  once('value',sp=>{
    if(sp.exists())
    {

       sp.forEach(e=>{
        this.DersDetaylar.Odevler.push(e.val());



       });

    }
  });


this.DersDetaylar.Odevler.forEach(e=>{
  console.log('odevler son '+ e);
})


  }

//////////


/////////////////
  // dersname
 public async DersdetayUpdate(){
let final = $('#ufinal').val().toString();
let vize = $('#uvize').val().toString();
let proje = $('#uproje').val().toString();

if(proje=='0'|| proje=='')
{
  $('#uproje').hide();
}

let formodevler = $('.Odevler');
console.log('Ders name'+ this.dersname);
console.log('final'+ final);
console.log('vize' + vize);
console.log('proje '+ proje);
console.log('odevler');
for(let i=0;i< formodevler.length;i++)
{
  console.log(formodevler.eq(i).val());
}
/////////////////////database update/////////

this.fb.database.
  ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${this.dersname}/Final`).set(final);


await this.fb.database.
  ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${this.dersname}/Vize`).set(vize);

 await this.fb.database.
  ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${this.dersname}/Proje`).set(proje);

  for(let i=0;i<formodevler.length;i++){
this.fb.database.
  ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${this.dersname}/Odevler/${i}`).
  set(formodevler.eq(i).val());

  }







  }


}
