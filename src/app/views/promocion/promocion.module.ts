import { NgModule } from '@angular/core';
import { PromocionRoutingModule } from './promocion-routing.module';
import { PromocionComponent } from './promocion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

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
import { PromocionListComponent } from './promocion-list/promocion-list.component';
import { PromocionAddEditComponent } from './promocion-add-edit/promocion-add-edit.component';

@NgModule({
  imports: [
    PromocionRoutingModule,
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
    NgMultiSelectDropDownModule
  ],
  declarations: [PromocionComponent, PromocionListComponent, PromocionAddEditComponent]
})
export class PromocionModule {
}
