import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { ConsultaDeliveryComponent } from './consulta-delivery.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultaDeliveryComponent,
    data: {
      title: $localize`ConsultaDelivery`
    },
    children: [
    //   { path: '', component: UsuarioListComponent },
    // //   { path: 'add', component: UsuarioAddEditComponent },
    // //   { path: 'edit/:id', component: UsuarioAddEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaDeliveryRoutingModule {
}
