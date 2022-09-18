import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'wvs-play-win-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isPageLoaded = false;
  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.isPageLoaded = false;
    }
    if (event instanceof NavigationEnd) {
      this.isPageLoaded = true;
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.isPageLoaded = true;
    }
    if (event instanceof NavigationError) {
      this.isPageLoaded = true;
    }
  }
}
