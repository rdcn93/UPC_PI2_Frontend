import { NgModule } from '@angular/core';
import { ConsultaStockRoutingModule } from './consulta-stock-routing.module';
import { ConsultaStockComponent } from './consulta-stock.component';
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
    ConsultaStockRoutingModule,
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
  declarations: [ConsultaStockComponent
  ]
})
export class ConsultaStockModule {
}
