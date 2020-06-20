import { SheetstudentsComponent } from './anasistem/akademikkismi/akademik-giris/dersler/ders-alanlari/sheetstudents/sheetstudents.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {componentFactoryName} from '@angular/compiler';
import {AnasistemComponent} from './anasistem/anasistem.component';
import {IdarikismiComponent} from './anasistem/idarikismi/idarikismi.component';
import {AkademikkismiComponent} from './anasistem/akademikkismi/akademikkismi.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StudentComponent} from './anasistem/student/student.component';
import {OgrenciisleriComponent} from './anasistem/ogrenciisleri/ogrenciisleri.component';

import {OgrenciislerimenueComponent} from './anasistem/ogrenciisleri/ogrenciislerimenue/ogrenciislerimenue.component';
import {YeniogrencikayitComponent} from './anasistem/ogrenciisleri/ogrenciislerimenue/yeniogrencikayit/yeniogrencikayit.component';
import {OgrencinumarasiComponent} from './anasistem/ogrenciisleri/ogrenciislerimenue/ogrencinumarasi/ogrencinumarasi.component';
import {OgrencibilgileriComponent} from './anasistem/ogrenciisleri/ogrenciislerimenue/ogrencinumarasi/ogrencibilgileri/ogrencibilgileri.component';
import {SonuclarComponent} from './anasistem/ogrenciisleri/ogrenciislerimenue/ogrencinumarasi/ogrencibilgileri/sonuclar/sonuclar.component';
import {BorcComponent} from './anasistem/ogrenciisleri/ogrenciislerimenue/ogrencinumarasi/ogrencibilgileri/borc/borc.component';
import { PagenotfoundComponent } from './anasistem/pagenotfound/pagenotfound.component';
import { AcilacakDerslerComponent } from './anasistem/idarikismi/menu-idari/acilacak-dersler/acilacak-dersler.component';
import { MenuIdariComponent } from './anasistem/idarikismi/menu-idari/menu-idari.component';
import { OgrencisayfasiComponent } from './anasistem/student/ogrencisayfasi/ogrencisayfasi.component';
import { StudentsecService } from './anasistem/student/ogrencisayfasi/studentsec.service';
import { DersSecimComponent } from './anasistem/student/ogrencisayfasi/ders-secim/ders-secim.component';
import { AkademikGirisComponent } from './anasistem/akademikkismi/akademik-giris/akademik-giris.component';
import { TeachersecService } from './teachersec.service';
import { DersAlanlariComponent } from './anasistem/akademikkismi/akademik-giris/dersler/ders-alanlari/ders-alanlari.component';
import { DerslerComponent } from './anasistem/akademikkismi/akademik-giris/dersler/dersler.component';
import { MessagesComponent } from './anasistem/student/ogrencisayfasi/messages/messages.component';
import { SicilComponent } from './anasistem/student/ogrencisayfasi/sicil/sicil/sicil.component';
import { OgretimComponent } from './anasistem/idarikismi/menu-idari/ogretim/ogretim.component';
import { IslerserviceService } from './anasistem/ogrenciisleri/ogrenciislerimenue/ogrencinumarasi/ogrencibilgileri/islerservice.service';
import { AlinanDerslerComponent } from './anasistem/student/ogrencisayfasi/alinan-dersler/alinan-dersler.component';
import { HakkimdaComponent } from './anasistem/hakkimda/hakkimda.component';
import { AlinanderslerServiceService } from './anasistem/student/ogrencisayfasi/alinan-dersler/alinandersler-service.service';
import { ChartComponent } from './anasistem/akademikkismi/akademik-giris/dersler/ders-alanlari/chart/chart.component';
const routes: Routes = [
  {path: 'anasistem', component: AnasistemComponent},
  {path: 'anasistem/idarikismi' , component: IdarikismiComponent},
  {path: 'anasistem/akademikkismi' , component: AkademikkismiComponent},
  {path: 'anasistem/student' , component: StudentComponent} ,
  {path: 'anasistem/isler' , component: OgrenciisleriComponent} ,
  {path: 'anasistem/Hakkimda' , component: HakkimdaComponent} ,
   {path : 'anasistem/isler/ogrenciIsleriMenue' , component : OgrenciislerimenueComponent} ,
   {path: 'anasistem/isler/ogrenciIsleriMenue/yenikayit' , component: YeniogrencikayitComponent} ,
    {path: 'anasistem/isler/ogrenciIsleriMenue/ogrencinumarasi' ,
     component: OgrencinumarasiComponent } ,
    {path: 'anasistem/isler/ogrenciIsleriMenue/ogrencinumarasi/ogrencibilgileri' ,
        component: OgrencibilgileriComponent  , canActivate:[IslerserviceService]} ,
    {path: 'anasistem/isler/ogrenciIsleriMenue/ogrencinumarasi/ogrencibilgileri/sonuclar'
    , component: SonuclarComponent,  canActivate:[IslerserviceService]},
    {path: 'anasistem/isler/ogrenciIsleriMenue/ogrencinumarasi/ogrencibilgileri/borc' ,
     component: BorcComponent}
    ,{ path: '',
    redirectTo: '/anasistem',
    pathMatch: 'full'
  }
  ,{path:'anasistem/idarikismi/idari_menu/Ogretim/acilacakdersler',
   component: AcilacakDerslerComponent},
  {path:'anasistem/idarikismi/idari_menu' , component: MenuIdariComponent} ,
   {path:'anasistem/student/ogrencisayfasi' , component: OgrencisayfasiComponent,
   canActivate:[StudentsecService]},

 {path:'anasistem/student/ogrencisayfasi/DersSecim' , component:DersSecimComponent
},
  {path:'anasistem/akademikkismi/giris',
   component:AkademikGirisComponent ,
    canActivate:[TeachersecService]}
    ,
   
     {path:'anasistem/akademikkismi/giris/dersler', component:DerslerComponent , 
     canActivate:[TeachersecService] } ,
    {path:'anasistem/akademikkismi/giris/dersler/DersAlanlari',
     component:DersAlanlariComponent }
     , {path:'anasistem/student/ogrencisayfasi/Messages' , component: MessagesComponent} ,
     {path:'anasistem/student/ogrencisayfasi/sicil' , component: SicilComponent} ,
     {path:'anasistem/idarikismi/idari_menu/Ogretim' , component: OgretimComponent},
      {path:'anasistem/student/ogrencisayfasi/dersler' , component: AlinanDerslerComponent
      ,canActivate:[AlinanderslerServiceService]
    },
    {path:'anasistem/akademikkismi/giris/dersler/DersAlanlari/sheet', 
    component: SheetstudentsComponent
  , canActivate:[TeachersecService]},
 {path:'anasistem/akademikkismi/giris/dersler/DersAlanlari/chart', 
 component:ChartComponent , canActivate:[TeachersecService]},
   { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
