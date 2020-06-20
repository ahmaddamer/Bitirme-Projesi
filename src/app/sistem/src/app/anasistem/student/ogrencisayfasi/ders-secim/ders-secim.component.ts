import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentsecService } from '../studentsec.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import * as $ from 'jquery';
import { TeachersecService } from 'src/app/teachersec.service';
import { FirebaseDatabase } from '@angular/fire';
class DersSecim{
  public id:any;
  public name:any;
  constructor(id:any,name:any)
  {
    this.id=id;
    this.name=name;

  }
}
class alinmisDersler
{
  private Ders:string;
  private Dr:string;
  private  kredi:string;
  private saat:string;
  private yil:string;
  private OgrenciSayisi:string;
  private id:string;
  constructor(ders:string,dr:string,kredi:string,saat:string,yil:string,alan:string,id:string)
  {
    this.Ders=ders;
    this.Dr=dr;
    this.kredi=kredi;
    this.saat=saat;
    this.yil=yil;
    this.OgrenciSayisi=alan;
    this.id=id;
  }
   get_ders():string
  {
    return this.Ders;
  }
}
@Component({
  selector: 'app-ders-secim',
  templateUrl: './ders-secim.component.html',
  styleUrls: ['./style.css']
})
export class DersSecimComponent implements OnInit {
  items: Observable<alinmisDersler[]>;
 id:any;
 Dersler:alinmisDersler[]=[];
 Obj:alinmisDersler;
 Ders:Observable<any[]>;
 Acik:number=0;
 Basarili:Observable<boolean[]>;
 Names:any[]=[];
 Harflar:Observable<string[]>;
 gecici:number;
 gosterilmeyen_Ders:boolean[];
 gecismis_dersler:Observable<string[]>;
 get_yil:Observable<string>;
 getdonem:Observable<any>;
 ogretim_t:Observable<any>;
 tempt:alinmisDersler[]=[];
 fullOgrenciSayisi:any[]=[];
 btnlar:any[]=[];
 public get_date():string
{
  var d = new Date();
  var n = d.getFullYear();
   return (n-1)+'-'+n;
}
 constructor(private db:AngularFireDatabase , private router:Router ,



  private route:ActivatedRoute , private st:StudentsecService ,
    private zone: NgZone , private Tc: TeachersecService ) {


      if(this.st.get_id()==undefined)
      {
        this.router.navigate(['../../'],{relativeTo:this.route});
      }


  let ttp = [];
new Observable<any[]>(obs=>{
this.db.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}`).once('value',sop=>{
  sop.forEach(e=>{
    // ttp.push(e.val().fullOgrenciSayisi);
    ttp[`${e.val().Ders}`]=e.val().fullOgrenciSayisi;
    // console.log('xx'+e.val().fullOgrenciSayisi);
  })
  obs.next(ttp);
})
}).subscribe(k=>{
  this.fullOgrenciSayisi = k;
// this.fullOgrenciSayisi.push(k);

})

/////////////////////////////////////////////////

this.get_yil = new Observable<string>(obs=>{
  this.db.database.ref(`Ogrenciler/${this.st.get_id()}/yil`).once('value',p=>{
    obs.next(p.val());
  })
})
// this.get_yil.subscribe(k=>{
//   console.log('yil '+k);
// })

      ////////////////////////////////////////////////////////
 let getidersler:string[]=[];
 this.gecismis_dersler = new Observable<string[]>(obs=>{
      this.db.database.ref('Donem').once('value',sp=>{

        this.db.database.ref(`Ogrenciler/${this.st.get_id()}/Ogretim`).once('value',Ogretim=>{




          this.db.database.ref(`Siciller/${this.get_date()}/${this.st.get_Donem()}/${sp.val()}/${Ogretim.val()}/${this.st.get_id()}`).once('value',sp2=>{
           if(sp2.exists()){
            sp2.forEach(a=>{
            if(a.key!=='Average'){
              //  console.log('dis '+a.key); //algo , algo22 , algo33
           if(a.val().Harf!='FD'&&a.val().Harf!=='FF'&&a.val().Harf!=="DD"&&a.val().Harf!==undefined)
           {
            console.log(a.key);
            getidersler.push(a.key);
           }
            }
            })
          }
          }).then(()=>{

            obs.next(getidersler);

          })
        })


        })

  })


      let c=0;
    let kt=0;
      this.items = new Observable<alinmisDersler[]>(obs=>{

        this.gecismis_dersler.subscribe(k=>{

      console.log('inside subscribe');
    this.db.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}`).once('value',p=>{
     this.tempt.length=0;
      p.forEach((a)=>{
        if(kt===1)
        {
          kt=0;

        }
      c++;
        //  console.log('sub'+ a.val().Ders); // tabledeki Butun Dersler getirdi

         if(k.includes(a.val().Ders)===false)
          { //(ders:string,dr:string,kredi:string,saat:string,yil:string,alan:string,id:string)
           this.tempt.push(new alinmisDersler(a.val().Ders , a.val().Dr , a.val().kredi ,a.val().saat ,a.val().yil
            ,a.val().OgrenciSayisi , this.st.get_id()));

            console.log('sayisi '+a.val().OgrenciSayisi);
         }
         console.log(p.numChildren());

         if(p.numChildren()===c)
         {
           obs.next(this.tempt);

         }

      })
    })

    })

  });

  let tiri:boolean[]=[]
  new Observable<any[]>(obs=>{
  this.db.database.ref(`AlinmisDersler/${this.get_date()}/${this.st.get_id()}`).once('value',al=>{

    if(al.exists())
    {

al.forEach(e=>{
  tiri[`${e.val().Ders}`]=true;
})
obs.next(tiri);

    }
  })
}).subscribe(k=>{
this.btnlar = k;
})





      this.gecici = 0;


      this.id=st.get_id();


  setInterval(()=>{
    this.c_t();
  },1000)


  }



