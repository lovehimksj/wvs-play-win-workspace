import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
export interface Tile {
  type: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'wvs-model-pop-up',
  templateUrl: './model-pop-up.component.html',
  styleUrls: ['./model-pop-up.component.scss']
})
export class ModelPopUpComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 1, type: 'text'},
    {text: 'Two', cols: 1, rows: 1, type: 'radio'},
    {text: 'Three', cols: 1, rows: 1, type: 'checkbox'},
    {text: 'Four', cols: 1, rows: 1, type: 'dropdown'},
    {text: 'five', cols: 1, rows: 1, type: 'date'},
    {text: 'six', cols: 2, rows: 1, type: 'textarea'},
  ];
  constructor(public dialogRef: MatDialogRef<ModelPopUpComponent>) { }

  ngOnInit(): void {
  }

}
