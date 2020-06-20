import { Component, OnInit, NgZone } from '@angular/core';
import * as $ from 'jquery';
import { AngularFireDatabase } from '@angular/fire/database';
import { StudentsecService } from '../../student/ogrencisayfasi/studentsec.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { last, takeLast, take, map } from 'rxjs/operators';
import { SSL_OP_PKCS1_CHECK_2 } from 'constants';
import { async } from '@angular/core/testing';
import { IdarikismiComponent } from '../idarikismi.component';
class A{
  id:any;
  kredi:any;
  Avg:any;
Ogretim:any;
  constructor(id:any,Avg:any,kredi:any,O:any)
  {
    this.id=id;
    this.kredi=kredi;
    this.Avg=Avg;
    this.Ogretim=O;
  }
}
interface DONEM {
  value: string;

}
/////////////
class genel_hesap{
  id:any;
  Kredi:any;
  genel_ortalama:any;
}


@Component({
  selector: 'app-menu-idari',
  templateUrl: './menu-idari.component.html',
  styleUrls: ['./menu-idari.component.scss']
})
export class MenuIdariComponent implements OnInit {
static x:number;
  var:any;
  Donem:DONEM[] = [
    {value: 'GUZ'},
    {value: 'BAHAR'},
  ];
secim:Observable<boolean>;
s3:any[]=[];
s2:any[]=[];
s:any[]=[];
st:any;
Obler:Observable<A[]>;
P:Promise<any>;
kt:any[]=[];
bh:BehaviorSubject<any[]>;
 constructor(private db:AngularFireDatabase , private std:StudentsecService ,
    private router:Router , private route:ActivatedRoute
    , private zone:NgZone , private http:HttpClient) {



    }
f1():Observable<A>
{




  let c=0;
      let yilc=0;
      let donemc=0;
      let ogretimc=0;
      let numarac=0;


   return   new Observable<A>(obs=>{
      this.P=this.db.database.ref('Siciller').once('value',sc=>{
        c++;
        sc.forEach(yil=>{
          yilc++;

          console.log('yil '+yil.key) //yil
          yil.forEach(donem=>{

            console.log('Donem '+donem.key) // Donem

            donem.forEach(Ogretim=>{
              donemc++;

              console.log('Ogretim '+Ogretim.key); // Ogretim

              Ogretim.forEach(numara=>{
                ogretimc++;

                console.log('numara '+numara.key); // numara
              this.s3.push(numara.key);

                  this.db.database.ref(`Siciller/${yil.key}/${donem.key}/${Ogretim.key}/${numara.key}/Average`).once('value',sp2=>{

              if(sp2.exists())
                obs.next(new A(numara.key,sp2.val().Genel_Ortalama,sp2.val().Toplam_Kredi, Ogretim.key));


                })




                   })

            })
          })
              })
             }).catch(e=>{

             })
       });


}

s33:any[]=[];
kb:number=0;
fs33(u:any[])
{

  if(this.kb===0&&u[0]!==undefined)
  {
    this.s33.push(u);
    console.log('from func '+ u['160201099']);
    this.kb++;
  }
}

  async ngOnInit() {
let yb = $('#But');
this.db.database.ref('But').once('value',sp=>{
if(sp.exists())
{
if(sp.val() === 'true')
{
  yb.text('Bütünleme Kapat');
}
else {yb.text('Bütünleme Başlat')};

}
else {yb.text('Bütünleme Başlat')};

});

 console.log('static from '+ IdarikismiComponent.id);


if(IdarikismiComponent.id===undefined)
{
  this.router.navigate(['../'],{relativeTo:this.route});
}


    //////////////////////////////////////
  this.db.database.ref('secim').once('value',p=>{


    if(!p.exists())
    {
      this.db.database.ref('secim').set(false);
      $('#sec').text('Ders Secim Acma');
    }
    else
    {
     if(p.val()===false)
     {
      $('#sec').text('Ders Secim Acma');
     }
     else
     {
      $('#sec').text('Ders Secim Kapatma');
     }

    }
  })

  }
async get_Donem(i:any)
{console.log('aloooooo'+i)
 await this.db.database.ref('AlinmisDersler').remove();

 await this.db.database.ref('Averages').remove();
 await  this.db.database.ref('Donem').set(i);
//  await this.db.database.ref('table').remove();
}
  public secimacma()
  {

this.zone.run(()=>{


 let t =  $('#sec').text();
   console.log(t);
  if(t==='Ders Secim Acma')
  {
    console.log('girdi');
    $('#sec').text('Ders Secim Kapatma');
     this.db.database.ref('secim').set(true);
  }
  else
  {
    $('#sec').text('Ders Secim Acma');
     this.db.database.ref('secim').set(false);
  }

})

  }

