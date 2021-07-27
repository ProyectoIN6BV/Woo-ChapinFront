import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { ProdRegisterComponent } from './components/admin/productos/prod-register/prod-register.component';
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
  {path: 'productAdmin', component:ProdRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
