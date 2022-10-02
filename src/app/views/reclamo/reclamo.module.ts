import { NgModule } from '@angular/core';
import { ReclamoRoutingModule } from './reclamo-routing.module';
import { ReclamoComponent } from './reclamo.component';
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
import { ReclamoListComponent } from './reclamo-list/reclamo-list.component';
import { ReclamoAddEditComponent } from './reclamo-add-edit/reclamo-add-edit.component';

@NgModule({
  imports: [
    ReclamoRoutingModule,
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
  declarations: [ReclamoComponent, ReclamoListComponent, ReclamoAddEditComponent]
})
export class ReclamoModule {
}
