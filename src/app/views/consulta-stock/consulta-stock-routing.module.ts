import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { ConsultaStockComponent } from './consulta-stock.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultaStockComponent,
    data: {
      title: $localize`ConsultaStock`
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
export class ConsultaStockRoutingModule {
}
