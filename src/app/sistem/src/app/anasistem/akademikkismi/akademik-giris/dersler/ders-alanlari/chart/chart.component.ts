import { Component, OnInit } from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import { AngularFireDatabase } from '@angular/fire/database';
import { TeachersecService } from 'src/app/teachersec.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(private db:AngularFireDatabase,private Tc:TeachersecService) { }

 async ngOnInit() {
    let AA = 0;
    let BA= 0;
    let BB = 0;
    let CB= 0;
    let CC=0;
    let DC=0;
    let DD=0;
    let FD = 0;
    let FF=0;
let sum = 0;
    await this.db.database.
    ref(`AlinmisDersler/${this.Tc.get_date()}/basariliBasarsiz/${this.Tc.get_ogretim()}/${this.Tc.get_Ders_adi()}`).once('value',s=>{
   
      s.forEach(e=>{
if(e.val().Harf_Notu==='AA')
AA++;
if(e.val().Harf_Notu==='BA')
BA++;

if(e.val().Harf_Notu==='BB')
BB++;

if(e.val().Harf_Notu==='CB')
CB++;


if(e.val().Harf_Notu==='CC')
CC++;

if(e.val().Harf_Notu==='DC')
DC++;


if(e.val().Harf_Notu==='DD')
DD++;


if(e.val().Harf_Notu==='FD')
FD++;


if(e.val().Harf_Notu==='FF')
FF++;


    })
    });
sum = AA+BA+BB+CB+CC+DC+DD+FD+FF;
    var ctx = $('#myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['AA', 'BA', 'BB', 'CB', 'CC', 'DC','DD','FD','FF'],
            datasets: [{
                label: 'Harf Notu ...',
                data: [AA,BA,BB,CB,CC,DC,DD,FD,FF,sum],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',//1
                    'rgba(54, 162, 235, 0.2)',//2
                    'rgba(255, 206, 86, 0.2)',//3
                    'rgba(75, 192, 192, 0.2)',//4
                    'rgba(153, 102, 255, 0.2)',//5
                    'rgba(255, 159, 64, 0.2)',//6
                    'rgba(255, 305, 64, 0.2)',//7
                    'rgba(255, 305, 255, 0.2)',//8
                    'rgba(100, 200, 64, 0.2)',//9
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',//1
                    'rgba(54, 162, 235, 1)',//2
                    'rgba(255, 206, 86, 1)',//3
                    'rgba(75, 192, 192, 1)',//4
                    'rgba(153, 102, 255, 1)',//5
                    'rgba(255, 159, 64, 1)',//6
                    'rgba(255, 307, 64, 1)',//7
                    'rgba(255, 305, 255, 1)',//8
                    'rgba(100, 200, 64, 1)',//9
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

   
  }

}
