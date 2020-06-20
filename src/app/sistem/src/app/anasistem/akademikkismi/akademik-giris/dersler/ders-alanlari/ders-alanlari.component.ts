import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { StudentsecService } from 'src/app/anasistem/student/ogrencisayfasi/studentsec.service';
import { TeachersecService } from 'src/app/teachersec.service';

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

class yobj{
  tkredi:number;
  tyoplam:number;
  id:any;
  constructor(tkredi:number, ttoplam:number,id:any)
  {
    this.tkredi = tkredi;
    this.tyoplam = ttoplam;
    this.id=id;
  }
}
@Component({
  selector: 'app-ders-alanlari',
  templateUrl: './ders-alanlari.component.html',
  styleUrls: ['./ders-alanlari.component.scss']
})
export class DersAlanlariComponent implements OnInit {

  itr:Observable<string>;
  itemsRef: AngularFireList<any>;

  idarray:any[]=[];
  idinterval:any;
  items: Observable<A[]>;
  t:A[]=[];
  panelOpenState = false;
  t_obj:Observable<yobj>;
  arr_name:string[][]= new Array();

  Odevler:any[]=[];


public get_date():string
{
  var d = new Date();
  var n = d.getFullYear();
   return (n-1)+'-'+n;
}

    constructor(private db:AngularFireDatabase ,
      private st:StudentsecService,
      private Tc: TeachersecService  ,
      private Zone:NgZone , private router:Router , private Route:ActivatedRoute) {

        
        
///////////////////////////////////////////////////////

// get tarih



// console.log(this.get_date());


        ////////////////////////////////////////////////////////
      this.items= new Observable<A[]>(obs=>{
        this.db.database.ref(`AlinmisDersler/${this.get_date()}/`+this.Tc.get_ogretim()+
        '/'+this.Tc.get_Ders_adi()).once('value',(snap)=>{
         snap.forEach(a=>{
            console.log('items '+a.key+' '+a.val());
           this.t.push(new A(a.key,a.val()));
         })

       obs.next(this.t);
        })
      })

    }

But:boolean=false;
bute:FormControl;
   async ngOnInit() {

    this.Tc.ButDegeri =undefined;


this.bute = new FormControl('');

  await   this.db.database.ref(`table/${this.get_date()}/${this.Tc.get_ogretim()}/${this.Tc.get_donem()}`)
     .once('value',sp=>{
// console.log(sp.val());
this.Tc.myObj = sp.val();
     });
     console.log('every thing');
console.log(this.Tc.myObj);
console.log('------------------');
console.log('our kredi');
// console.log(this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi']);
console.log('-------------------------');
     for(let i of this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Odevler']){
     if(i==='Y'){
      this.Odevler.push('Yok');
    break;
    }
    else{
      this.Odevler.push(i);
    }

     }

await this.db.database.ref(`But`).once('value',sp=>{
if(sp.val()==='true')
{
  this.But=true;
}
});
    }
public async get_But_Ortalama(x:A,But:any,j:any)
{
  if(this.Odevler.length===0){
  await   this.db.database.ref(`table/${this.get_date()}/${this.Tc.get_ogretim()}/${this.Tc.get_donem()}`)
     .once('value',sp=>{
// console.log(sp.val());
this.Tc.myObj = sp.val();
     });
     console.log('every thing');
console.log(this.Tc.myObj);
console.log('------------------');
console.log('our kredi');
// console.log(this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi']);
console.log('-------------------------');
     for(let i of this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Odevler']){
     if(i==='Y'){
      this.Odevler.push('Yok');
    break;
    }
    else{
      this.Odevler.push(i);
    }

     }
  
    }
  
  let odevlerpuani:any=[]=[]; // butun odevler puanlari depolanacak
  let vize = 0;
  let proje=0;
console.log('But puani '+ But);
  await this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${x.id}/OdevPuani`)
.once('value',sp=>{
  if(sp.exists()){
    sp.forEach(e=>{
      odevlerpuani.push(e.val());
    })

  }
else
{
  odevlerpuani.push('Yok');
}
});

await this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${x.id}/vize`)
.once('value',sp=>{
vize = sp.val();
});
await this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${x.id}/proje`)
.once('value',sp=>{
  if(sp.exists())
proje = sp.val();
else
proje = 0;
});

let odevlerveEtkisi =0;
if(this.Odevler[0]!=='Yok')
{
  for(let i=0;i<this.Odevler.length;i++)
  {
   
    odevlerveEtkisi+=this.Odevler[i]*odevlerpuani[i];
  }
}
let Final_But_Orani = (Number(But)*this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Final']);
let Vize_Orani = (Number(vize)*this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Vize']);
let Proje_Orani = (Number(proje)*this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Proje']);


if(this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Proje']==='Yok')
Proje_Orani = 0;

let yeniOrtalamaDersi = (odevlerveEtkisi+Proje_Orani+Vize_Orani+Final_But_Orani)/100;
console.log('yeni ortalama ders icin '+yeniOrtalamaDersi);

await this.db.database.ref(`AlinmisDersler/${this.Tc.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/Ders_Ortalamasi`)
.set(yeniOrtalamaDersi);


await this.db.database.ref(`Siciller/${this.get_date()}/${this.Tc.get_donem()}/${this.Tc.get_ogretim()}/${x.id}/${this.Tc.get_Ders_adi()}/But`)
.set(yeniOrtalamaDersi);


let Harf = '';
let Harf_etkisi = 0;
if(But<39.5)
{
  Harf = 'FF';
  Harf_etkisi=0;
}
else{
if(yeniOrtalamaDersi>=89.5)
{
Harf = 'AA';
Harf_etkisi = 4;
}
if(yeniOrtalamaDersi>=79.5&&yeniOrtalamaDersi<89.5)
{
  Harf = 'BA';
  Harf_etkisi = 3.5;
}
if(yeniOrtalamaDersi>=74.5&&yeniOrtalamaDersi<79.5)
{
  Harf = 'BB';
  Harf_etkisi = 3;
}
if(yeniOrtalamaDersi>=69.5&&yeniOrtalamaDersi<74.5)
{
  Harf = 'CB';
  Harf_etkisi = 2.5;
}
if(yeniOrtalamaDersi>=59.5&&yeniOrtalamaDersi<69.5)
{
  Harf = 'CC';
  Harf_etkisi = 2;
}
if(yeniOrtalamaDersi>=49.5&&yeniOrtalamaDersi<59.5)
{
  Harf = 'DC';
  Harf_etkisi = 1.5;
}
if(yeniOrtalamaDersi>=39.5&&yeniOrtalamaDersi<49.5)
{
  Harf='DD';
  Harf_etkisi = 1;
}
if(yeniOrtalamaDersi>=29.5&&yeniOrtalamaDersi<39.5)
{
  Harf = 'FD';
  Harf_etkisi = 0.5;
}
if(yeniOrtalamaDersi>=0&&yeniOrtalamaDersi<29.5)
{
  Harf = 'FF';
  Harf_etkisi=0;
}
}

await this.db.database.ref(`Siciller/${this.get_date()}/${this.Tc.get_donem()}/${this.Tc.get_ogretim()}/${x.id}/${this.Tc.get_Ders_adi()}/Harf`)
.set(Harf);


await this.db.database.ref(`Siciller/${this.get_date()}/${this.Tc.get_donem()}/${this.Tc.get_ogretim()}/${x.id}/${this.Tc.get_Ders_adi()}/Harf_etkisi`)
.set(Harf_etkisi);



let eski_Avg = 0;
let tp_kredi = 0;
let eski_Harf_note_etkisi = 0;
///////////////////
await this.db.database.ref(`Averages/${this.Tc.get_date()}/${x.id}/Average/Genel_Ortalama`)
.once('value',sp=>{
eski_Avg =sp.val();

});

await this.db.database.ref(`Averages/${this.Tc.get_date()}/${x.id}/Average/Toplam_Kredi`)
.once('value',sp=>{
  tp_kredi = sp.val();

});
//get ders eski harf eskisi
await this.db.database.ref(`Averages/${this.get_date()}/${x.id}/${this.Tc.get_Ders_adi()}/Harf_etkisi`)
.once('value',sp=>{
eski_Harf_note_etkisi = sp.val();
});
let Ders_Kredisi=0;
///get ders kredisi

  Ders_Kredisi = this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
console.log('Eski Avg '+eski_Avg + ' Harf '+ Harf_etkisi +'  eski_Harf_note_etkisi'+ eski_Harf_note_etkisi);

 console.log('eski genel ortalama '+ eski_Avg +'Eski Harf Etkisi '+ eski_Harf_note_etkisi +' yeni Harf'+ Harf +' yetkisi'+ Harf_etkisi+
 ' toplam kredi '+ tp_kredi);
 let yeni_ortalama=0;
new Promise((res,rej)=>{


yeni_ortalama = (eski_Avg)*(tp_kredi) - (Ders_Kredisi)*(eski_Harf_note_etkisi);
console.log('yeni ortalama 1st + '+ yeni_ortalama);
yeni_ortalama+=(Ders_Kredisi)*(Harf_etkisi);
console.log('yeni ortalama 2nd + '+ yeni_ortalama);
yeni_ortalama/=(tp_kredi);
res('okey');
}).then(async(res) =>{


await this.db.database.ref(`Averages/${this.Tc.get_date()}/${x.id}/Average/Genel_Ortalama`).
set(yeni_ortalama);
console.log('yeni ortalama 3rd + '+ yeni_ortalama);
await this.db.database.ref(`Siciller/${this.Tc.get_date()}/${this.Tc.get_donem()}/${this.Tc.get_ogretim()}/${x.id}/Average/Genel_Ortalama`).set(yeni_ortalama);


 //await console.log('finsih '+ yeni_ortalama);
///////////////////
await this.db.database.ref(`AlinmisDersler/${this.Tc.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${x.id}/Harf_Notu`).set(Harf);
await this.db.database.
ref(`AlinmisDersler/${this.Tc.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${x.id}/But`).set(yeniOrtalamaDersi);
await this.db.database.ref(`Averages/${this.get_date()}/${x.id}/${this.Tc.get_Ders_adi()}/Harf`)
.set(Harf);

await this.db.database.ref(`Averages/${this.get_date()}/${x.id}/${this.Tc.get_Ders_adi()}/Harf_etkisi`)
.set(Harf_etkisi);



await this.db.database.ref(`Siciller/${this.get_date()}/${this.Tc.get_donem()}/${this.Tc.get_ogretim()}/${x.id}/${this.Tc.get_Ders_adi()}/Harf_etkisi`)
.set(Harf_etkisi);


await this.db.database.ref(`Siciller/${this.get_date()}/${this.Tc.get_donem()}/${this.Tc.get_ogretim()}/${x.id}/${this.Tc.get_Ders_adi()}/Harf`)
.set(Harf);


await this.db.database.ref(`Siciller/${this.Tc.get_date()}/${this.Tc.get_donem()}/${this.Tc.get_ogretim()}/${x.id}/Average/Toplam_Kredi`).set(tp_kredi);

await this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${x.id}/ButPuani`)
.set(Number(But));

await this.db.database.ref(`Siciller/${this.get_date()}/${this.Tc.get_donem()}/${this.Tc.get_ogretim()}/${x.id}/${this.Tc.get_Ders_adi()}/ButPuani`)
.set(Number(But));

});


}





    public async   get_ID(x:A,vize:any,proje:any,final:any,j:any)
    {

      await   this.db.database.ref(`table/${this.Tc.get_date()}/${this.Tc.get_ogretim()}/${this.Tc.get_donem()}`)
      .once('value',sp=>{
 // console.log(sp.val());
 this.Tc.myObj = sp.val();
      });

if(this.Odevler.length===0)
      for(let i of this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Odevler']){
        if(i==='Y'){
         this.Odevler.push('Yok');
       break;
       }
       else{
         this.Odevler.push(i);
       }
   
        }


       await   this.db.database.ref('But').once('value',sp=>{
        if(sp.val()==='false')
        this.But = false;
        else
        this.But = true;
       });
      

if(this.Odevler.length===0)
{




}



      if(this.But){
      

      if(this.Tc.ButDegeri!==undefined){


console.log('from another page Bute '+ this.Tc.ButDegeri);
        this.get_But_Ortalama(x,this.Tc.ButDegeri,j);
     // this.Tc.ButDegeri =undefined;
      }
      else
       this.get_But_Ortalama(x,this.bute.value,j);
    }
    else{
     
     this.sinavdetay = final;
      var Donem_ort = 0;
      let ot = 0;
      var odevpuani=[];
let yic = 0;
      let odevval = $('.odevval');
       if(this.Odevler[0]!=='Yok')
      for(let i=j*(this.Odevler.length);i<j*(this.Odevler.length)+this.Odevler.length;i++)
      {console.log('indexes '+ i+' '+ (j*this.Odevler.length+this.Odevler.length));
        ot+=Number(odevval.eq(i).val())*Number(this.Odevler[yic++])/100;
        odevpuani.push(odevval.eq(i).val());
        console.log(' tek tek '+ odevval.eq(i).val()+'  ot'+ ot);
      }
      else
      {
      ot = 0;
      odevpuani.push('Yok');

      }
      console.log('odev values '+ot);

      if(odevpuani[0]===undefined)
      {odevpuani = [];
      await this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${x.id}/OdevPuani`)
      .once('value',sp=>{
      
        sp.forEach(e=>{
          odevpuani.push(e.val());
          console.log('from loop '+ e.val());
        })
         
        
      });
        
      
      }



      let Vize_Orani = (Number(vize)*this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Vize'])/100;
      let Final_Orani = (Number(final)*this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Final'])/100;
     
    //  console.log('Finaaaal plast '+ Vize_Orani +'   FF '+ Final_Orani);
     
      let Proje_Orani = 0;
      if(this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Proje']!=='Yok'){
        console.log('proje '+this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Proje']);
      Proje_Orani =(Number(proje)*this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Proje'])/100;
      }
      else
      Proje_Orani = 0;
    

Donem_ort = Vize_Orani+Final_Orani+Proje_Orani+ot;
       
      
      console.log('Vize Blassssssssst =='+Vize_Orani+'  Final=='+Final_Orani+'   Proje=='+Proje_Orani);


var vz = 0;
var Fn=0;
var Proj=0;
if(Donem_ort.toString()=== 'NaN')
{
 Donem_ort = 0;
 ot=0;

 for(let i=0;i<this.Odevler.length;i++)
 {
   ot+=Number(this.Odevler[i])*Number(odevpuani[i]);
 }
 ot=ot/100;
 Donem_ort = Vize_Orani+Final_Orani+Proje_Orani+ot;
}
      let yobj = {
        'id':x.id , 'name':x.name ,'vize':vize , 'proje':proje, 'Final':final ,
         'Donem_ort':Donem_ort , 'OdevEtkisi':this.Odevler ,'OdevPuani':odevpuani
      }

      console.log('yobj amk '+ JSON.stringify(yobj));

      // Ders Ortalmasi ve Sinif Genel Ortalmasi hesaplamasi
      let Ders_Ortalamasi = 0;
      let Ogrenci_sayisi = 0;
      let Standart_sapma=0;
      let T_Standart=0;
      this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${x.id}`).set(yobj);
      this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}`).once('value',snap=>{
      snap.forEach(a=>{
        if(a.val().Donem_ort!==undefined){
        // console.log(a.val().Donem_ort);
      Ders_Ortalamasi+=a.val().Donem_ort;
      Ogrenci_sayisi++;
      }

      })
        this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/Ders_Ortalamasi`).set(Ders_Ortalamasi/Ogrenci_sayisi);
 //sinif standart sapma hesaplamasi


}).then(()=>{

  this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}`).once('value',snap=>{

    snap.forEach(e=>{
      if(e.val().Donem_ort!==undefined){
  //  console.log(Ogrenci_sayisi);
      Standart_sapma+=Math.pow((e.val().Donem_ort-snap.val().Ders_Ortalamasi),2);
    }
    })
  if(Ogrenci_sayisi>24)
  {
    Standart_sapma/=(Ogrenci_sayisi-1);
    Standart_sapma = Math.sqrt(Standart_sapma);
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/Standart_Sapma`).set(Standart_sapma);

  }
  })

}).then(()=>{
  this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}`).once('value',snap=>{
    snap.forEach(e=>{
      if(e.val().Donem_ort!==undefined){
      T_Standart = e.val().Donem_ort - snap.val().Ders_Ortalamasi;
      // console.log(T_Standart);
      let t= T_Standart;
      if(snap.val().Standart_Sapma>0)
      T_Standart /=snap.val().Standart_Sapma;
      // console.log(t+'/'+snap.val().Standart_Sapma+' =='+T_Standart);
       T_Standart=T_Standart*10;
      //  console.log(T_Standart);
      this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/T_standart`).set(T_Standart+50);
    }
    })

  }).then(()=>{
    this.Harf_Notu_Hesaplama(x.id);
  })
}).then(()=>{
this.db.database.ref('Donem').once('value',sp=>{
// copy basarilibasarsiz node completly with added some details
  // this.db.database.ref(`AlinmisDersler/2019-2020/basariliBasarsiz`).once('value',snapshotChanges=>{
    // this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${x.id}`).set(yobj);

    this.db.database.ref(`Siciller/${this.get_date()}/${sp.val()}/${this.Tc.get_ogretim()}/${x.id}/${this.Tc.get_Ders_adi()}`).set(yobj);
   this.db.database.ref(`Teachers/${this.Tc.get_id()}`).once('value',drname=>{

    this.db.database.ref(`Siciller/${this.get_date()}/${sp.val()}/${this.Tc.get_ogretim()}/${x.id}/${this.Tc.get_Ders_adi()}/Dr`).set(drname.val().name);

   })

    this.db.database.ref(`Averages/${this.get_date()}/${x.id}/Average`).once('value',sp2=>{
      // console.log(`Siciller/${this.get_date()}/${sp.val()}/${this.Tc.get_ogretim()}/${x.id}/Average`);
      this.db.database.ref(`Siciller/${this.get_date()}/${sp.val()}/${this.Tc.get_ogretim()}/${x.id}/Average`).set(sp2.val());
      this.db.database.ref(`Siciller/${this.Tc.get_ogretim()}/${x.id}`).once('value',sp2=>{
        if(sp2.exists())
        {

        }
      })
    })
    // })

this.db.database.ref(`Averages/${this.get_date()}/${x.id}/${this.Tc.get_Ders_adi()}`).once('value',p=>{

  this.db.database.ref(`Siciller/${this.get_date()}/${sp.val()}/${this.Tc.get_ogretim()}/${x.id}/${this.Tc.get_Ders_adi()}/Harf`).set(p.val().Harf);
  this.db.database.ref(`Siciller/${this.get_date()}/${sp.val()}/${this.Tc.get_ogretim()}/${x.id}/${this.Tc.get_Ders_adi()}/Harf_etkisi`).set(p.val().Harf_etkisi);
  this.db.database.ref(`Siciller/${this.get_date()}/${sp.val()}/${this.Tc.get_ogretim()}/${x.id}/${this.Tc.get_Ders_adi()}/Kredi`).set(p.val().kredi);

  this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${x.id}/T_standart`).once('value',vp=>{
    this.db.database.ref(`Siciller/${this.get_date()}/${sp.val()}/${this.Tc.get_ogretim()}/${x.id}/${this.Tc.get_Ders_adi()}/Ogrenci_standart_sapma`).set(vp.val());

  })

  this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/Ders_Ortalamasi`).once('value',vp2=>{
    this.db.database.ref(`Siciller/${this.get_date()}/${sp.val()}/${this.Tc.get_ogretim()}/${x.id}/${this.Tc.get_Ders_adi()}/Sinif_Ders_Ortalamasi`).set(vp2.val());

  })

  this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/Standart_Sapma`).once('value',vp2=>{
    this.db.database.ref(`Siciller/${this.get_date()}/${sp.val()}/${this.Tc.get_ogretim()}/${x.id}/${this.Tc.get_Ders_adi()}/Sinif_Standart_Sapma`).set(vp2.val());

  })

})
  })




})


    }

    }
    idstudent:any;
    sinavdetay:any;
    get_Puan(x:A,index:number,idstudent:any)
    {
      let odevval = $('.odevval');
      let ic = index*this.Odevler.length;
      this.idstudent = idstudent;
this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${x.id}/OdevPuani`).
once('value',sp=>{
if(sp.exists())
{
  sp.forEach(e=>{
    odevval.eq(ic++).val(e.val());
  })

}
});


      let xy=3;
      if(this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Proje']==='Yok' ){

        $('.Temp').hide(); // Temp class Just A signal to element which we want to remove it .

      }

      //  alert(index);
      let start = $('.dd');

      index= index*3;
      console.log('from get puan '+ index);
      ////////////////////////////////////
      start.eq(index).prop('placeholder' , this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Vize']+'%');
     start.eq(index+1).prop('placeholder' , this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Final']+'%');


      if(this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Proje']!='Yok'){

        start.eq(index+2).prop('placeholder' ,
        this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Proje']+'%');
         console.log(this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Proje']);
      }
      //////////////////////////////////////////
      this.db.database.ref
      (`AlinmisDersler/${this.get_date()}/basariliBasarsiz/`+
      this.Tc.get_ogretim()+'/'+this.Tc.get_Ders_adi()+'/'+x.id).once('value',snap=>{
        if(snap.exists())
        {
        $('mat-expansion-panel-header').eq(index).css({"background-color": "paleturquoise"});
        start.eq(index).val(snap.val().vize);
       start.eq(index+1).val(snap.val().Final);
        console.log(this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Proje']);
         if(this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Proje']!='Yok'){
        start.eq(index+2).val(snap.val().proje);
       start.eq(index+2).prop('placeholder' ,
        this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Proje']+'%');
         console.log(this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Proje']);
      }
       else  if(this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['Proje']==='Yok' ){

          $('.Temp').hide(); // Temp class Just A signal to element which we want to remove it .


       }
        }
      })



    }
  public Harf_Notu_Hesaplama(id:any)
  {let ogrencisayisi = 0;
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}`).once('value',sp=>{
      sp.forEach(e=>{
        if(e.key!=='Ders_Ortalamasi'&&e.key!=='Standart_Sapma'){
ogrencisayisi++;
        }
      })
    });


    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${id}`).once('value',s=>{
      let yakdonemort = Math.round(s.val().Donem_ort*100)/100;
    console.log('haydi '+yakdonemort);  
    
    
    if(this.sinavdetay<39.5){ // final puani<40 kucuk ise ogrenci  direkt kalir
      this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${id}/Harf_Notu`).set('FF');
    
    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
    let tobj = {
      'kredi': yv , 'Puan': s.val().Donem_ort ,
      'Harf':'FF' ,
      'Harf_etkisi':0
    };
    this.db.database.ref(`Averages/${this.get_date()}/${id}/${this.Tc.get_Ders_adi()}`).set(tobj);
    return;
    }
  });    



if(ogrencisayisi<25){//ogrencisayisi<25
console.log('id=>>>>>>>>>>>>>>>>>> ' +this.idstudent);


this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${id}`).once('value',s=>{
  let yakdonemort = Math.round(s.val().Donem_ort*100)/100;
console.log('haydi '+yakdonemort);  


if(Number(this.sinavdetay)<39.5){
  this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${id}/Harf_Notu`).set('FF');

let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
console.log('buraya....................');
let tobj = {
  'kredi': yv , 'Puan': s.val().Donem_ort ,
  'Harf':'FF' ,
  'Harf_etkisi':0
};
this.db.database.ref(`Averages/${this.get_date()}/${id}/${this.Tc.get_Ders_adi()}`).set(tobj);
return;
}


  if(Number(yakdonemort)>=89.5){
    console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${id}/Harf_Notu`).set('AA');

let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
// console.log(yv);
  let tobj = {
    'kredi': yv , 'Puan': s.val().Donem_ort ,
    'Harf':'AA' ,
    'Harf_etkisi':4
  };
  this.db.database.ref(`Averages/${this.get_date()}/${id}/${this.Tc.get_Ders_adi()}`).set(tobj);
  return;
}

if(yakdonemort>=79.5&&yakdonemort<89.5){
  this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${id}/Harf_Notu`).set('BA');

  let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
  // console.log(yv);
    let tobj = {
      'kredi': yv , 'Puan': s.val().Donem_ort ,
      'Harf':'BA' ,
      'Harf_etkisi':3.5
    };
    this.db.database.ref(`Averages/${this.get_date()}/${id}/${this.Tc.get_Ders_adi()}`).set(tobj);
    return;
  }


  if(yakdonemort>=74.5&&yakdonemort<79.5){
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${id}/Harf_Notu`).set('BB');
  
    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': s.val().Donem_ort ,
        'Harf':'BB' ,
        'Harf_etkisi':3
      };
      this.db.database.ref(`Averages/${this.get_date()}/${id}/${this.Tc.get_Ders_adi()}`).set(tobj);
    return;
    }

    if(yakdonemort>=69.5&&yakdonemort<74.5){
      this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${id}/Harf_Notu`).set('CB');
    
      let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
      // console.log(yv);
        let tobj = {
          'kredi': yv , 'Puan': s.val().Donem_ort ,
          'Harf':'CB' ,
          'Harf_etkisi':2.5
        };
        this.db.database.ref(`Averages/${this.get_date()}/${id}/${this.Tc.get_Ders_adi()}`).set(tobj);
        return;
      }
  
      if(yakdonemort>=59.5&&yakdonemort<69.5){
        this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${id}/Harf_Notu`).set('CC');
      
        let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
        // console.log(yv);
          let tobj = {
            'kredi': yv , 'Puan': s.val().Donem_ort ,
            'Harf':'CC' ,
            'Harf_etkisi':2
          };
          this.db.database.ref(`Averages/${this.get_date()}/${id}/${this.Tc.get_Ders_adi()}`).set(tobj);
          return;
        }


        if(yakdonemort>=49.5&&yakdonemort<59.5){
          this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${id}/Harf_Notu`).set('DC');
        
          let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
          // console.log(yv);
            let tobj = {
              'kredi': yv , 'Puan': s.val().Donem_ort ,
              'Harf':'DC' ,
              'Harf_etkisi':1.5
            };
            this.db.database.ref(`Averages/${this.get_date()}/${id}/${this.Tc.get_Ders_adi()}`).set(tobj);
            return;
          }

          if(yakdonemort>=39.5&&yakdonemort<49.5){
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${id}/Harf_Notu`).set('DD');
          
            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': s.val().Donem_ort ,
                'Harf':'DD' ,
                'Harf_etkisi':1
              };
              this.db.database.ref(`Averages/${this.get_date()}/${id}/${this.Tc.get_Ders_adi()}`).set(tobj);
              return;
            }


            if(yakdonemort>=29.5&&yakdonemort<39.5){
              this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${id}/Harf_Notu`).set('FD');
            
              let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
              // console.log(yv);
                let tobj = {
                  'kredi': yv , 'Puan': s.val().Donem_ort ,
                  'Harf':'FD' ,
                  'Harf_etkisi':0.5
                };
                this.db.database.ref(`Averages/${this.get_date()}/${id}/${this.Tc.get_Ders_adi()}`).set(tobj);
                return;
              }



              if(yakdonemort>=19.5&&yakdonemort<29.5){
                this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${id}/Harf_Notu`).set('FF');
              
                let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
                // console.log(yv);
                  let tobj = {
                    'kredi': yv , 'Puan': s.val().Donem_ort ,
                    'Harf':'FF' ,
                    'Harf_etkisi':0
                  };
                  this.db.database.ref(`Averages/${this.get_date()}/${id}/${this.Tc.get_Ders_adi()}`).set(tobj);
                  return;
                }









});  
 
 
  

  }
  


//put return after every condition
else // eger ogrenci sayisi 25 ten fazla ise can sistem uygulancaktir
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}`).once('value',s=>{

      s.forEach(e=>{
          if(e.key!=='Ders_Ortalamasi'&&e.key!=='Standart_Sapma'){
            if(this.sinavdetay<39.5)
              {
                 console.log('girdiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
              this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FF');
            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'FF' ,
                'Harf_etkisi':0
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
            }
            else if(this.sinavdetay>=39.5)
            {
            if(s.val().Ders_Ortalamasi>=80)
            {
              if(e.val().Donem_ort>=89.5)
              {
               //  console.log(e.val().Donem_ort);
              this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('AA');
            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'AA' ,
                'Harf_etkisi':4
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

              }
              if(e.val().Donem_ort>=79.5&&e.val().Donem_ort<89.5)
              {
                this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BA');

                let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
                // console.log(yv);
                  let tobj = {
                    'kredi': yv , 'Puan': e.val().Donem_ort ,
                    'Harf':'BA' ,
                    'Harf_etkisi':3.5
                  }
                  this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
              }

              if(e.val().Donem_ort>=75&&e.val().Donem_ort<=79)
              {
                this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BB');
                let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
                // console.log(yv);
                  let tobj = {
                    'kredi': yv , 'Puan': e.val().Donem_ort ,
                    'Harf':'BB' ,
                    'Harf_etkisi':3
                  }
                  this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
              }

              if(e.val().Donem_ort>=69.5&&e.val().Donem_ort<74.5)
              {
                this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CB');
                let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
                // console.log(yv);
                  let tobj = {
                    'kredi': yv , 'Puan': e.val().Donem_ort ,
                    'Harf':'CB' ,
                    'Harf_etkisi':2.5
                  }
                  this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
              }

              if(e.val().Donem_ort>=60&&e.val().Donem_ort<69.5)
              {
                this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CC');
                let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
                // console.log(yv);
                  let tobj = {
                    'kredi': yv , 'Puan': e.val().Donem_ort ,
                    'Harf':'CC' ,
                    'Harf_etkisi':2
                  }
                  this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
              }
              if(e.val().Donem_ort>=49.5&&e.val().Donem_ort<59.5)
              {
                this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DC');
                let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
                // console.log(yv);
                  let tobj = {
                    'kredi': yv , 'Puan': e.val().Donem_ort ,
                    'Harf':'DC' ,
                    'Harf_etkisi':1.5
                  }
                  this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
              }
              if(e.val().Donem_ort>=39.5&&e.val().Donem_ort<49.5)
              {
                this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DD');
                let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
                // console.log(yv);
                  let tobj = {
                    'kredi': yv , 'Puan': e.val().Donem_ort ,
                    'Harf':'DD' ,
                    'Harf_etkisi':1
                  }
                  this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
              }

              if(e.val().Donem_ort>=29.5&&e.val().Donem_ort<39.5)
              {
                this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FD');

                let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
                // console.log(yv);
                  let tobj = {
                    'kredi': yv , 'Puan': e.val().Donem_ort ,
                    'Harf':'FD' ,
                    'Harf_etkisi':0.5
                  }
                  this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
              }

              if(e.val().Donem_ort>=0&&e.val().Donem_ort<29.5)
              {
                this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FF');

                let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
                // console.log(yv);
                  let tobj = {
                    'kredi': yv , 'Puan': e.val().Donem_ort ,
                    'Harf':'FF' ,
                    'Harf_etkisi':0
                  }
                  this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
              }

            }
        if(s.val().Ders_Ortalamasi>=69.5&&s.val().Ders_Ortalamasi<79.5)
        {
          if(e.val().T_standart<24)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FF');
            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'FF' ,
                'Harf_etkisi':0
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
          }
          if(e.val().T_standart>=24&&e.val().T_standart<=28.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FD');
            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'FD' ,
                'Harf_etkisi':0.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
          }
          if(e.val().T_standart>=29&&e.val().T_standart<=33.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DD');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'DD' ,
                'Harf_etkisi':1
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
          }
          if(e.val().T_standart>=34&&e.val().T_standart<=38.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DC');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'DC' ,
                'Harf_etkisi':1.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
          }
          if(e.val().T_standart>=39&&e.val().T_standart<=43.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CC');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'CC' ,
                'Harf_etkisi':2
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
          }
          if(e.val().T_standart>=44&&e.val().T_standart<=48.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CB');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'CB' ,
                'Harf_etkisi':2.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
          }
          if(e.val().T_standart>=49&&e.val().T_standart<=53.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BB');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'BB' ,
                'Harf_etkisi':3
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
          if(e.val().T_standart>=54&&e.val().T_standart<=58.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BA');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'BA' ,
                'Harf_etkisi':3.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
          }
          if(e.val().T_standart>=59)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('AA');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'AA' ,
                'Harf_etkisi':4
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
        }

        ///////////////////////////////////////////////////////////

        if(s.val().Ders_Ortalamasi>62.5&&s.val().Ders_Ortalamasi<=70)
        {

          if(e.val().T_standart<26)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FF');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'FF' ,
                'Harf_etkisi':0
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
          if(e.val().T_standart>=26&&e.val().T_standart<=30.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FD');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'FD' ,
                'Harf_etkisi':0.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
          if(e.val().T_standart>=31&&e.val().T_standart<=35.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DD');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'DD' ,
                'Harf_etkisi':1
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
          }
          if(e.val().T_standart>=36&&e.val().T_standart<=40.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DC');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'DC' ,
                'Harf_etkisi':1.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
          if(e.val().T_standart>=41&&e.val().T_standart<=45.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CC');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'CC' ,
                'Harf_etkisi':2
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
          if(e.val().T_standart>=46&&e.val().T_standart<=50.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CB');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'CB' ,
                'Harf_etkisi':2.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
          if(e.val().T_standart>=51&&e.val().T_standart<=55.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BB');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'BB' ,
                'Harf_etkisi':3
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);
          }
          if(e.val().T_standart>=56&&e.val().T_standart<=60.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BA');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'BA' ,
                'Harf_etkisi':3.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
          if(e.val().T_standart>=61)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('AA');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'AA' ,
                'Harf_etkisi':4
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }

        }

////////////////////////////////////////////////////////////////////////////


if(s.val().Ders_Ortalamasi>57.5&&s.val().Ders_Ortalamasi<=62.5)
        {

          if(e.val().T_standart<28)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FF');


            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'FF' ,
                'Harf_etkisi':0
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


          }
          if(e.val().T_standart>=28&&e.val().T_standart<=32.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FD');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'FD' ,
                'Harf_etkisi':0.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


          }
          if(e.val().T_standart>=33&&e.val().T_standart<=37.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DD');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'DD' ,
                'Harf_etkisi':1
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
          if(e.val().T_standart>=38&&e.val().T_standart<=42.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DC');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'DC' ,
                'Harf_etkisi':1.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
          if(e.val().T_standart>=43&&e.val().T_standart<=47.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CC');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'CC' ,
                'Harf_etkisi':2
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


          }
          if(e.val().T_standart>=48&&e.val().T_standart<=52.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CB');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'CB' ,
                'Harf_etkisi':2.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
          if(e.val().T_standart>=53&&e.val().T_standart<=57.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BB');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'BB' ,
                'Harf_etkisi':3
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
          if(e.val().T_standart>=58&&e.val().T_standart<=62.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BA');


            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'BA' ,
                'Harf_etkisi':3.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);



          }
          if(e.val().T_standart>=63)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('AA');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'AA' ,
                'Harf_etkisi':4
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


          }

        }

////////////////////////////////////////////////////////////////////////////////////////////////////////




if(s.val().Ders_Ortalamasi>52.5&&s.val().Ders_Ortalamasi<=57.5)
        {

          if(e.val().T_standart<30)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FF');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'FF' ,
                'Harf_etkisi':0
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);



          }
          if(e.val().T_standart>=30&&e.val().T_standart<=34.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FD');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'FD' ,
                'Harf_etkisi':0.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);



          }
          if(e.val().T_standart>=35&&e.val().T_standart<=39.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DD');


            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'DD' ,
                'Harf_etkisi':1
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


          }
          if(e.val().T_standart>=40&&e.val().T_standart<=44.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DC');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'DC' ,
                'Harf_etkisi':1.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
          if(e.val().T_standart>=45&&e.val().T_standart<=49.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CC');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'CC' ,
                'Harf_etkisi':2
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


          }
          if(e.val().T_standart>=50&&e.val().T_standart<=54.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CB');


            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'CB' ,
                'Harf_etkisi':2.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


          }
          if(e.val().T_standart>=55&&e.val().T_standart<=59.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BB');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'BB' ,
                'Harf_etkisi':3
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
          if(e.val().T_standart>=60&&e.val().T_standart<=64.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BA');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'BA' ,
                'Harf_etkisi':3.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
          if(e.val().T_standart>=65)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('AA');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'AA' ,
                'Harf_etkisi':4
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);



          }

        }


///////////////////////////////////////////////


      if(s.val().Ders_Ortalamasi>47.5&&s.val().Ders_Ortalamasi<=52.5)
        {

          if(e.val().T_standart<32)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FF');


            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'FF' ,
                'Harf_etkisi':0
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


          }
          if(e.val().T_standart>=32&&e.val().T_standart<=36.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FD');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'FD' ,
                'Harf_etkisi':0.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


          }
          if(e.val().T_standart>=37&&e.val().T_standart<=41.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DD');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'DD' ,
                'Harf_etkisi':1
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);



          }
          if(e.val().T_standart>=42&&e.val().T_standart<=46.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DC');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'DC' ,
                'Harf_etkisi':1.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


          }
          if(e.val().T_standart>=47&&e.val().T_standart<=51.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CC');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'CC' ,
                'Harf_etkisi':2
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


          }
          if(e.val().T_standart>=52&&e.val().T_standart<=56.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CB');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'CB' ,
                'Harf_etkisi':2.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


          }
          if(e.val().T_standart>=57&&e.val().T_standart<=61.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BB');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'BB' ,
                'Harf_etkisi':3
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


          }
          if(e.val().T_standart>=62&&e.val().T_standart<=66.99)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BA');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'BA' ,
                'Harf_etkisi':3.5
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }
          if(e.val().T_standart>=67)
          {
            this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('AA');

            let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
            // console.log(yv);
              let tobj = {
                'kredi': yv , 'Puan': e.val().Donem_ort ,
                'Harf':'AA' ,
                'Harf_etkisi':4
              }
              this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

          }

        }


////////////////////////////////////////////////////////////////////////////////////////////////



if(s.val().Ders_Ortalamasi>42.5&&s.val().Ders_Ortalamasi<=47.5)
{

  if(e.val().T_standart<34)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FF');



    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'FF' ,
        'Harf_etkisi':0
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


  }
  if(e.val().T_standart>=34&&e.val().T_standart<=38.99)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FD');

    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'FD' ,
        'Harf_etkisi':0.5
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

  }
  if(e.val().T_standart>=39&&e.val().T_standart<=43.99)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DD');

    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'DD' ,
        'Harf_etkisi':1
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);



  }
  if(e.val().T_standart>=44&&e.val().T_standart<=48.99)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DC');

    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'DC' ,
        'Harf_etkisi':1.5
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


  }
  if(e.val().T_standart>=49&&e.val().T_standart<=53.99)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CC');

    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'CC' ,
        'Harf_etkisi':2
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


  }
  if(e.val().T_standart>=54&&e.val().T_standart<=58.99)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CB');

    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'CB' ,
        'Harf_etkisi':2.5
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

  }
  if(e.val().T_standart>=59&&e.val().T_standart<=63.99)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BB');


    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'BB' ,
        'Harf_etkisi':3
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


  }
  if(e.val().T_standart>=64&&e.val().T_standart<=68.99)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BA');

    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'BA' ,
        'Harf_etkisi':3.5
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


  }
  if(e.val().T_standart>=69)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('AA');

    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'AA' ,
        'Harf_etkisi':4
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

  }

}

///////////////////////////////////////////////////////////////////////////////////////////////////


if(s.val().Ders_Ortalamasi<=42.5)
{

  if(e.val().T_standart<36)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FF');


    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'FF' ,
        'Harf_etkisi':0
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

  }
  if(e.val().T_standart>=36&&e.val().T_standart<=40.99)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('FD');
    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'FD' ,
        'Harf_etkisi':0.5
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


  }
  if(e.val().T_standart>=41&&e.val().T_standart<=45.99)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DD');

    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'DD' ,
        'Harf_etkisi':1
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


  }
  if(e.val().T_standart>=46&&e.val().T_standart<=50.99)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('DC');

    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'DC' ,
        'Harf_etkisi':1.5
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


  }
  if(e.val().T_standart>=51&&e.val().T_standart<=55.99)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CC');

    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'CC' ,
        'Harf_etkisi':2
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


  }
  if(e.val().T_standart>=56&&e.val().T_standart<=60.99)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('CB');

    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'CB' ,
        'Harf_etkisi':2.5
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


  }
  if(e.val().T_standart>=61&&e.val().T_standart<=65.99)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BB');

    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'BB' ,
        'Harf_etkisi':3
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


  }
  if(e.val().T_standart>=66&&e.val().T_standart<=70.99)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('BA');


    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'BA' ,
        'Harf_etkisi':3.5
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);


  }
  if(e.val().T_standart>=71)
  {
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}/${e.key}/Harf_Notu`).set('AA');

    let yv=  this.Tc.myObj[`${this.Tc.get_Ders_adi()}`]['kredi'];
    // console.log(yv);
      let tobj = {
        'kredi': yv , 'Puan': e.val().Donem_ort ,
        'Harf':'AA' ,
        'Harf_etkisi':4
      }
      this.db.database.ref(`Averages/${this.get_date()}/${e.key}/${this.Tc.get_Ders_adi()}`).set(tobj);

  }

}

          }
        }
      })
    
    })
    
