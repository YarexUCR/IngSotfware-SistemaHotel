import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InicioComponent } from "./inicio/inicio.component";
import { ReservarComponent } from "./reservar/reservar.component";
import { SobreNosotrosComponent } from "./sobre-nosotros/sobre-nosotros.component";
import { ContactenosComponent } from "./contactenos/contactenos.component";
import { FacilidadesComponent } from "./facilidades/facilidades.component";
import { TarifasComponent } from "./tarifas/tarifas.component";
import { DisponibleComponent } from "./disponible/disponible.component";

import { ComoLlegarComponent } from "./como-llegar/como-llegar.component";
import { LoginComponent } from "./login/login.component";
export const routes : Routes =[
    {path: "login", component :  LoginComponent},
    {path: "disponible", component :  DisponibleComponent},
    {path: "", component :  InicioComponent},
    {path: "reservar", component :  ReservarComponent},
    {path: "comollegar", component: ComoLlegarComponent},
    {path: "sobreNosotros", component :  SobreNosotrosComponent},	
    {path: "contactenos", component : ContactenosComponent},
    {path: "facilidades", component : FacilidadesComponent},
    {path: "tarifas", component : TarifasComponent},
    { path: '**', component: InicioComponent }
]
