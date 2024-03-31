import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InicioComponent } from "./inicio/inicio.component";
import { ReservarComponent } from "./reservar/reservar.component";
import { ComoLlegarComponent } from "./como-llegar/como-llegar.component";
import { SobreNosotrosComponent } from "./sobre-nosotros/sobre-nosotros.component";
import { ContactenosComponent } from "./contactenos/contactenos.component";
import { FacilidadesComponent } from "./facilidades/facilidades.component";
import { TarifasComponent } from "./tarifas/tarifas.component";

export const routes : Routes =[
    {path: "dashboard", component :  DashboardComponent},
    {path: "reservar", component :  ReservarComponent},
    {path: "comollegar", component: ComoLlegarComponent},
    {path: "sobreNosotros", component :  SobreNosotrosComponent},	
    {path: "", component :  InicioComponent},
    {path: "contactenos", component : ContactenosComponent},
    {path: "facilidades", component : FacilidadesComponent},
    {path: "tarifas", component : TarifasComponent}
]
