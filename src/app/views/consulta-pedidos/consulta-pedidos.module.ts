import { NgModule } from '@angular/core';
import { ConsultaPedidosRoutingModule } from './consulta-pedidos-routing.module';
import { ConsultaPedidosComponent } from './consulta-pedidos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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

@NgModule({
  imports: [
    ConsultaPedidosRoutingModule,
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
    NgbModule
  ],
  declarations: [ConsultaPedidosComponent
  ]
})
export class ConsultaPedidosModule {
}