/**
 * geri
 */
public geri() {
  this.zone.run(() => {
  return   this.router.navigate(['../'],{relativeTo:this.route});
  });
}




  async ngOnInit() {


      if(this.st.get_id()===undefined)
    {
      this.zone.run(async ()=>{
       await this.router.navigate(['../'],{relativeTo:this.route});
      })

    }




console.log('my '+ this.st.get_Donem()+' '+this.st.get_Ogretim_Turu());

    /////////////////////////////
    let t_y=[]=[];
    let Ogretim_turu = '';
    this.Harflar= new Observable<string[]>((obs)=>{
 this.db.database.ref(`Ogrenciler/${this.st.get_id()}`).once('value',snap=>{
   Ogretim_turu=snap.val().Ogretim;


  this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${Ogretim_turu}`).once('value',snap2=>{
    if(snap2.exists())
   {
    snap2.forEach(a=>{
      // console.log(a.key); algo , algo22 , algo33 .....etcx



      this.db.database.ref(`AlinmisDersler/${this.get_date()}/basariliBasarsiz/${Ogretim_turu}/${a.key}/${this.st.get_id()}`).once('value',snap3=>{
    // console.log(snap3.val().Harf_Notu);
    if(snap3.exists())
    if(snap3.val().Harf_Notu!=='FD'&&snap3.val().Harf_Notu!=='FF')
    t_y.push(a.key);

      }).then(()=>{
        //After ForeEach
         obs.next(t_y);

      })


    })
   }
 })
})
})




    this.Ders = this.db.list(`AlinmisDersler/${this.get_date()}/${this.st.get_id()}`).valueChanges();

    // this.Table = new Observable<Tablo[]>((obs)=>{
    //   this.db.database.ref('table').once('value',m=>{
    //  m.forEach(e=>{
    //   // console.log('table' , e.val().Ders);
    //   let c=0;
    //   this.Harflar.subscribe(k=>{

    //     k.forEach(el=>{
    //      if(el===e.val().Ders)
    //      {
    //       c=1;
    //      }
    //    })
    //   })
    //  })

    //   })
    // });
    // this.Table.subscribe(k=>{

    // })


    this.db.database.ref('secim').once('value', element=>{
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
  this.zone.run(() => { return this.router.navigate(["DersSecim"],{relativeTo:this.route});});


 }

  public b_func(i:any)
  {


    const t=$('td button').eq(i).text().toString();

    const ders=$(`tr:eq(${i+1}) td:eq(0)`).text().toString().trim();
    const dr=$(`tr:eq(${i+1}) td:eq(1)`).text().toString().trim();
    const kredi=$(`tr:eq(${i+1}) td:eq(2)`).text().toString().trim();
    const saat=$(`tr:eq(${i+1}) td:eq(3)`).text().toString().trim();
    const yil=$(`tr:eq(${i+1}) td:eq(4)`).text().toString().trim();
    const Alan_sayisi=$(`tr:eq(${i+1}) td:eq(5) span`).text().toString().trim();
    if(t.trim()==='Ekleme'.trim())
    { $('td button').
    eq(i).text('Silme').
    toggleClass('btn btn-primary')
    .toggleClass('btn btn-danger');
    this.Obj = new alinmisDersler(ders,dr,kredi,saat,yil,Alan_sayisi,this.st.get_id());

    this.Dersler.push(this.Obj);
    $(`tr:eq(${i+1}) td:eq(5) span`).text((Number($(`tr:eq(${i+1}) td:eq(5) span`).text())-1).toString());

    // this.db.database.ref(`table`).once('value',spp=>{
    //   spp.forEach(a=>{
    //     // console.log('boyraz'+a.val().Ders);
    //     if(a.val().Ders===ders)
    //     {
    //       // console.log(a.key);
    //       this.db.database.ref(`table/${a.key}/OgrenciSayisi`).set(a.val().OgrenciSayisi-1).then(()=>{

    //       })
    //     }
    //   })
    // })



    }
    else if(t.trim()==='Silme'.trim())
    {
    $('td button').eq(i).text('Ekleme').
    toggleClass('btn btn-danger').
    toggleClass('btn btn-primary');

    $(`tr:eq(${i+1}) td:eq(5) span`).text((Number($(`tr:eq(${i+1}) td:eq(5) span`).text())+1).toString());
    // this.db.database.ref(`table`).once('value',spp=>{
    //   spp.forEach(a=>{
    //     // console.log('boyraz'+a.val().Ders);
    //     if(a.val().Ders===ders)
    //     {
    //       // console.log(a.key);

    //       this.db.database.ref(`table/${a.key}/OgrenciSayisi`).set(a.val().OgrenciSayisi+1);
    //     }
    //   })
    // })
    this.Dersler.forEach((a,index)=>{
    if(a.get_ders()===ders)
    {
      // this.db.database.ref('AlinmisDersler/${this.get_date()}/'+this.id+'/'+i).set(this.Dersler);
    this.Dersler.splice(index,1);
    // AlinmisDersler/2019-2020/IOgretim/algo/160201099
    this.db.database.ref(`Ogrenciler/${this.st.get_id()}/Ogretim`).once('value',sp=>{
      this.db.database.ref(`AlinmisDersler/${this.get_date()}/${sp.val()}/${ders}/${this.st.get_id()}`).remove();
      // console.log(sp.val());
    })
    // console.log('show '+`AlinmisDersler/${this.get_date()}/${this.st.get_Ogretim_Turu()}/${ders}/${this.st.get_id()}`);


  }
})

    }


    this.db.database.ref(`AlinmisDersler/${this.get_date()}/`+this.id).set(this.Dersler);
    this.db.database.ref(`AlinmisDersler/${this.get_date()}/`+this.id+'/Onay/').set(false);
  }

  public onay()
  {

    // $(`tr:eq(${i+1}) td:eq(5)`).text((Number($(`tr:eq(${i+1}) td:eq(5)`).text())+1).toString());
let L = $('tr').length;
let bx:any[]=[];
for(let i=1;i<L;i++)
{
// console.log($(`tr:eq(${i}) td:eq(0)`).text()+'  '+$(`tr:eq(${i}) td:eq(5)`).text());
let ders_adi = $(`tr:eq(${i}) td:eq(0)`).text();
let sayi = $(`tr:eq(${i}) td:eq(5) span`).text();
this.db.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}`).once('value',po=>{
  po.forEach(e=>{
    if(e.val().Ders===ders_adi)
    {
      this.db.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}/${e.key}/OgrenciSayisi`).set(sayi);
    }
  })
})
}


    this.db.database.ref(`AlinmisDersler/${this.get_date()}/`+this.id+'/Onay/').once('value',e=>{
      if(e.val()===false)
      {
         $('button:gt(1)').prop('disabled', true);
        this.db.database.ref(`AlinmisDersler/${this.get_date()}/`+this.id).set(this.Dersler);

        $('#onay').removeClass('btn btn-success').addClass('btn btn-danger').text('Onay kaldir');
          this.db.database.ref(`AlinmisDersler/${this.get_date()}/`+this.id+'/Onay/').set(true);
          this.db.database.ref('Onaylananlar').set(this.id);
      }
      else
      {
         $('button:gt(1)').prop('disabled', false);
        this.db.database.ref(`AlinmisDersler/${this.get_date()}/`+this.id).set(this.Dersler);
      $('#onay').removeClass('btn btn-danger').addClass('btn btn-success').text('Onay');

        this.db.database.ref(`AlinmisDersler/${this.get_date()}/`+this.id+'/Onay/').set(false);



        this.db.database.ref('Onaylananlar/'+this.id).remove();

      let L = $('tr').length;
      for(let i=1;i<L;i++)
      {
       let ders_ad= $(`tr:eq(${i}) td:eq(5) span`).text();
       let btn_text=$('button').eq(i+1).text();
       this.db.database.ref(`table/${this.st.get_date()}/${this.st.get_Ogretim_Turu()}/${this.st.get_Donem()}`).once('value',ore=>{
         ore.forEach(e=>{
           if(e.val().Ders===ders_ad.trim()&&btn_text.trim()==='Silme'){
           this.db.database.ref(`table/${e.key}/${ders_ad}`).set((Number(e.val().OgrenciSayisi)+1).toString().trim());

           }
         })
       })
      }



      }


    })
    if(this.id!==undefined)
    this.db.database.ref('Ogrenciler/'+this.id).once('value',snap=>{
      this.db.database.ref(`AlinmisDersler/${this.get_date()}/`+this.id+'/Ogretim').set(snap.val().Ogretim);
    });
    if(this.id!==undefined)
    this.db.database.ref('Ogrenciler/'+this.id).once('value',snap=>{
      this.db.database.ref(`AlinmisDersler/${this.get_date()}/`+this.id+'/name').set(snap.val().name);
    });
    if(this.id!==undefined)
    this.db.database.ref('Ogrenciler/'+this.id).once('value',snap=>{
      this.db.database.ref(`AlinmisDersler/${this.get_date()}/`+this.id+'/soyad').set(snap.val().surename);
    });





/////////////////////////////////


var e= setTimeout(() => {
  this.db.database.ref(`AlinmisDersler/${this.get_date()}/`+this.st.get_id()).once('value',sp=>{
    let t = sp.val().Ogretim;
  //  console.log('inside'+ t);
    sp.forEach(a=>{

    if(a.val().Ders!==undefined){
      this.db.database.ref('Ogrenciler/'+this.st.get_id()).once('value',iu=>{
        this.db.database.ref(`AlinmisDersler/${this.get_date()}/`+
        t+'/'+a.val().Ders+'/'+this.id).set(iu.val().name+' '+iu.val().surename);
      })



    }

    })
  })
}, 500);

console.log(`AlinmisDersler/${this.get_date()}/${this.st.get_id()}`);


////////////////////////////////////copy alinimis dersler bos durumunda /////////////////////



this.get_Ogretim().subscribe(kogretim=>{
  //console.log('Observer '+kogretim);


this.db.database.ref(`AlinmisDersler/${this.get_date()}/${this.st.get_id()}`).once('value',op=>{


   op.forEach(e=>{
      if(e.val().Ders!==undefined)
     {
      console.log(op.val().Ogretim);
     console.log('dersler'+e.val().Ders);

  //   Siciller/2019-2020/BAHAR/IOgretim/160201099/algo

      this.get_donem().subscribe(donemi=>{
        let tobj ={
          'Final':'','vize':'' ,'proje':'' ,
          'Dr': e.val().Dr , 'kredi': e.val().kredi
        }
        console.log(`Siciller/${this.get_date()}/${donemi}/${kogretim}/${this.st.get_id()}/${e.val().Ders}`);
  this.db.database.ref(`Siciller/${this.get_date()}/${donemi}/${kogretim}/${this.st.get_id()}/${e.val().Ders}`).set(tobj);

})

     }
   })

 })
})
  }
  t()
  {


this.db.database.ref(`AlinmisDersler/${this.get_date()}/${this.st.get_id()}/Onay`).once('value',e=>{


  if(e.val()===false||e.val()===null)
    {
       $('button:gt(1)').prop('disabled', false);
      // this.db.database.ref('AlinmisDersler/${this.get_date()}/'+this.id).set(this.Dersler);

      $('#onay').addClass('btn btn-success').removeClass('btn btn-danger').text('Onay');
        // this.db.database.ref('AlinmisDersler/${this.get_date()}/'+this.id+'/Onay/').set(true);
    }
    else
    {
      this.get_ders();
       $('button:gt(1)').prop('disabled', true);

     $('#onay').addClass('btn btn-danger').removeClass('btn btn-success').text('Onay kaldir');


    }



})
this.Dersler=[];
for(let i=0;i<$('button').length-1;i++){
let ders=$(`tr:eq(${i+1}) td:eq(0)`).text().toString().trim();
let dr=$(`tr:eq(${i+1}) td:eq(1)`).text().toString().trim();
let kredi=$(`tr:eq(${i+1}) td:eq(2)`).text().toString().trim();
let saat=$(`tr:eq(${i+1}) td:eq(3)`).text().toString().trim();
let yil=$(`tr:eq(${i+1}) td:eq(4)`).text().toString().trim();
let Alan_sayisi=$(`tr:eq(${i+1}) td:eq(5) span`).text().toString().trim();
let btn_text=$('button').eq(i+2).text();

if(btn_text==='Silme')
{
  this.Obj = new alinmisDersler(ders,dr,kredi,saat,yil,Alan_sayisi,this.st.get_id());
  if(this.Dersler.indexOf(this.Obj)===-1)
   this.Dersler.push(this.Obj);
}


}







  }
  get_Ogretim():Observable<any>
  {
   return  new Observable<any>(ob=>{
      this.db.database.ref(`Ogrenciler/${this.st.get_id()}`).once('value', op=>{

        // console.log(op.val().Ogretim);
     ob.next(op.val().Ogretim);
     });
    })

  }

  public c_t()
{


    this.t();


}
get_ders()
{
  this.db.database.ref(`AlinmisDersler/${this.get_date()}/${this.st.get_id()}`).once('value',e=>{
  e.forEach(e2=>{
    for(let i=0;i<$('tr').length;i++){
    var ders=$(`tr:eq(${i+1}) td:eq(0)`).text().toString().trim();

    if(ders===e2.val().Ders)
    {
     // console.log(ders);
      $('button').eq(i+2).removeClass('btn btn-primary').addClass('btn btn-danger').text('Silme');
    }
    }
  })

  })
}

get_donem():Observable<any>
{

  this.getdonem = new Observable(obs=>{
    this.db.database.ref('Donem').once('value',sp=>{
      obs.next(sp.val());
    })
  })

return this.getdonem;
}

public cikis()
{
  this.zone.run(()=>{
    this.st.set_id(undefined);
this.router.navigate(['../../',{relativeTo:this.route}]);
  });
}

}
