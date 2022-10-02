import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteAddEditComponent } from './cliente-add-edit/cliente-add-edit.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';

import { ClienteComponent } from './cliente.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    data: {
      title: $localize`Cliente`
    },
    children: [
      { path: '', component: ClienteListComponent, data:{title:'Gestionar Clientes'} },
      { path: 'add', component: ClienteAddEditComponent, data:{title:'Registrar Clientes'} },
      { path: 'edit/:id', component: ClienteAddEditComponent, data:{title:'Editar Clientes'} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule {
}
