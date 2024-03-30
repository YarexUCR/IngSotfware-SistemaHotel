import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InicioComponent } from "./inicio/inicio.component";
import { ReservarComponent } from "./reservar/reservar.component";
import { ComoLlegarComponent } from "./como-llegar/como-llegar.component";
import { FacilidadesComponent } from "./facilidades/facilidades.component";
import { SobreNosotrosComponent } from "./sobre-nosotros/sobre-nosotros.component";

export const routes : Routes =[
    {path: "dashboard", component :  DashboardComponent},
    {path: "reservar", component :  ReservarComponent},
    {path: "comollegar", component: ComoLlegarComponent},
    {path: "facilidades", component :  FacilidadesComponent},
    {path: "sobreNosotros", component :  SobreNosotrosComponent},	
    {path: "", component :  InicioComponent}
]
