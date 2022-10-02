import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioAddEditComponent } from './usuario-add-edit/usuario-add-edit.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';


import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    data: {
      title: $localize`Usuario`
    },
  
    children: [
      {
        path: '', 
        component: UsuarioListComponent,
        data:{
          title:'Gestionar Usuarios'
        } 
      },
      { 
        path: 'add', 
        component: UsuarioAddEditComponent,
        data:{
          title:'Registrar Usuario'
        } 
      },
      { 
        path: 'edit/:id', 
        component: UsuarioAddEditComponent,
        data:{
          title:'Editar Usuario'
        } 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {
}
