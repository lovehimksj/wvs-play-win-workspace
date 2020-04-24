import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModules } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule,BrowserModule, BrowserAnimationsModule, MaterialModules, FormsModule, ReactiveFormsModule],
  declarations: [LoginComponent],
  exports: [FormsModule, ReactiveFormsModule, MaterialModules, LoginComponent]
})
export class SharedUiKitModule {}
