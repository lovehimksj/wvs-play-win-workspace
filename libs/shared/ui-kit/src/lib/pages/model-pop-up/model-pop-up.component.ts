import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
export interface Tile {
  type: string;
  cols: number;
  rows: number;
  text: string;
  dataType: string;
  isHint: boolean;
  isSuffix: boolean;
  isAdditionButton: boolean;
}
export interface FormGroup {
  title: string;
  inputs: Array<Tile>;
}
@Component({
  selector: 'wvs-model-pop-up',
  templateUrl: './model-pop-up.component.html',
  styleUrls: ['./model-pop-up.component.scss'],
})
export class ModelPopUpComponent implements OnInit {
  formList: FormGroup[] = [
    {title: 'Form Type',
    inputs: [
      { text: 'One', cols: 1, rows: 1, type: 'text', dataType: 'text', isHint: false, isSuffix: false, isAdditionButton: false },
      { text: 'One', cols: 1, rows: 1, type: 'text', dataType: 'email', isHint: false, isSuffix: false, isAdditionButton: false  },
      { text: 'One', cols: 1, rows: 1, type: 'text', dataType: 'password', isHint: false, isSuffix: false, isAdditionButton: false  },
      { text: 'One', cols: 1, rows: 1, type: 'text', dataType: 'tel', isHint: false, isSuffix: false, isAdditionButton: false  },
      { text: 'One', cols: 1, rows: 1, type: 'text', dataType: 'number', isHint: false, isSuffix: false, isAdditionButton: false  },
      { text: 'One', cols: 1, rows: 1, type: 'text', dataType: 'url', isHint: false, isSuffix: false, isAdditionButton: false },
    ]},
    {title: 'Form Type 2',
    inputs: [
      { text: 'One', cols: 1, rows: 1, type: 'text', dataType: 'text', isHint: false, isSuffix: false, isAdditionButton: false },
      { text: 'One', cols: 1, rows: 1, type: 'text', dataType: 'email', isHint: false, isSuffix: false, isAdditionButton: false  },
      { text: 'One', cols: 1, rows: 1, type: 'text', dataType: 'password', isHint: false, isSuffix: false, isAdditionButton: false  },
      { text: 'One', cols: 1, rows: 1, type: 'text', dataType: 'tel', isHint: false, isSuffix: false, isAdditionButton: false  },
      { text: 'One', cols: 1, rows: 1, type: 'text', dataType: 'number', isHint: false, isSuffix: false, isAdditionButton: false  },
      { text: 'One', cols: 1, rows: 1, type: 'text', dataType: 'url', isHint: false, isSuffix: false, isAdditionButton: false },
    ]}
  ];
  constructor(public dialogRef: MatDialogRef<ModelPopUpComponent>) {}

  ngOnInit(): void {}
}
