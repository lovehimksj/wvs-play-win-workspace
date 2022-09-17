import { Component, Input, OnInit } from '@angular/core';
import { SideNavControl } from '@wvs-play-win-workspace/shared/types';

@Component ({
  selector: 'wvs-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input () entity: SideNavControl;

  constructor () {
  }

  ngOnInit (): void {
  }

  isActiveRoot () {
    return '';
  }

  isActive (appHelpDeskSuspendResume: string) {

  }

  selectedMenu (appUserManagementUsers: string) {

  }

  selectedRoot (userManagement: string) {

  }
}
