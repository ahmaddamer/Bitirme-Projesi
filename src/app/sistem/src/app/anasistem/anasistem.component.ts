import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import {MatDialog} from '@angular/material/dialog';
import { HakkimdaComponent} from './hakkimda/hakkimda.component';
import 'zone.js/dist/zone-error';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
class A {
    name: string;
    id: number;
   constructor(name , id) {
        this.name = name;
        this.id = id;
    }
}
@Component({
  selector: 'app-anasistem',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AnasistemComponent implements OnInit,OnDestroy {
    constructor(public dialog: MatDialog , private db:AngularFireDatabase,private router:Router,private route:ActivatedRoute ) {
    }
  ngOnDestroy(): void {
  // this.router.resetConfig;
  }

  openDialog() {
    this.dialog.open(HakkimdaComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

async  ngOnInit() {
var xx,yy;



//window.oncontextmenu= (ev)=>{
 
  //var x = ev.offsetX;     // Get the horizontal coordinate
//var y = ev.offsetY;     // Get the vertical coordinate



// var coor = "X coords: " + x + ", Y coords: " + y;
// document.getElementById("context-menu").style.left = x+"px";
// document.getElementById("context-menu").style.top = y+"px";
// console.log(x+' '+y);
// document.getElementById("context-menu").classList.add("active");
// ev.preventDefault();
// }
// window.onclick = (e)=>{
//   document.getElementById("context-menu").classList.remove("active");

// }

$(document).ready(() => {
  $(window).contextmenu((e)=>{
    var x = e.offsetX;
    var y = e.offsetY;
    var c1=10;
    var c2=13;
$('#context-menu').css({
left: x+"px",
top:y+"px"
});
$('#context-menu').addClass('active');
e.preventDefault();
  });
  $(window).on('click',()=>{
$('#context-menu').removeClass('active');
  });
      $('#c1').on('mouseover', () => {
      $('#c1').animate({
        opacity: 0.8,
        height: '+=3%',
        width: '+=4%'
      }, 500).animate({
        opacity: 1,
        height: '-=3%',
        width: '-=4%'
      }, 500);
      });
      //////////////////////
      $('#c2').on('mouseover', () => {
        $('#c2').animate({
          opacity: 0.8,
          height: '+=3%',
          width: '+=4%'
        }, 500).animate({
          opacity: 1,
          height: '-=3%',
          width: '-=4%'
        }, 500);
      });
      ///////////////////////////////
      $('#c3').on('mouseover', () => {
        $('#c3').animate({
          opacity: 0.8,
          height: '+=3%',
          width: '+=4%'
        }, 500).animate({
          opacity: 1,
          height: '-=3%',
          width: '-=4%'
        }, 500);
      });
      ////////////////////////
      $('#c4').on('mouseover', () => {
        $('#c4').animate({
          opacity: 0.8,
          height: '+=3%',
          width: '+=4%'
        }, 500).animate({
          opacity: 1,
          height: '-=3%',
          width: '-=4%'
        }, 500);
      });
      ///////////////////
      $('#c5').on('mouseover', () => {
        $('#c5').animate({
          opacity: 0.8,
          height: '+=3%',
          width: '+=4%'
        }, 500).animate({
          opacity: 1,
          height: '-=3%',
          width: '-=4%'
        }, 500);
      });

      $('#hakkimda').click(() => {
      $('#h').click();
    });
    });
  }
}
