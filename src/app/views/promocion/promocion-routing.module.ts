import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromocionAddEditComponent } from './promocion-add-edit/promocion-add-edit.component';
import { PromocionListComponent } from './promocion-list/promocion-list.component';

import { PromocionComponent } from './promocion.component';

const routes: Routes = [
  {
    path: '',
    component: PromocionComponent,
    data: {
      title: $localize`Promocion`
    },
    children: [
      { path: '', component: PromocionListComponent, data:{title:'Gestionar Promociones'} },
      { path: 'add', component: PromocionAddEditComponent, data:{title:'Registrar Promocion'} },
      { path: 'edit/:id', component: PromocionAddEditComponent, data:{title:'Editar Promocion'} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromocionRoutingModule {
}
