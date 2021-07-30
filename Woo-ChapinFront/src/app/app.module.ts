import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/global/navbar/navbar.component';
import { FooterComponent } from './components/global/footer/footer.component';
import { CarouselComponent } from './components/global/carousel/carousel.component';
import { HomeComponent } from './components/general/home/home.component';
import { LoginComponent } from './components/general/login/login.component';
import { RegisterComponent } from './components/general/register/register.component';
import { CategoriasComponent } from './components/general/categorias/categorias.component';
import { CarritoComponent } from './components/general/carrito/carrito.component';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { FormsModule } from '@angular/forms';
import { NavbarAdminComponent } from './components/admin/navbar-admin/navbar-admin.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { ProdRegisterComponent } from './components/admin/productos/prod-register/prod-register.component';
import { ProdSidebarComponent } from './components/admin/productos/prod-sidebar/prod-sidebar.component';
import { ProdAddComponent } from './components/admin/productos/prod-add/prod-add.component';
import { CatAddComponent } from './components/admin/categorias/cat-add/cat-add.component';
import { CatRegisterComponent } from './components/admin/categorias/cat-register/cat-register.component';
import { CatSidebarComponent } from './components/admin/categorias/cat-sidebar/cat-sidebar.component';
import { ZoneRegisterComponent } from './components/admin/zones/zone-register/zone-register.component';
import { ZoneAddComponent } from './components/admin/zones/zone-add/zone-add.component';
import { ZoneSidebarComponent } from './components/admin/zones/zone-sidebar/zone-sidebar.component';
import { PedidoRegisterComponent } from './components/admin/pedidos/pedido-register/pedido-register.component';
import { PedidoAddComponent } from './components/admin/pedidos/pedido-add/pedido-add.component';
import { PedidoSidebarComponent } from './components/admin/pedidos/pedido-sidebar/pedido-sidebar.component';
import { PersonalizarComponent } from './components/admin/personalizar/personalizar.component';
import { MisPedidosComponent } from './components/general/MiCuenta/mis-pedidos/mis-pedidos.component';
import { MisDireccionesComponent } from './components/general/MiCuenta/mis-direcciones/mis-direcciones.component';
import { EditarCuentaComponent } from './components/general/MiCuenta/editar-cuenta/editar-cuenta.component';
import { SidebarComponent } from './components/general/MiCuenta/sidebar/sidebar.component';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CategoriasComponent,
    CarritoComponent,
    NavbarAdminComponent,
    HomeAdminComponent,
    ProdRegisterComponent,
    ProdSidebarComponent,
    ProdAddComponent,
    CatAddComponent,
    CatRegisterComponent,
    CatSidebarComponent,
    ZoneRegisterComponent,
    ZoneAddComponent,
    ZoneSidebarComponent,
    PedidoRegisterComponent,
    PedidoAddComponent,
    PedidoSidebarComponent,
    PersonalizarComponent,
    MisPedidosComponent,
    MisDireccionesComponent,
    EditarCuentaComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressBarModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
