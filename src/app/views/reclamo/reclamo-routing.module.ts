import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReclamoAddEditComponent } from './reclamo-add-edit/reclamo-add-edit.component';
import { ReclamoListComponent } from './reclamo-list/reclamo-list.component';

import { ReclamoComponent } from './reclamo.component';

const routes: Routes = [
  {
    path: '',
    component: ReclamoComponent,
    data: {
      title: $localize`Reclamo`
    },
    children: [
      { path: '', component: ReclamoListComponent, data:{title:'Gestionar Reclamos'} },
      { path: 'add', component: ReclamoAddEditComponent, data:{title:'Registrar Reclamos'} },
      { path: 'edit/:id', component: ReclamoAddEditComponent, data:{title:'Editar Reclamos'} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamoRoutingModule {
}
