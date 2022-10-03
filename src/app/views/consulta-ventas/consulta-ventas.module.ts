import { NgModule } from '@angular/core';
import { ConsultaVentasRoutingModule } from './consulta-ventas-routing.module';
import { ConsultaVentasComponent } from './consulta-ventas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { ToastrModule } from 'ngx-toastr';
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
    ConsultaVentasRoutingModule,
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
    CommonModule
  ],
  declarations: [ConsultaVentasComponent
  ]
})
export class ConsultaVentasModule {
}
