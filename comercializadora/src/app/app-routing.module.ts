import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdeudoComponent } from './components/adeudo/adeudo.component';
import { ClienteAMComponent } from './components/cliente-am/cliente-am.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { EmpleadoAMComponent } from './components/empleado-am/empleado-am.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ProductoAMComponent } from './components/producto-am/producto-am.component';
import { ProductoComponent } from './components/producto/producto.component';
import { VentaComponent } from './components/venta/venta.component';

const routes: Routes = [ 
  {
    path: 'cliente', component: ClienteComponent
  },
  {
    path: 'cliente/editar/:id', component: ClienteAMComponent
  },
  {
    path: 'cliente/agregar', component: ClienteAMComponent
  },
  {
    path:  'empleado', component: EmpleadoComponent
  },
  {
    path:  'empleado-am', component: EmpleadoAMComponent
  },
  {
    path: 'producto', component: ProductoComponent
  },
  {
    path: 'producto-am', component: ProductoAMComponent
  },
  {
    path:  'venta', component: VentaComponent
  },
  {
    path:  'adeudo', component: AdeudoComponent
  },
  {
    path:  'principal', component: PrincipalComponent, pathMatch:'full'
  },
  {
    path: '**', redirectTo: 'principal'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
