import { Component, NgZone } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as $ from 'jquery';
import { StudentsecService } from '../studentsec.service';
import { Router, ActivatedRoute } from '@angular/router';
export interface State {
  resim: string;
  name: string;
  mail: string;
}
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent  {
  stateCtrl = new FormControl();
  state = new FormControl();
  filteredStates: Observable<State[]>;
  Metin:string;
  Email:string;
  states: State[] = [
    {
      name: 'dr.yaşar becerekli',
      mail: 'ybecerikli@kocaeli.edu.tr',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      resim: 'http://bilgisayar.kocaeli.edu.tr/dosyalar/akademikRes/YBecerikli.jpg'
    },
    {
      name: 'dr.burak inner',
      mail: 'binner@kocaeli.edu.tr',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      resim: 'http://bilgisayar.kocaeli.edu.tr/dosyalar/akademikRes/BInner.jpg'
    },
    {
      name: 'dr.onur gok',
      mail: 'ogok@kocaeli.edu.tr',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      resim: 'http://bilgisayar.kocaeli.edu.tr/dosyalar/akademikRes/OGok.jpg'
    },
    {
      name: 'dr.Alev mutlu',
      mail: 'alev.mutlu@kocaeli.edu.tr',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      resim: 'http://bilgisayar.kocaeli.edu.tr/dosyalar/akademikRes/AMutlu.jpg'
    }
  ];

  constructor(private st:StudentsecService , 
    private router:Router, private route:ActivatedRoute, private zone:NgZone) {
  
  
    // document.oncontextmenu = (e)=>{
    //   e.preventDefault();
    //   }
  
  //////////////////////////////////////////////////
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }
  public  async send_message() 
  {
    // console.log($('#Email').val());

// console.log($('#msg').val());
let text = $('#msg').val();
let subject =$('#konu').val();
let mail_send_to = $('#Email').val();
// console.log(mail_send_to);
var xhttp = new XMLHttpRequest();
await new Promise<any>( (resolve,rej)=>{


 xhttp.open("GET", 
`https://messagenode.herokuapp.com/?
name=${this.st.get_id()}&&mail=${mail_send_to}&&subject=${subject}&&text=${text}`, true);
resolve('bisey');
}).then(obs=>{
  xhttp.send();

  alert('Mesaj Gönderildi');
})

this.zone.run(()=>{
  return this.router.navigate(['../'],{relativeTo:this.route});

});

  }

  
}
