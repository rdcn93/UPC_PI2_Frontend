import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorAddEditComponent } from './proveedor-add-edit/proveedor-add-edit.component';
import { ProveedorListComponent } from './proveedor-list/proveedor-list.component';

import { ProveedorComponent } from './proveedor.component';

const routes: Routes = [
  {
    path: '',
    component: ProveedorComponent,
    data: {
      title: $localize`Proveedor`
    },
    children: [
      { path: '', component: ProveedorListComponent, data:{title:'Gestionar Proveedor'} },
      { path: 'add', component: ProveedorAddEditComponent, data:{title:'Realizar Proveedor'} },
      { path: 'edit/:id', component: ProveedorAddEditComponent, data:{title:'Editar Proveedor'} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule {
}
