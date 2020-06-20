import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, observable } from 'rxjs';
import { IslerserviceService } from '../islerservice.service';
import * as $ from 'jquery';
/////////////////

class siciller{
 private ders:string;
  private kredi:string;
  private harf:string;
  private donem:string;
  constructor(ders:string,kredi:string,harf:string,donem:string){
    this.ders=ders;
    this.kredi=kredi;
    this.harf=harf;
    this.donem = donem;
  }
}


@Component({
  selector: 'app-sonuclar',
  templateUrl: './sonuclar.component.html',
  styleUrls: ['./sonuclar.css']
})
export class SonuclarComponent implements OnInit {
 

donemler:any[] = [];
sc:siciller[]=[];
years:any[]=[];///get years
TpOrtalam:string='';
TpKredi:string='';
Dortala:any[]=[];
Dkredi:any[]=[];
constructor(private router: Router , private activerouter: ActivatedRoute, 
  private db:AngularFireDatabase , private Is:IslerserviceService) {

   


   
    
   
    
  
  }
  
  
 async  ngOnInit() {
  await this.get_Genel_Ortalama();
await this.get_years();
await this.get_Data('GUZ');
await this.get_Data('BAHAR');

}
get_Ogretim():string
{
  let ogretim = '';
if(this.Is.get_id()[5]==='1')
{
 ogretim = 'IOgretim';
}
else
{
ogretim = 'IIOgretim';
}
return ogretim;
}
async get_Genel_Ortalama()
{
  let ogrt = this.get_Ogretim();
  console.log(`Siciller/Avgsler/${ogrt}/${this.Is.get_id()}`);
 await  this.db.database.ref(`Siciller/Avgsler/${ogrt}/${this.Is.get_id()}`).once('value',sp=>{

  
      console.log(sp.val().kredi)
      this.TpKredi+= sp.val().kredi;
      this.TpOrtalam+= sp.val().Genel_Ort;
   
  });

}
public async get_years()
{
  await this.db.database.ref('Siciller').once('value',sp=>{

    sp.forEach(e=>{
    if(e.key!='Avgsler')
    this.years.push(e.key)
    });
    });
}

public async get_Data(donem:string)
{
  


////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
this.years.forEach(y=>{
this.db.database.ref(`Siciller/${y}/${donem}/${this.get_Ogretim()}/${this.Is.get_id()}`).once('value',sp=>{
  this.donemler.push(donem);
sp.forEach(e=>{
  if(e.key==='Average')
  {
    let db = e.val().Genel_Ortalama;
    let tpk = e.val().Toplam_Kredi;
    let tpp =Math.round((db/tpk)*100)/100;
    this.Dortala.push(tpp);
    this.Dkredi.push(tpk);
  }
 if(e.val().Harf!==''&&e.val().Harf!==undefined)
 {
   //console.log(e.key);
   this.sc.push(new siciller(e.key,e.val().Kredi,e.val().Harf,donem));
 }
})


});



  });

}
  public geri() {
    this.router.navigate(['../../'], { relativeTo: this.activerouter });
  }
  public extra() {
    alert('ikinci donemde yasamaya devam etsem devam ederim');
  }
 

printf()
{
  window.print();
}

}
