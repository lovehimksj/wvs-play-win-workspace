import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AuthenticationFacadeService } from '@wvs-play-win-workspace/data-access-layer';
import {
  HeaderControl,
  SideNavControl,
} from '@wvs-play-win-workspace/shared/types';

@Component({
  selector: 'wvs-play-win-workspace-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));
  menuCollapsed = false;
  sideNavControl: SideNavControl = new SideNavControl();
  headerControl: HeaderControl = new HeaderControl();
  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly authenticationFacadeService: AuthenticationFacadeService
  ) {}
  ngOnInit(): void {
    this.authenticationFacadeService
      .validate()
      .subscribe((value) => console.log(value));
    this.authenticationFacadeService.getUserState.subscribe((value) => {
      if (value) {
        this.sideNavControl.userDetails = value;
        this.headerControl.userDetail = value;
        this.headerControl.pageTitle = 'dashboardPage.title';
      }
    });
  }
}
