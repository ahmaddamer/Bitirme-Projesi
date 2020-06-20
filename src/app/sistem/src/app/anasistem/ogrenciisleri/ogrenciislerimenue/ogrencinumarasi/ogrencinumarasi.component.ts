import { Component, OnInit, NgZone } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {MyserviceService} from '../../../myservice.service';
import * as $ from 'jquery';
import {FirebaseDatabase} from '@angular/fire';
import {AngularFireDatabase} from '@angular/fire/database';
import {__await} from 'tslib';
import { IslerserviceService } from './ogrencibilgileri/islerservice.service';
class Shirt {
    id: number;
    name: string;
}
@Component({
  selector: 'app-ogrencinumarasi',
  templateUrl: './ogrencinumarasi.component.html',
  styleUrls: ['./ogrencinumarasi.component.scss']
})
export class OgrencinumarasiComponent implements OnInit {
  constructor(private r: Router, private route: ActivatedRoute ,
              private ts: MyserviceService , 
              private db: AngularFireDatabase ,
               private zone:NgZone, private Is:IslerserviceService) {
  }
public  database_mi() {

      const id = $('#exampleInputEmail1').val().toString();
      console.log(id);
      if (id.length > 0) {
          const database = this.db.database.ref().child('Ogrenciler').child(id.toString());

          database.on('value', (snapshot) => {
              // if (snapshot.val() === null)
              //     console.log('true');
              //   console.log(snapshot.val());
              this.zone.run(()=>{

             
              if (snapshot.val() !== null) {
                  this.r.navigate(['./ogrencibilgileri/'], {relativeTo: this.route}).then( () => {
                    //   location.reload();
                  } );
              } else {
                  console.log('false');
                  $('#danger').text('Ogrenci numarasi yanlis');
                  $('#danger').show();
                  $('#danger').
                  addClass('alert alert-danger').removeClass('alert alert-success');
                  // return false;
              }
            })
          });
      }
  }
  ngOnInit() { $('#danger').hide();
this.Is.set_id(undefined);
  }
public controlStudentId(): boolean {
    if ($('#exampleInputEmail1').val().toString().length === 0) {
         $('#danger').
         addClass('alert alert-danger').removeClass('alert alert-success');
         $('#danger').text('bos alani birakamazsiniz');
         $('#danger').show();
         return false;
     } else
     if (this.kontrol() === 2 &&  $('#exampleInputEmail1').val().toString().length !== 0 ) {
        return true;
        }
}
public kontrol(): number {
      const id = $('#exampleInputEmail1').val();
      this.Is.set_id(id);
      if (id.toString().length < 9 || id.toString().length > 9 && id.toString().length !== 0) {
         $('#danger').show();
         $('#danger').
          addClass('alert alert-danger').removeClass('alert alert-success');
         $('#danger').text(' Öğrenci Nümarası rakamlarin sayisi 9 dur');
         return 1;
     } else if (id.toString().length === 9 && id.toString().length !== 0) {
          $('#danger').
          addClass('alert alert-success').removeClass('alert alert-danger').text('Okey!!!');
          return 2;
                   }
 }
}