  async Hesap()
  {

  await  this.get_semesters();

await this.sonhesap('BAHAR','IOgretim');
await this.sonhesap('GUZ','IOgretim');
await this.sonhesap('BAHAR','IIOgretim');
await this.sonhesap('GUZ','IIOgretim');


await this.Genel_Ortalama_donem_Ortalamalardan_getirme('GUZ','IOgretim');
await this.Genel_Ortalama_donem_Ortalamalardan_getirme('BAHAR','IOgretim');


await this.Genel_Ortalama_donem_Ortalamalardan_getirme('GUZ','IIOgretim');
await this.Genel_Ortalama_donem_Ortalamalardan_getirme('BAHAR','IIOgretim');






  }

 sem =[];
 List:genel_hesap[]=[];

 async get_semesters()
 {
  this.sem.length=0;


  ////////////////////get all semisters
await this.db.database.ref('Siciller').once('value',sp=>{

sp.forEach(e=>{
if(e.key!=='Avgsler'){
// console.log(e.key);
this.sem.push(e.key);//2019-2020 ...

}

});

});
 }
 async sonhesap(donem:string,ogretim:string){




let tpkredi = 0;
let Genel_Ortalamam = 0;
this.sem.forEach(r=>
  {

    /////////
    this.db.database.ref(`Siciller/${r}/${donem}/${ogretim}`).once('value',sp=>{

    sp.forEach( e=>{ // id'ler e.key

let id = e.key;
//console.log('id= '+id);
let c= 0;
 e.forEach(e2=>{
 // console.log('numchild '+e.numChildren());

  c++;
  if(e2.key!=='Average'&&e2.val().Harf!==""||e2.val().Harf!==undefined)
  {
    // console.log(e2.val().Kredi);
    tpkredi+=Number(e2.val().Kredi);
    Genel_Ortalamam+=Number(e2.val().Kredi*e2.val().Harf_etkisi);
    //console.log('kredies  '+tpkredi);
  }
  if(c==e.numChildren()){

    let ojson = {'Genel_Ortalama':Genel_Ortalamam,'Toplam_Kredi':tpkredi};
    this.db.database.ref(`Siciller/${r}/${donem}/${ogretim}/${id}/Average`).set(ojson);
    //console.log(tpkredi+'  '+Genel_Ortalamam);

    tpkredi =0;
    Genel_Ortalamam=0;
  }
})




    });

    });

  });
  }


async Genel_Ortalama_donem_Ortalamalardan_getirme(donem:any,ogretim:any)
{

let student_numbers=[];
let donemlik =['GUZ','BAHAR'];

 for(let i=0;i<this.sem.length;i++)
{

 await  this.db.database.ref(`Siciller/${this.sem[i]}/${donem}/${ogretim}`).once('value', sp=>{
 if(sp.exists())
  sp.forEach( e=>{ // id'ler e.key

  let id = e.key;
  // console.log('id '+id);

 student_numbers.push(id);
});

});
}

// student_numbers.forEach(r=>{
//   console.log('element '+r);
// });





let tpkredi=0;
let tpx = 0;
  for(let j=0;j<student_numbers.length;j++){
    for(let i=0;i<this.sem.length;i++)
{
  for(let c = 0;c<donemlik.length;c++){
 await  this.db.database.ref(`Siciller/${this.sem[i]}/${donemlik[c]}/${ogretim}/${student_numbers[j]}`).once('value', sp=>{
if(sp.exists())
 sp.forEach(e=>{

if(e.key==='Average')
// console.log('id '+ student_numbers[j]+' - '+e.val().Genel_Ortalama+' '+e.val().Toplam_Kredi);
{
tpkredi+=Number(e.val().Toplam_Kredi);
console.log(`Siciller/${this.sem[i]}/${donemlik[c]}/${ogretim}/${student_numbers[j]}`);
 console.log('every donem kredisi '+e.val().Toplam_Kredi);
tpx +=Number(e.val().Genel_Ortalama);

}
 });

});

  }


  console.log('toplam kredi '+tpkredi+' Genel carpim'+ tpx);
  let yaklasim = Math.round((tpx/tpkredi)*100)/100;
  let avgsobj = {'Genel_Ort':yaklasim,'avg':tpx,'kredi':tpkredi};
  this.db.database.ref(`Siciller/Avgsler/${ogretim}/${student_numbers[j]}`).set(avgsobj);
tpkredi=0;
tpx = 0;
}


  }
}

public But()
{let yb = $('#But').text();
  this.db.database.ref('But').once('value',sp=>{
  if(sp.exists()){
    console.log(sp.val());
    if(yb==='Bütünleme Başlat')
    {
  $('#But').text('Bütünleme Kapat');
  this.db.database.ref('But').set('true');
    }
    else{
      $('#But').text('Bütünleme Başlat');
      this.db.database.ref('But').set('false');
    }
  }
  else
  if(!sp.exists())
  {
    $('#But').text('Bütünleme Kapat');
    this.db.database.ref('But').set('true');
  }
  });
}


}
