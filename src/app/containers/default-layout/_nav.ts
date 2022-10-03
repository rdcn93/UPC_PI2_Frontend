import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Inicio',
    url: '/homepage',
    iconComponent: { name: 'cil-home' },
    // badge: {
    //   color: 'info',
    //   text: 'NEW'
    // }
  }, 
  {
    title: true,
    name: 'Cálculos'
  }, 
  {
    name: 'Cálculo de Stock',
    url: '/theme/colors',
    iconComponent: { name: 'cil-calculator' }
  },
  {
    title: true,
    name: 'Consultas'
  },
  {
    name: 'Consultar',
    url: '/login',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Ventas',
        url: '/consultaventas'
      },
      {
        name: 'Pedido',
        url: '/consultapedidos'
      },      
      {
        name: 'Stock',
        url: '/consultastock'
      },
      {
        name: 'Reclamos',
        url: '/consultareclamos'
      },
      {
        name: 'Delivery',
        url: '/consultadelivery'
      }
    ]
  },
  {
    title: true,
    name: 'Mantenimiento'
  },
  {
    name: 'Gestión',
    url: '/login',
    iconComponent: { name: 'cil-pencil' },
    children: [
      {
        name: 'Usuarios',
        url: '/usuario'
      },
      {
        name: 'Clientes',
        url: '/cliente'
      },
      {
        name: 'Almacenes',
        url: '/almacen'
      },
      {
        name: 'Proveedores',
        url: '/proveedor'
      },
      {
        name: 'Productos',
        url: '/producto'
      },
      {
        name: 'Reclamos',
        url: '/reclamo'
      },
      {
        name: 'Promociones',
        url: '/promocion'
      }
    ]
  }
];
