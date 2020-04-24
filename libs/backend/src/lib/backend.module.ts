import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './controles/authentication.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [AuthenticationService]
})
export class BackendModule {}
