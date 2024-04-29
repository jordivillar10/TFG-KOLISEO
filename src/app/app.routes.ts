import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { FormsModule } from "@angular/forms";

//Componentes
import { LoginComponent } from "./components/login/login.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { TiendaComponent } from "./components/tienda/tienda.component";
import { InicioComponent } from "./components/tienda/inicio/inicio.component";
import { SuplementosComponent } from "./components/tienda/suplementos/suplementos.component";
import { AccesoriosComponent } from "./components/tienda/accesorios/accesorios.component";
import { HttpClientModule } from "@angular/common/http";


const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'tienda', component: TiendaComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'suplementos', component: SuplementosComponent },
    { path: 'accesorios', component: AccesoriosComponent },
    {path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), HttpClientModule, FormsModule],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

// Exporta la constante routes
export { routes };
