import { NgModule } from '@angular/core';
import { AlmacenRoutingModule } from './almacen-routing.module';
import { AlmacenComponent } from './almacen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  NavbarModule,
  NavModule,
  SharedModule,
  UtilitiesModule
} from '@coreui/angular';
import { AlmacenListComponent } from './almacen-list/almacen-list.component';
import { AlmacenAddEditComponent } from './almacen-add-edit/almacen-add-edit.component';

@NgModule({
  imports: [
    AlmacenRoutingModule,
    FormsModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    DropdownModule,
    FormModule,
    GridModule,
    NavbarModule,
    NavModule,
    SharedModule,
    UtilitiesModule,
    IconModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [AlmacenComponent, AlmacenListComponent, AlmacenAddEditComponent]
})
export class AlmacenModule {
}
