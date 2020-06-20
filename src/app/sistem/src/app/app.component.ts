import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsecService } from './anasistem/student/ogrencisayfasi/studentsec.service';
import { TeachersecService } from './teachersec.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sistem';

  constructor(private router:Router , private st:StudentsecService, private Tc:TeachersecService)
  {
console.log('kullandi');
  }
  ngOnInit(): void {
   
  }
  public student()
  {
this.st.set_id(undefined);
this.Tc.set_id(undefined);
    this.router.navigate(['anasistem/student']);
  }
public akademikkismi()
{this.st.set_id(undefined);
  this.Tc.set_id(undefined);
  this.router.navigate(['anasistem/akademikkismi']);
}
public idarikismi()
{
  this.st.set_id(undefined);
  this.Tc.set_id(undefined);
  this.router.navigate(['anasistem/idarikismi']);
}

public isler()
{
  this.st.set_id(undefined);
  this.Tc.set_id(undefined);
  this.router.navigate(['anasistem/isler']);

}

public AnaSayfa()
{
  this.st.set_id(undefined);
  this.Tc.set_id(undefined);
  this.router.navigate(['anasistem']);

}

}
