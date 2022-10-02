import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenAddEditComponent } from './almacen-add-edit/almacen-add-edit.component';
import { AlmacenListComponent } from './almacen-list/almacen-list.component';

import { AlmacenComponent } from './almacen.component';

const routes: Routes = [
  {
    path: '',
    component: AlmacenComponent,
    data: {
      title: $localize`Almacen`
    },
    children: [
      { path: '', component: AlmacenListComponent, data:{title:'Gestionar Almacén'} },
      { path: 'add', component: AlmacenAddEditComponent, data:{title:'Registrar Almacén'} },
      { path: 'edit/:id', component: AlmacenAddEditComponent, data:{title:'Editar Almacén'} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule {
}
