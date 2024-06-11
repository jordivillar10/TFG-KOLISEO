import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';

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
import { RegistrosComponent } from "./components/registros/registros.component";
import { RegistrarComponent } from "./components/registros/registrar/registrar.component";
import { CrearComponent } from "./components/registros/crear/crear.component";
import { HistorialComponent } from "./components/registros/historial/historial.component";
import { EstadisticasComponent } from "./components/registros/estadisticas/estadisticas.component";
import { CarritoComponent } from "./components/tienda/carrito/carrito.component";
import { CompraComponent } from "./components/tienda/compra/compra.component";
import { AuthGuard } from "./auth.guard";
import { DireccionEnvioComponent } from "./components/tienda/direccion-envio/direccion-envio.component";
import { CompraHechaComponent } from "./components/tienda/compra-hecha/compra-hecha.component";
import { HomeEntrenamientosComponent } from "./components/entrenamientos/home-entrenamientos/home-entrenamientos.component";
import { CalculadoraComponent } from "./components/calculadora/calculadora.component";
import { DeficitComponent } from "./components/calculadora/deficit/deficit.component";
import { AguaDiariaComponent } from "./components/calculadora/agua-diaria/agua-diaria.component";
import { AlcoholComponent } from "./components/calculadora/alcohol/alcohol.component";
import { CreatinaDosisComponent } from "./components/calculadora/creatina-dosis/creatina-dosis.component";
import { HarrisBenedictComponent } from "./components/calculadora/harris-benedict/harris-benedict.component";
import { ImcComponent } from "./components/calculadora/imc/imc.component";
import { PasosComponent } from "./components/calculadora/pasos/pasos.component";
import { PorcentajeGrasaComponent } from "./components/calculadora/porcentaje-grasa/porcentaje-grasa.component";
import { RmPesomuertoComponent } from "./components/calculadora/rm-pesomuerto/rm-pesomuerto.component";
import { RmPressbancaComponent } from "./components/calculadora/rm-pressbanca/rm-pressbanca.component";
import { RmSentadillaComponent } from "./components/calculadora/rm-sentadilla/rm-sentadilla.component";
import { SuperavitComponent } from "./components/calculadora/superavit/superavit.component";
import { ContactanosComponent } from "./components/contactanos/contactanos.component";


const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'tienda', component: TiendaComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'direccion-envio', component: DireccionEnvioComponent , canActivate: [AuthGuard]},
    { path: 'compra', component: CompraComponent },
    { path: 'compra-hecha', component: CompraHechaComponent },
    { path: 'registros', component: RegistrosComponent},
    { path: 'registrarTrain', component: RegistrarComponent, canActivate: [AuthGuard]},
    { path: 'estadisticas', component: EstadisticasComponent, canActivate: [AuthGuard]},
    { path: 'historial', component: HistorialComponent, canActivate: [AuthGuard]},
    { path: 'inicioTienda', component: InicioComponent },
    { path: 'suplementos', component: SuplementosComponent },
    { path: 'calculadora', component: CalculadoraComponent },
    { path: 'calculadora/deficit', component: DeficitComponent },
    { path: 'calculadora/agua-diaria', component: AguaDiariaComponent },
    { path: 'calculadora/alcohol', component: AlcoholComponent },
    { path: 'calculadora/creatina', component: CreatinaDosisComponent },
    { path: 'calculadora/harris-benedict', component: HarrisBenedictComponent },
    { path: 'calculadora/imc', component: ImcComponent },
    { path: 'calculadora/pasos', component: PasosComponent },
    { path: 'calculadora/porcentaje-grasa', component: PorcentajeGrasaComponent },
    { path: 'calculadora/rm-pesomuerto', component: RmPesomuertoComponent },
    { path: 'calculadora/rm-pressbanca', component: RmPressbancaComponent },
    { path: 'calculadora/rm-sentadilla', component: RmSentadillaComponent },
    { path: 'calculadora/superavit', component: SuperavitComponent },
    { path: 'calculadora/accesorios', component: AccesoriosComponent },
    { path: 'home-entrenamientos', component: HomeEntrenamientosComponent },
    {path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), HttpClientModule, FormsModule, ReactiveFormsModule],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

// Exporta la constante routes
export { routes };
