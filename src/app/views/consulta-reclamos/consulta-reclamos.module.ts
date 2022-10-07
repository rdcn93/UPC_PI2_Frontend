import { NgModule } from '@angular/core';
import { ConsultaReclamosRoutingModule } from './consulta-reclamos-routing.module';
import { ConsultaReclamosComponent } from './consulta-reclamos.component';
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

import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    ConsultaReclamosRoutingModule,
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
    NgbModule,
    ToastrModule
  ],
  declarations: [ConsultaReclamosComponent
  ]
})
export class ConsultaReclamosModule {
}
