import { NgModule } from '@angular/core';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
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
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteAddEditComponent } from './cliente-add-edit/cliente-add-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    ClienteRoutingModule,
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
    NgbModule
  ],
  declarations: [ClienteComponent, ClienteListComponent, ClienteAddEditComponent]
})
export class ClienteModule {
}