///////////////////////////////Ortalama Hesaplamasi ///////////////////////////////////////////
// console.log('Averages');


let sum_kredi = 0;
let kredicarpietkisi= 0;



this.db.database.ref(`Averages/${this.get_date()}`).once('value',snap=>{

snap.forEach(a=>{
 // console.log(a.key); 160201099 ...
 let ic=0;
 this.t_obj = new Observable<yobj>(obs=>{
 a.forEach(e=>{
   if(e.key==='Average') ic++;
 if(e.key!='Average'){
// console.log(e.key); // average , algo , algo22 ,algo33
ic++;
//console.log(e.val().Harf_etkisi);

// console.log('child '+ a.numChildren());
sum_kredi+= Number(e.val().kredi);
 kredicarpietkisi+=e.val().kredi*e.val().Harf_etkisi;
 if(a.numChildren()===ic){
   var t = kredicarpietkisi/sum_kredi;
// obs.next(new yobj(sum_kredi,Math.round(t*100)/100 , a.key));
obs.next(new yobj(sum_kredi,t , a.key));
sum_kredi=0;
kredicarpietkisi=0;
}
}
})
})
this.t_obj.subscribe(k=>{
  let y= 0;
if(k.tyoplam.toString()!='NaN')
{
console.log('after observer '+ k.tyoplam + ' '+ k.tkredi);

  let objson = {
    'Genel_Ortalama':k.tyoplam  , 'Toplam_Kredi':k.tkredi // butun alindi krediler butun donemlerde
  }
   // console.log('bitkiiiiiiiiiiiiiiiiiiiiim     artik '+k.tkredi+' '+k.tyoplam+' '+k.id);
  this.db.database.ref(`Averages/${this.get_date()}/${k.id}/Average`).set(objson);
  console.log(`Averages/${this.get_date()}/${k.id}/Average`);

}
}
)
 })
})

  }

imgclick()
{
this.Zone.run(()=>{

  this.router.navigate(['sheet'],{relativeTo:this.Route});
});
}
chart()
{
  this.Zone.run(()=>{
  this.router.navigate(['chart'],{relativeTo:this.Route});
  });
}





}
