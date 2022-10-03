import { NgModule } from '@angular/core';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ProveedorComponent } from './proveedor.component';
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
import { ProveedorListComponent } from './proveedor-list/proveedor-list.component';
import { ProveedorAddEditComponent } from './proveedor-add-edit/proveedor-add-edit.component';

@NgModule({
  imports: [
    ProveedorRoutingModule,
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
  declarations: [ProveedorComponent, ProveedorListComponent, ProveedorAddEditComponent]
})
export class ProveedorModule {
}
