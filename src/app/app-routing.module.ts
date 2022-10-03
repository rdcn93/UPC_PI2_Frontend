import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { AuthService } from './services/auth.service';
import { UsuarioListComponent } from './views/usuario/usuario-list/usuario-list.component';
import { UsuarioAddEditComponent } from './views/usuario/usuario-add-edit/usuario-add-edit.component';
import { FogotPasswordComponent } from './views/pages/fogot-password/fogot-password.component';
import { ResetPasswordComponent } from './views/pages/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Inicio'
    },
    children: [
      {
        path: 'homepage', canActivate: [AuthService],
        loadChildren: () =>
          import('./views/homepage/homepage.module').then((m) => m.HomepageModule)
      },
      {
        path: 'almacen', canActivate: [AuthService],
        loadChildren: () =>
          import('./views/almacen/almacen.module').then((m) => m.AlmacenModule)
      },
      {
        path: 'cliente', canActivate: [AuthService],
        loadChildren: () =>
          import('./views/cliente/cliente.module').then((m) => m.ClienteModule)
      },
      {
        path: 'producto', canActivate: [AuthService],
        loadChildren: () =>
          import('./views/producto/producto.module').then((m) => m.ProductoModule)
      },
      {
        path: 'proveedor', canActivate: [AuthService],
        loadChildren: () =>
          import('./views/proveedor/proveedor.module').then((m) => m.ProveedorModule)
      },
      {
        path: 'promocion', canActivate: [AuthService],
        loadChildren: () =>
          import('./views/promocion/promocion.module').then((m) => m.PromocionModule)
      },
      {
        path: 'reclamo', canActivate: [AuthService],
        loadChildren: () =>
          import('./views/reclamo/reclamo.module').then((m) => m.ReclamoModule)
      },
      {
        path: 'usuario', canActivate: [AuthService],
        loadChildren: () =>
          import('./views/usuario/usuario.module').then((m) => m.UsuarioModule)
      },
      {
        path: 'consultapedidos', canActivate: [AuthService],
        loadChildren: () =>
          import('./views/consulta-pedidos/consulta-pedidos.module').then((m) => m.ConsultaPedidosModule)
      },
      {
        path: 'consultastock', canActivate: [AuthService],
        loadChildren: () =>
          import('./views/consulta-stock/consulta-stock.module').then((m) => m.ConsultaStockModule)
      },
      {
        path: 'consultaventas', canActivate: [AuthService],
        loadChildren: () =>
          import('./views/consulta-ventas/consulta-ventas.module').then((m) => m.ConsultaVentasModule)
      },
      {
        path: 'consultareclamos', canActivate: [AuthService],
        loadChildren: () =>
          import('./views/consulta-reclamos/consulta-reclamos.module').then((m) => m.ConsultaReclamosModule)
      },
      {
        path: 'consultadelivery', canActivate: [AuthService],
        loadChildren: () =>
          import('./views/consulta-delivery/consulta-delivery.module').then((m) => m.ConsultaDeliveryModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgot-password',
    component: FogotPasswordComponent,
    data: {
      title: 'Olvidaste tu Contraseña'
    }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {
      title: 'Restaurar Contraseña'
    }
  },
  {path: '**', redirectTo: 'usuario'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
        initialNavigation: 'enabledBlocking'
        // relativeLinkResolution: 'legacy'
      }
    )],
  exports: [RouterModule],
  providers:[AuthService]
})
export class AppRoutingModule { }
