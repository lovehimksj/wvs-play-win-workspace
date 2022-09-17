import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedUiKitModule } from '@wvs-play-win-workspace/shared/ui-kit';

const route: Routes = [
  { path: 'dashboard', component: DashboardComponent, 
    children: [
      { path: 'players', loadChildren: () => import('@wvs-play-win-workspace/feature/player-master').then(m => m.PlayerMasterModule)}
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule ({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedUiKitModule,
    RouterModule.forChild(route)
  ]
})
export class AdminModule {
}
