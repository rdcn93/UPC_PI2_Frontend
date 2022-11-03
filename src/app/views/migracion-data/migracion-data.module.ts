import { NgModule } from '@angular/core';
import { MigracionDataRoutingModule } from './migracion-data-routing.module';
import { MigracionDataComponent } from './migracion-data.component';
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
  UtilitiesModule,
  ProgressModule,
  BadgeModule
} from '@coreui/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  imports: [
    MigracionDataRoutingModule,
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
    ProgressModule,
    BadgeModule,
    BlockUIModule.forRoot()
  ],
  declarations: [MigracionDataComponent
  ]
})
export class MigracionDataModule {
}
