import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { ConsultaPedidosComponent } from './consulta-pedidos.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultaPedidosComponent,
    data: {
      title: $localize`ConsultaPedidos`
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
export class ConsultaPedidosRoutingModule {
}
