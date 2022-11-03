import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { MigracionDataComponent } from './migracion-data.component';

const routes: Routes = [
  {
    path: '',
    component: MigracionDataComponent,
    data: {
      title: $localize`MigracionData`
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
export class MigracionDataRoutingModule {
}
