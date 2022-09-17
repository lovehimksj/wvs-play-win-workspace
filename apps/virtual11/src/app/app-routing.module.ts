import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const route: Routes = [
  {path:':lang', loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path:':lang/admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
  {path:'', redirectTo:':lang', pathMatch: 'full'}
];

@NgModule ({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot (route)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
