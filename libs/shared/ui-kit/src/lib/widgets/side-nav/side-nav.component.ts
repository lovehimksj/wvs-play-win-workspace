import { Component, Input, OnInit } from '@angular/core';
import { SideNavControl } from '@wvs-play-win-workspace/shared/types';

@Component({
  selector: 'wvs-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() entity: SideNavControl;
  rootMenu = 'dashboard';
  selectedMenuItem: string = '';
  constructor() {}

  ngOnInit(): void {}

  isActiveRoot() {
    return this.rootMenu;
  }

  isActive(appHelpDeskSuspendResume: string) {
    this.selectedMenuItem === appHelpDeskSuspendResume;
  }

  selectedMenu(appUserManagementUsers: string) {
    this.selectedMenuItem = appUserManagementUsers
  }

  selectedRoot(rootMenu: string) {
    this.rootMenu = rootMenu;
  }
}
