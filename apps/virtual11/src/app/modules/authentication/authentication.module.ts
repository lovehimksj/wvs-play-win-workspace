import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedUiKitModule } from '@wvs-play-win-workspace/shared/ui-kit';

const route: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path:'', redirectTo:'login', pathMatch: 'full'}
];

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild (route),
    SharedUiKitModule
  ]
})
export class AuthenticationModule { }
