import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatAddComponent } from './components/admin/categorias/cat-add/cat-add.component';
import { CatRegisterComponent } from './components/admin/categorias/cat-register/cat-register.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { PedidoAddComponent } from './components/admin/pedidos/pedido-add/pedido-add.component';
import { PedidoRegisterComponent } from './components/admin/pedidos/pedido-register/pedido-register.component';
import { PersonalizarComponent } from './components/admin/personalizar/personalizar.component';
import { ProdAddComponent } from './components/admin/productos/prod-add/prod-add.component';
import { ProdRegisterComponent } from './components/admin/productos/prod-register/prod-register.component';
import { ZoneAddComponent } from './components/admin/zones/zone-add/zone-add.component';
import { ZoneRegisterComponent } from './components/admin/zones/zone-register/zone-register.component';
import { CarritoComponent } from './components/general/carrito/carrito.component';
import { CategoriasComponent } from './components/general/categorias/categorias.component';
import { HomeComponent } from './components/general/home/home.component';
import { LoginComponent } from './components/general/login/login.component';
import { RegisterComponent } from './components/general/register/register.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'categorias', component:CategoriasComponent},
  {path:'cart', component:CarritoComponent},
  {path:'homeAdmin', component:HomeAdminComponent},
  {path: 'productAdmin/register', component:ProdRegisterComponent},
  {path: 'productAdmin/add', component:ProdAddComponent},
  {path: 'categoria/register', component:CatRegisterComponent},
  {path:'categoria/add', component: CatAddComponent},
  {path: 'zones/register', component:ZoneRegisterComponent},
  {path: 'zones/add', component:ZoneAddComponent},
  {path: 'pedidos/register', component: PedidoRegisterComponent},
  {path: 'pedidos/add', component: PedidoAddComponent},
  {path: 'personalizar', component: PersonalizarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
