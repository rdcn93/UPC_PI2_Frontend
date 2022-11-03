import { NgModule } from '@angular/core';
import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './producto.component';
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
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoAddEditComponent } from './producto-add-edit/producto-add-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    ProductoRoutingModule,
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
  declarations: [ProductoComponent, ProductoListComponent, ProductoAddEditComponent]
})
export class ProductoModule {
}
