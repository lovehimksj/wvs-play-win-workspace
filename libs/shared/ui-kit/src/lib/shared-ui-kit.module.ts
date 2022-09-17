import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModules } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SideNavComponent } from './widgets/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { HeaderToolbarComponent } from './widgets/header-toolbar/header-toolbar.component';
import { DataTableComponent } from './pages/data-table/data-table.component';
import { ModelPopUpComponent } from './pages/model-pop-up/model-pop-up.component';

@NgModule ({
  imports: [CommonModule, MaterialModules, FormsModule, ReactiveFormsModule, TranslateModule.forChild (), RouterModule],
  declarations: [LoginComponent, SideNavComponent, HeaderToolbarComponent, DataTableComponent, ModelPopUpComponent],
  exports: [FormsModule, ReactiveFormsModule, MaterialModules, LoginComponent, SideNavComponent, HeaderToolbarComponent, DataTableComponent]
})
export class SharedUiKitModule {
}
