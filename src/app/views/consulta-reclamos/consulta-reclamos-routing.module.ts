import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { ConsultaReclamosComponent } from './consulta-reclamos.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultaReclamosComponent,
    data: {
      title: $localize`ConsultaReclamos`
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
export class ConsultaReclamosRoutingModule {
}
