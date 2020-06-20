import { TeachersecService } from 'src/app/teachersec.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { DersAlanlariComponent } from './../ders-alanlari.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { StudentsecService } from 'src/app/anasistem/student/ogrencisayfasi/studentsec.service';
import { FormControl } from '@angular/forms';
class A
{
  name:any;
  id:any;
  constructor(id:any,name:any)
  {
    this.id=id;
    this.name=name;
  }
}

class Sinav{
  id:string;
  vize:string;
  Final:string;
  proje:string;
  Bute:string='false';
constructor(id:string,vize:string,proje:string,Final:string,Bute:string)
{
  this.id = id;
  this.vize = vize;
  this.proje = proje;
  this.Final = Final;
  this.Bute = Bute;
}
}
@Component({
  selector: 'app-sheetstudents',
  templateUrl: './sheetstudents.component.html',
  styleUrls: ['./sheetstudents.component.scss']
})
export class SheetstudentsComponent implements OnInit {
students_id:any[]=[];
students_sinavlar:Sinav[]=[];
proje_not:string;
Odev_not:string;
Odevler_Puani:any[]=[];
Odevler_Etkisi:any[]=[];
odev_icin_secilen_ogrenci_id:any;
 Al:DersAlanlariComponent;
But:'false';
  constructor(
    private db:AngularFireDatabase, private Tc:TeachersecService,
     private zone:NgZone, private router:Router, 
     private route:ActivatedRoute , private stt:StudentsecService) { }

 async ngOnInit() {

await this.db.database.ref('But').once('value', sp=>{
 this.But = sp.val();
});


console.log('But = '+ this.But);
this.Tc.set_Ders_adi(this.Tc.get_Ders_adi());
this.Tc.set_donem(this.Tc.get_donem());
this.Tc.set_id(this.Tc.get_id());
this.Tc.set_ogretim(this.Tc.get_ogretim());

  ///////////////
this.Al  = new DersAlanlariComponent( this.db ,
  this.stt,
  this.Tc  ,
  this.zone ,this.router , this.route);
this.proje_not = 'true';
this.Odev_not = 'true';
this.Odevler_Puani.length=0;
  await  this.db.database.
  ref(`AlinmisDersler/${this.Tc.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}`).
  once('value',(snap)=>{
     snap.forEach(a=>{

if(a.key!=='Ders_Ortalamasi'&&a.key!=='Standart_Sapma'){
  console.log(a.key);
  console.log(a.val().vize+' '+a.val().proje+' '+a.val().Final);
  this.students_id.push(a.key);
  let vize = a.val().vize;
  let proje = a.val().proje;
  let final = a.val().Final;
  let Bute = a.val().But;
  
console.log('Odevler here '+ a.val().OdevPuani)

if(a.val().OdevPuani[0]==='Yok')
{
this.Odev_not = 'false';
}


if(a.val().vize===undefined||a.val().vize===null)
 vize = '-';
 if(a.val().proje===undefined||a.val().proje===null||a.val().proje===''){
  proje = '';
 
 }
 
 if(a.val().Final===undefined||a.val().Final===null)
 final = '-';

 if(a.val().Bute===undefined||a.val().Bute===null)
 Bute = '-';

  this.students_sinavlar.push(new Sinav(a.key,vize,proje,final,Bute));
}
    })
    })


if(this.students_sinavlar[0].proje==='')
this.proje_not = 'false';
  


}
  satir:Number;
  sutun:Number;
  st:string;
public tableCliked(i:Number,j:Number,contain:string)
{this.satir = i;
  this.st=contain;
  this.sutun = j;
  
  console.log('satir '+i+' sutun'+j+' metin'+ contain);
  
}
public f()
{
  this.satir=undefined;
 
  console.log('bastini');
}
 sumOdevler:any;
public async Update(i:Sinav,index:any)
{
  var Final ;
  this.Tc.set_Ders_adi(this.Tc.get_Ders_adi());
this.Tc.set_donem(this.Tc.get_donem());
this.Tc.set_id(this.Tc.get_id());
this.Tc.set_ogretim(this.Tc.get_ogretim());

await   this.db.database.ref(`table/${this.Tc.get_date()}/${this.Tc.get_ogretim()}/${this.Tc.get_donem()}`)
.once('value',sp=>{
// console.log(sp.val());
this.Tc.myObj = sp.val();
});


this.Al  = new DersAlanlariComponent( this.db ,
  this.stt,
  this.Tc  ,
  this.zone ,this.router , this.route);
  if(this.But==='false')
  Final = $('.AFinal').eq(index).val();
else{
Final = $('.ABut').eq(index).val();
this.Tc.ButDegeri = Final;
}



let Vize = $('.AVize').eq(index).val();

let Proje = $('.AProje').eq(index).val();

if(Final===undefined)
Final=i.Final;
if(Vize===undefined)
Vize = i.vize;
if(Proje===undefined)
Proje = i.proje;







console.log('Final '+ Final+' Vize '+ Vize+' Proje '+ Proje);
 


let full_name='';
await this.db.database.ref(`Ogrenciler/${i.id}`).once('value',sp=>{

full_name = sp.val().name+' '+sp.val().surename;




});


let x = new A(i.id , full_name);


 await this.Odevf(i);
await this.Al.get_ID(x,Vize,Proje,Final,index);
 await   this.db.database.ref(`AlinmisDersler/${this.Tc.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${i.id}/OdevPuani`).set(this.Odevler_Puani);
 await   this.db.database.ref(`AlinmisDersler/${this.Tc.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${i.id}/OdevEtkisi`).set(this.Odevler_Etkisi);

 this.Tc.ButDegeri =undefined;

}

public async Odevf(i:Sinav)
{
  this.Odevler_Puani.length=0;
  this.Odevler_Etkisi.length=0;
this.odev_icin_secilen_ogrenci_id = i.id;
  await  this.db.database.
  ref
  (`AlinmisDersler/${this.Tc.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${i.id}`).
  once('value',(snap)=>{
     snap.forEach(a=>{
      if(a.key==='OdevPuani'){
        console.log('keys '+ a.key);
        a.val().forEach(element => {
          
          this.Odevler_Puani.push(element);
        });
      }
      
        if(a.key==='OdevEtkisi'){
          a.val().forEach(element => {
            
            this.Odevler_Etkisi.push(element);
          });
        }


      

     });
    });

    
for(let i=0;i<this.Odevler_Puani.length;i++)
{
  this.sumOdevler+=(this.Odevler_Puani[i]*this.Odevler_Etkisi[i]);
}

this.sumOdevler/=100;


}
 Aelements : any[]=[];
public degistirme_Odev()
{
// console.log(this.odev_icin_secilen_ogrenci_id);
this.Aelements.length=0;
let elements = $('.ABC');


for(let i=0;i< elements.length;i++ )
{
  this.Aelements.push( elements.eq(i).val());
}

this.db.database.
ref
(`AlinmisDersler/${this.Tc.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${this.odev_icin_secilen_ogrenci_id}/OdevPuani`).set(this.Aelements);

}



/////////////////////


geri_don()
{
  this.zone.run(()=>{

    this.router.navigate(['../'],{relativeTo:this.route});
  });
}









}
