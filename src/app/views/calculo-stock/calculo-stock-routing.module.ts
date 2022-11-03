import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { CalculoStockComponent } from './calculo-stock.component';

const routes: Routes = [
  {
    path: '',
    component: CalculoStockComponent,
    data: {
      title: $localize`CalculoStock`
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
export class CalculoStockRoutingModule {
}
