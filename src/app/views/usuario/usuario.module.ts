import { NgModule } from '@angular/core';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';

import {
  ButtonGroupModule,
  ButtonModule,
  ModalModule,
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
import { UsuarioAddEditComponent } from './usuario-add-edit/usuario-add-edit.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';

import { DataTablesModule } from "angular-datatables";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    UsuarioRoutingModule,
    FormsModule,
    ButtonGroupModule,
    ButtonModule,
    ModalModule,
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
    DataTablesModule,
    NgbModule
  ],
  declarations: [UsuarioComponent, 
    UsuarioAddEditComponent, 
    UsuarioListComponent
  ]
})
export class UsuarioModule {
}
