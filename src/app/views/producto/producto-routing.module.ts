import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoAddEditComponent } from './producto-add-edit/producto-add-edit.component';
import { ProductoListComponent } from './producto-list/producto-list.component';

import { ProductoComponent } from './producto.component';

const routes: Routes = [
  {
    path: '',
    component: ProductoComponent,
    data: {
      title: $localize`Producto`
    },
    children: [
      { path: '', component: ProductoListComponent, data:{title:'Gestionar Productos'} },
      { path: 'add', component: ProductoAddEditComponent, data:{title:'Registrar Producto'} },
      { path: 'edit/:id', component: ProductoAddEditComponent, data:{title:'Editar Producto'} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule {
}
