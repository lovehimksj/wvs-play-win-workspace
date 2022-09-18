import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeaderControl } from '@wvs-play-win-workspace/shared/types';

@Component({
  selector: 'wvs-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.css'],
})
export class HeaderToolbarComponent implements OnInit {
  @Input() entity: HeaderControl;
  @Output() menuToggle: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  menuClicked() {
    this.menuToggle.emit();
  }
}
