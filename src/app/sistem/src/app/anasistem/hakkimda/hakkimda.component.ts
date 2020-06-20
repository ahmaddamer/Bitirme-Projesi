import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as $ from 'jquery';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-hakkimda',
  templateUrl: './hakiimda.html',
  styles: []
})
export class HakkimdaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

}
