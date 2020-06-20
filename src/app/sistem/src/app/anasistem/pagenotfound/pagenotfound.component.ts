import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'; 
@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private router:Router) { 
   
  }

  


counter = 9;
hat =120;

  ngOnInit() {
  
    
   
   
    setInterval(() => {
    if(this.counter===0)
      this.router.navigate(['anasistem']);
      this.counter--;
      
    
    
      this.animate();
    }, 1000);
    

  }
  animate()
  {
    $(document).ready(()=>{
      
      
      
      $('#konu').animate({
        backgroundColor: 'green'
      },500);
      $('#counter').animate({
        opacity: 1,
        fontSize: '+=100'
      }, 1000).animate({
        opacity: 0.8,
        fontSize: '-=100'
      }, 1000);
      



    });
  }

}
