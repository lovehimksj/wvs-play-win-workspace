import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsStoreModule } from './store.module';

@NgModule({
  imports: [CommonModule, NgxsStoreModule],
  exports: [NgxsStoreModule],
})
export class DataAccessStoreModule {}
