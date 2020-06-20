import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AngularFireDatabase } from '@angular/fire/database';
import { TeachersecService } from 'src/app/teachersec.service';
import { DialogData } from 'src/app/anasistem/hakkimda/hakkimda.component';
import { AlinanDerslerComponent } from '../alinan-dersler.component';

@Component({
  selector: 'app-dersdetay',
  templateUrl: './dersdetay.component.html',
  styleUrls: ['./dersdetay.component.scss']
})
export class DersdetayComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DersdetayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ,
    private db:AngularFireDatabase, private Tc:TeachersecService) {}

  onNoClick(): void {

    // alert(this.data['obj']['Ders']);
    // this.dialogRef.close();
  }
   Ders:any;
   Id:any ;
   Donem:any ;
   Ogretim:any ;
   Kredi:any ;
   Harf:any ;

   sinav:any;

///////////////////

final:string;
vize:string;
proje:string;
////////////////

finalEtkisi:string;
vizeEtkisi:string;
projeEtkisi:string;
But:string;
projeorisnot:boolean;
  justdonem:string;
  justyear:string;
  Odevler:any[]=[];
  IsthereOdev:string;
  OdevPuani:string[]=[];
async ngOnInit() {
  this.IsthereOdev = 'true';
console.log(this.Tc.myObj);
this.Ogretim = this.data['ogretim'];
this.Donem = this.data['donem'];
this.justyear = AlinanDerslerComponent.justyear;
this.justdonem = AlinanDerslerComponent.justdonem;

console.log(`table/${this.justyear}/${this.Ogretim}${this.justdonem}`);
new Promise(async (res,rej)=>{


await   this.db.database.ref(`table/${this.justyear}/${this.Ogretim}${this.justdonem}`)
.once('value',sp=>{
// console.log(sp.val());
this.Tc.myObj = sp.val();
});

console.log('Json file '+this.Tc.myObj);
res('next');
}).then(async (res)=>{



this.projeorisnot = true;
     this.Ders=this.data['obj']['Ders'];
     this.Id = this.data['id'];


     this.Kredi = this.data['obj']['Kredi'];
     this.Harf = this.data['obj']['Harf'];

this.finalEtkisi=this.Tc.myObj[`${this.Ders}`].Final;
this.vizeEtkisi = this.Tc.myObj[`${this.Ders}`].Vize;
this.projeEtkisi = this.Tc.myObj[`${this.Ders}`].Proje;
this.Odevler = this.Tc.myObj[`${this.Ders}`]['Odevler'];
console.log('Odevler '+this.Odevler);

if(this.Odevler[0]==='Y')
this.IsthereOdev = 'false';
else
{
  await this.db.database.ref
(`Siciller/${this.Donem}/${this.Ogretim}/${this.Id}/${this.Ders}/OdevPuani`).once('value',sp=>{
sp.forEach(e=>{
this.OdevPuani.push(e.val());
});

});
}

if(this.projeEtkisi==='Yok'){
  this.projeorisnot = false;
}


await this.db.database.ref
(`Siciller/${this.Donem}/${this.Ogretim}/${this.Id}/${this.Ders}`).once('value',sp=>{
this.sinav = sp.val();
}).then(()=>{
  if(this.sinav.Final!==null){
  this.final = this.sinav.Final;
}
if(this.sinav.vize!==null)
  this.vize = this.sinav.vize;
  if(this.sinav.proje!==null)
  this.proje = this.sinav.proje;

  if(this.final==='')
{
 this.final = 'X';
}
if(this.vize==='')
{
  this.vize='X'
}
if(this.proje==='')
{
  this.proje='X'
}




});
//alert(this.sinav.key+' '+this.sinav.val().vize);
if(this.sinav.But!==null||this.sinav.But!==''||this.sinav.But>=0&&this.sinav.But<=100)
{
  this.But = this.sinav.But;
}
else
this.But = 'X';




})
  }

}
