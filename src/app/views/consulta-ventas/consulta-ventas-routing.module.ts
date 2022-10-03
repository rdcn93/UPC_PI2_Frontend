import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaVentasComponent } from './consulta-ventas.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultaVentasComponent,
    data: {
      title: $localize`ConsultaVentas`
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
export class ConsultaVentasRoutingModule {
}
