import {Component, OnInit, ViewChild, NgZone} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AngularFireDatabase } from '@angular/fire/database';
import { StudentsecService } from '../studentsec.service';
import {MatDialog} from '@angular/material/dialog';
import { DersdetayComponent } from './dersdetay/dersdetay.component';
import { Router, ActivatedRoute } from '@angular/router';

////////////////////////////
interface Donem {
  viewValue: string;
}
@Component({
  selector: 'app-alinan-dersler',
  templateUrl: './alinan-dersler.component.html',
  styleUrls: ['./alinan-dersler.component.scss']
})




export class AlinanDerslerComponent implements OnInit {
selectedValue: string;
D_Avg = 0;
T_Avg =0;
N_D_Avg=0;
N_T_Avg = 0;
N_T_Kredi =0;
T_Kredi = 0;
//////////////

Genel_ortalama = 0;
Toplam_kredi = 0;
///////////////////
static donemandyear:string='';
static justdonem='';
static justyear='';
///////////////////
  Donemler:Donem [] = [
    { viewValue: '2019-2020/BAHAR'},
    { viewValue: '2019-2020/GUZ'},
  ];

  animal: string;
  name: string;
  displayedColumns: string[] = ['position', 'Ders', 'Kredi', 'Harf','Note'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
//////////////////

public get_Ogretim():string
{let ogretim = '';
if(this.st.get_id()[5]==='1')
{
  ogretim = 'IOgretim';
}
else
ogretim = 'IIOgretim';
return ogretim;
}


constructor(private fb:AngularFireDatabase ,
  private st:StudentsecService,public dialog: MatDialog,private router:Router, private route:ActivatedRoute,private zone:NgZone){
console.log('selected value = '+this.selectedValue);
//////////////////////////////////////////////////////////

}
openDialog(e:any): void {
  // console.log('Ders '+e.Ders);
  const dialogRef = this.dialog.open(DersdetayComponent, {
    width: '75%',
    height:'80%',
    data: {obj: e,id:this.st.get_id(),donem:AlinanDerslerComponent.donemandyear,ogretim:this.get_Ogretim()}
  });

  // dialogRef.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
  //   this.animal = result;
  // });
}
////////////////////////////////////////////////////////////
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

   async ngOnInit() {

    // if(this.st.get_id()===undefined)
    // {
    //    this.zone.run( ()=>{
    //      this.router.navigate(['../'],{relativeTo:this.route});
    //    })

    // }
    this.N_D_Avg=0;
   this. N_T_Avg = 0;
    this.N_T_Kredi =0;
    this.T_Kredi =0;
    ELEMENT_DATA.length = 0;
    let a='';
    let cc = 0;
  //  ELEMENT_DATA.push({position:1,Ders:'ahmed',Kredi:2,Harf:'AA',Note:'90'});

let ogretim = '';
if(this.st.get_id()[5]==='1')
{
  ogretim = 'IOgretim';
}
else
ogretim = 'IIOgretim';


await this.fb.database.ref(`Siciller/Avgsler/${ogretim}/${this.st.get_id()}`).once('value',sp=>{
if(sp.exists())
sp.forEach(e=>{
  if(e.exists()){
  this.Genel_ortalama = sp.val().Genel_Ort;
  this.Toplam_kredi = sp.val().kredi;
  }
})

});


 await this.fb.database.ref(`Siciller/2019-2020/BAHAR/${ogretim}/${this.st.get_id()}`).
       once('value', sp => {
         sp.forEach(e => {
           if (e.key !== 'Average') {
             cc++;

             if (e.val().Final === '')
               ELEMENT_DATA.push({
                 position: cc, Ders: e.key, Kredi: e.val().kredi, Harf: e.val().Harf,
                 Note: e.val().Donem_ort
               });
             else{
               ELEMENT_DATA.push({
                 position: cc, Ders: e.key, Kredi: e.val().Kredi, Harf: e.val().Harf,
                 Note: e.val().Donem_ort


                });

                this.N_T_Kredi+=Number(e.val().Kredi);
                this.N_T_Avg +=Number(e.val().Kredi*e.val().Harf_etkisi);
              }
           }
         });
       });
//console.log('keys '+ a);

  this.dataSource = new MatTableDataSource(ELEMENT_DATA);
let T_Avg_t =Math.round ((this.N_T_Avg/this.N_T_Kredi)*100)/100;
if(this.N_T_Kredi===0)
T_Avg_t = 0;
  this.D_Avg = T_Avg_t;
  this.T_Kredi = this.N_T_Kredi;
  //  dataSource =



  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

async fp(donem:any)
{
  AlinanDerslerComponent.donemandyear = donem.toString();
  AlinanDerslerComponent.justyear = AlinanDerslerComponent.donemandyear.substring(0,AlinanDerslerComponent.donemandyear.indexOf('/'));
  AlinanDerslerComponent.justdonem = AlinanDerslerComponent.donemandyear.substring(AlinanDerslerComponent.justyear.length,AlinanDerslerComponent.donemandyear.length);

  console.log('from fp '+ donem);
  ELEMENT_DATA.length = 0;
  this.N_D_Avg=0;
   this. N_T_Avg = 0;
    this.N_T_Kredi =0;
    this.T_Kredi = 0;
    let a='';
    let cc = 0;
  //  ELEMENT_DATA.push({position:1,Ders:'ahmed',Kredi:2,Harf:'AA',Note:'90'});
//
let ogretim = '';
if(this.st.get_id()[5]==='1')
{
  ogretim = 'IOgretim';
}
else
ogretim = 'IIOgretim';

await this.fb.database.ref(`Siciller/${this.selectedValue}/${ogretim}/${this.st.get_id()}`).
       once('value', sp => {
         sp.forEach(e => {
           if (e.key !== 'Average') {
             cc++;

             if (e.val().Final === '')
               ELEMENT_DATA.push({
                 position: cc, Ders: e.key, Kredi: e.val().kredi, Harf: e.val().Harf,
                 Note: e.val().Donem_ort
               });
             else{
               ELEMENT_DATA.push({
                 position: cc, Ders: e.key, Kredi: e.val().Kredi, Harf: e.val().Harf,
                 Note: e.val().Donem_ort


                });

                this.N_T_Kredi+=Number(e.val().Kredi);
                this.N_T_Avg +=Number(e.val().Kredi*e.val().Harf_etkisi);

              }
           }
         });
       });
//console.log('keys '+ a);

// console.log(this.N_T_Avg/this.N_T_Kredi);
let T_Avg_t =0;
if(this.N_T_Kredi!==0)
T_Avg_t =Math.round ((this.N_T_Avg/this.N_T_Kredi)*100)/100;

this.D_Avg = (T_Avg_t);
  this.T_Kredi =  (this.N_T_Kredi);
  this.dataSource = new MatTableDataSource(ELEMENT_DATA);





}

public yaklasim(sayi:any):any
{if(sayi>=0&&sayi<=100)
return sayi = Math.round(sayi);
else
return 'X';
}
}

export interface PeriodicElement {
  Ders: string;
  position: number;
  Kredi: number;
  Harf: string;
  Note:string;
}

const ELEMENT_DATA: PeriodicElement[] = [

];


