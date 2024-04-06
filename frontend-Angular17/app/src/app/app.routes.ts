import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InicioComponent } from "./inicio/inicio.component";
import { ReservarComponent } from "./reservar/reservar.component";

import { ComoLlegarComponent } from "./como-llegar/como-llegar.component";

export const routes : Routes =[
    {path: "dashboard", component :  DashboardComponent},
    {path: "", component :  InicioComponent},
    {path: "reservar", component :  ReservarComponent},
    {path: "comollegar", component: ComoLlegarComponent},
    {path: "sobreNosotros", component :  SobreNosotrosComponent},	
    {path: "contactenos", component : ContactenosComponent},
    {path: "facilidades", component : FacilidadesComponent},
    {path: "tarifas", component : TarifasComponent}

]
