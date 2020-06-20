import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnasistemComponent } from './anasistem/anasistem.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { AkademikkismiComponent } from './anasistem/akademikkismi/akademikkismi.component';
import { IdarikismiComponent } from './anasistem/idarikismi/idarikismi.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StudentComponent } from './anasistem/student/student.component';
import { OgrenciisleriComponent } from './anasistem/ogrenciisleri/ogrenciisleri.component';
import { HakkimdaComponent } from './anasistem/hakkimda/hakkimda.component';
import {MatListModule} from '@angular/material/list'
import {
  MAT_LABEL_GLOBAL_OPTIONS,
  MatButtonModule, MatDatepickerModule,
  MatDialogModule, MatError, MatFormField, MatFormFieldControl,
  MatFormFieldModule,
  MatHint,
  MatIconModule, MatInputModule, MatNativeDateModule,
  MatNavList, MatOption, MatOptionModule, MatPaginatorIntl, MatPaginatorModule, MatSelectModule,
  MatToolbarModule,
  MatExpansionModule,
  MatSlideToggle,
  MatSlideToggleModule,
  MatTooltipModule, 
  MatSidenavModule
} from '@angular/material';
import {AngularFireDatabaseModule} from '@angular/fire/database';
// import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OgrenciislerimenueComponent } from './anasistem/ogrenciisleri/ogrenciislerimenue/ogrenciislerimenue.component';
import { YeniogrencikayitComponent } from './anasistem/ogrenciisleri/ogrenciislerimenue/yeniogrencikayit/yeniogrencikayit.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { OgrencinumarasiComponent } from './anasistem/ogrenciisleri/ogrenciislerimenue/ogrencinumarasi/ogrencinumarasi.component';
import { OgrencibilgileriComponent } from './anasistem/ogrenciisleri/ogrenciislerimenue/ogrencinumarasi/ogrencibilgileri/ogrencibilgileri.component';
import {RouterModule} from '@angular/router';
import {MyserviceService} from './anasistem/myservice.service';
import { SonuclarComponent } from './anasistem/ogrenciisleri/ogrenciislerimenue/ogrencinumarasi/ogrencibilgileri/sonuclar/sonuclar.component';
import {MatTableModule} from '@angular/material/table';
import { BorcComponent } from './anasistem/ogrenciisleri/ogrenciislerimenue/ogrencinumarasi/ogrencibilgileri/borc/borc.component';
import { PagenotfoundComponent } from './anasistem/pagenotfound/pagenotfound.component';
import { AcilacakDerslerComponent } from './anasistem/idarikismi/menu-idari/acilacak-dersler/acilacak-dersler.component';
import { MenuIdariComponent } from './anasistem/idarikismi/menu-idari/menu-idari.component';
import { OgrencisayfasiComponent } from './anasistem/student/ogrencisayfasi/ogrencisayfasi.component';
import { DersSecimComponent } from './anasistem/student/ogrencisayfasi/ders-secim/ders-secim.component';
import { BarComponent } from './bar/bar.component';
import { AkademikGirisComponent } from './anasistem/akademikkismi/akademik-giris/akademik-giris.component';
import { DersAlanlariComponent } from './anasistem/akademikkismi/akademik-giris/dersler/ders-alanlari/ders-alanlari.component';
import { DerslerComponent } from './anasistem/akademikkismi/akademik-giris/dersler/dersler.component';
import { MessagesComponent } from './anasistem/student/ogrencisayfasi/messages/messages.component';
import { SicilComponent } from './anasistem/student/ogrencisayfasi/sicil/sicil/sicil.component';
import { OgretimComponent } from './anasistem/idarikismi/menu-idari/ogretim/ogretim.component';
import { HttpClientModule } from '@angular/common/http';
import { AlinanDerslerComponent } from './anasistem/student/ogrencisayfasi/alinan-dersler/alinan-dersler.component';
import { DersdetayComponent } from './anasistem/student/ogrencisayfasi/alinan-dersler/dersdetay/dersdetay.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';



import { ContextMenuModule } from 'ngx-contextmenu';
import {CookieService} from 'ngx-cookie-service';
import { SheetstudentsComponent } from './anasistem/akademikkismi/akademik-giris/dersler/ders-alanlari/sheetstudents/sheetstudents.component';
import { ChartComponent } from './anasistem/akademikkismi/akademik-giris/dersler/ders-alanlari/chart/chart.component';
@NgModule({
  declarations: [
    AppComponent,
    AnasistemComponent,
    AkademikkismiComponent,
    IdarikismiComponent,
    StudentComponent,
    OgrenciisleriComponent,
    HakkimdaComponent,
    OgrenciislerimenueComponent ,
    MatNavList,
    YeniogrencikayitComponent,
    OgrencinumarasiComponent,
    OgrencibilgileriComponent,
    SonuclarComponent,
    BorcComponent,
    PagenotfoundComponent,
    AcilacakDerslerComponent,
    MenuIdariComponent,
    OgrencisayfasiComponent,
    DersSecimComponent,
    BarComponent,
    AkademikGirisComponent,
    DersAlanlariComponent,
    DerslerComponent,
    MessagesComponent,
    SicilComponent,
    OgretimComponent,
    AlinanDerslerComponent,
    DersdetayComponent,
    SheetstudentsComponent,
    ChartComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      FormsModule,
     MatCardModule , MatGridListModule  , MatDialogModule ,
    AngularFireModule.initializeApp(environment.firebase) , AngularFireAuthModule ,
      AngularFireDatabaseModule , MatSidenavModule , MatIconModule , MatToolbarModule , MatButtonModule
      , MatFormFieldModule , MatOptionModule , MatSelectModule , MatInputModule , MatAutocompleteModule ,
      ReactiveFormsModule, MatDatepickerModule , MatNativeDateModule ,  BrowserAnimationsModule
, RouterModule
      , MatTableModule  , MatPaginatorModule , MatExpansionModule ,
      MatAutocompleteModule , MatSlideToggleModule , HttpClientModule ,ContextMenuModule,
      MatTooltipModule

  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule , OgrencisayfasiComponent
  ],
  providers: [MyserviceService, CookieService],
  bootstrap: [AppComponent],
  entryComponents: [DersdetayComponent],
})

export class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule);
